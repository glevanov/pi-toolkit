---
description: Auto-merge a PR
argument-hint: "PR link"
---
Take care of this PR that I want merged while I’m away: $@

Enable auto-merge or put it in the merge queue, whichever is appropriate.
Check its status every 5 minutes, and stop once it’s merged or you need my input.
If a CI failure looks transient, retry it. If CI error indicates a code fix is needed, stop and propose the fix for my approval.
If there’s a merge conflict, resolve it only if you can confidently preserve the PR’s intent, run relevant checks, and re-queue it; otherwise ask me.
