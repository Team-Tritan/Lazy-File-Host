# lazy-sharex-server
Speedran a lazy sharex image server while we wait for [Windy Pink](https://discord.gg/DtuwECHGxG) to be revived.

## Requirements
- Node 16.x.x
- An open port
- Static IP address, or something like replit.

## Config
- `./src/config` should be the first thing you fill out.

## Running
- `npm i --production`
- `cd src`
- `node index.js`, `pm2 start .`, etc.

## ShareX Config
- Once running the express server where ever, point a domain to the IP and then use the config in `./example.sxcu`. 
- Change the RequestURL, Headers,- Once running the express server where ever, point a domain to the IP and then use the config in `./example.sxcu`. Change the `RequestURL`, `Headers.key`, and `URL`. 
- Once changed, copy your new config to the clipboard, go into ShareX Destinations, add a custom uploader, and import from your clipboard. 
- You're all set :) 

## Flameshot Script 

### Bash Aliases

You can create bash aliases to run this through the terminal without having to specifically run the script path each time. In this example, the uploader script is placed in the user home directory under a folder called `Uploader`, `~/uploader/flameshot.sh`.

~./bash_aliases
```
alias sc="sh ~/uploader/flameshot.sh"
alias upload="sh ~/uploader/flameshot.sh"
alias screenshot="sh ~/uploader/flameshot.sh"
```

### Deps to Install
- xdg-utils
- xclip
- yad

## IOS Shortcuts

See the `uploader_files` folder to download the config for a mobile uploader widget! :DD
