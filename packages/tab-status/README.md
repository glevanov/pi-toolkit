# @glevanov/tab-status

Updates the terminal tab title with the current agent status and sends a
desktop notification when the agent finishes a turn:

- 🟢 Idle — waiting for user input
- 🟡 Working — agent is running
- 🔵 Done — agent just finished (reverts to Idle after 8 s)

Notifications use the terminal's OSC 99 escape sequence
(kitty's protocol, also supported by iTerm2, Ghostty, VS Code, Warp, Terminal.app, etc)
and only fire when the terminal window is unfocused.

## Install

```bash
pi install npm:@glevanov/tab-status
```

## License

MIT
