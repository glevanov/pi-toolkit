---
description: Deslop code comments
argument-hint: "Extra instructions"
---

# Deslop code comments

Check the diff against trunk branch and audit all added code comments. Delete unnecessary ones. Prefer to keep as few comments as possible. Consider if remaining comments should be reworded or shortened.

Extra instructions (if any): $@

## Delete vs. keep
Delete a comment that:
- explains something a reader can reasonably infer from the code
- explains behavior that is normally expected
- refers to work in progress or previous implementation

Keep a comment that:
- explains a non-obvious reason, constraint, or exception
- is required for API or tool, such as linter

## Style
- Use plain, concise language; avoid jargon and filler
- Shorten comments without losing their reason
