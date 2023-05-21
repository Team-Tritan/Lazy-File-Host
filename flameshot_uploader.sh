#!/bin/bash

API_ENDPOINT="https://im.horny.rip/api/upload/"
DOMAIN="https://im.horny.rip"
API_KEY="fuckurmom"

screenshot_file=$(mktemp).png
flameshot gui -r > "$screenshot_file"
response=$(curl -s -H "key: $API_KEY" -F "sharex=@$screenshot_file" "$API_ENDPOINT")

if [ $? -ne 0 ]; then
    echo "Error: Failed to upload image."
    rm "$screenshot_file"
    exit 1
fi

uploaded_url=$(echo "$response" | grep -oE '"url":"([^"]+)"' | cut -d'"' -f4)

if [ -z "$uploaded_url" ]; then
    echo "Error: Failed to retrieve uploaded URL."
    rm "$screenshot_file"
    exit 1
fi

full_url="$DOMAIN/$uploaded_url"
notify-send "Sussy Image Host" "$full_url"

echo -n "$full_url" | xclip -selection clipboard

rm "$screenshot_file"

exit
