# About Flameshot Uploader 

## Bash Aliases

You can create bash aliases to run this through the terminal without having to specifically run the script path each time. In this example, the uploader script is placed in the user home directory under a folder called `Uploader`, `~/uploader/flameshot.sh`.

~./bash_aliases
```
alias sc="sh ~/uploader/flameshot.sh"
alias upload="sh ~/uploader/flameshot.sh"
alias screenshot="sh ~/uploader/flameshot.sh"
```

## Deps to Install
- xdg-utils
- xclip
- yad