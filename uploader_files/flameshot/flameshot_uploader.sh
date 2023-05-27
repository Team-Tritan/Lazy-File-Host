#!/bin/bash

API_ENDPOINT="https://im.horny.rip/api/upload/"
DOMAIN="https://im.horny.rip"
API_KEY="fuckurmom"

screenshot_file="$(mktemp /tmp/screenshot.XXXXXXXXXX.png)"

cleanup() {
    echo "Cleaning up..."
    rm -f "$screenshot_file"
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
    echo -n "$url" | xclip -selection clipboard
}

display_error() {
    local error_message=$1
    local error_title="Error"
    local error_width=300
    
    yad --title="$error_title" --text="$error_message" --button="Close:0" --center --width="$error_width"
}

upload_image() {
    local file=$1
    local response=$(curl -s -H "key: $API_KEY" -F "sharex=@$file" "$API_ENDPOINT")
    local upload_status=$?
    
    if [ $upload_status -ne 0 ]; then
        display_error "Failed to upload image."
        cleanup
    fi
    
    local uploaded_url=$(echo "$response" | grep -oE '"url":"([^"]+)"' | cut -d'"' -f4)
    
    if [ -z "$uploaded_url" ]; then
        display_error "Failed to retrieve uploaded URL."
        cleanup
    fi
    
    echo "$uploaded_url"
}

notify_and_copy_url() {
    local url=$1
    
    local notification_title="Sussy Image Uploader"
    local notification_body="\n The screenshot has been uploaded successfully.\n"
    local notification_width=300
    
    local button
    
    button=$(yad --title="$notification_title" --text="$notification_body" \
    --align="center" --button="Open:1" --button="Copy:2" --button="Close:0" --center --width="$notification_width") || cleanup
    
    case $button in
        1)
            open_url "$url"
        ;;
        2)
            copy_to_clipboard "$url"
        ;;
        *)
        ;;
    esac
}

trap exit_handler EXIT

if [ -t 1 ]; then
    flameshot gui -r > "$screenshot_file"
    capture_status=$?
    
    if [ $capture_status -ne 0 ]; then
        display_error "Failed to capture screenshot or screenshot aborted."
        cleanup
    fi
    
    uploaded_url=$(upload_image "$screenshot_file")
    full_url="$DOMAIN/$uploaded_url"
    
    notify_and_copy_url "$full_url"
else
    echo "Script is not running in an interactive shell. Skipping upload."
    cleanup
fi

