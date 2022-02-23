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
