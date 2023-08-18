#!/bin/bash

API="https://im.horny.rip/api/upload/"
DOMAINS=("https://im.horny.rip" "https://im.sleepdeprived.wtf" "https://youre.sleepdeprived.wtf")
API_KEY="fuckurmom2"

screenshot="$(mktemp /tmp/screenshot.XXXXXXXXXX.png)"

cleanup() {
    echo "Cleaning up..."
    rm -f "$screenshot"
    exit 1
}

exit_handler() {
    cleanup
}

open_url() {
    local url=$1
    xdg-open "$url"
}

copy_to_clipboard() {
    local url=$1

    if command -v xclip >/dev/null 2>&1; then
        echo -n "$url" | xclip -selection clipboard
        echo "URL copied to clipboard using xclip."
    elif command -v pbcopy >/dev/null 2>&1; then
        echo -n "$url" | pbcopy
        echo "URL copied to clipboard using pbcopy."
    elif command -v clip >/dev/null 2>&1; then
        echo -n "$url" | clip
        echo "URL copied to clipboard using clip."
    else
        display_error "Failed to copy URL to clipboard. Please manually copy the URL: $url."
        return 1
    fi
}

display_error() {
    local error=$1
    zenity --error --text="$error"
}

upload_image() {
    flameshot gui -r > "$screenshot"
    capture_status=$?

    if [ $capture_status -ne 0 ]; then
        display_error "Failed to capture screenshot or screenshot aborted."
        cleanup
    fi

    response=$(curl -s -H "key: $API_KEY" -F "sharex=@$screenshot" "$API")
    upload_status=$?

    if [ $upload_status -ne 0 ]; then
        display_error "Failed to upload image."
        cleanup
    fi

    url=$(echo "$response" | grep -oE '"url":"([^"]+)"' | cut -d'"' -f4)

    if [ -z "$url" ]; then
        display_error "Failed to get uploaded URL."
        cleanup
    fi

    random_index=$((RANDOM % ${#DOMAINS[@]}))
    selected_domain="${DOMAINS[$random_index]}"
    full_url="$selected_domain/$url"
}

notify() {
    local url=$1

    copy_to_clipboard "$url"

    local summary="Sussy Image Host"
    local body="The image was uploaded successfully and the URL was copied to the clipboard."

    notify-send "$summary" "$body"

    #open_url "$url"
}

main() {
    trap exit_handler EXIT

    if [ -t 1 ]; then
        random_index=$((RANDOM % ${#DOMAINS[@]}))
        selected_domain="${DOMAINS[$random_index]}"
        upload_image
        notify "$full_url"
    else
        echo "Script is not running in an interactive shell. Skipping."
    fi

    cleanup
}


main
