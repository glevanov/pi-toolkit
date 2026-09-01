---
description: Plan task execution
argument-hint: "<task>"
---
Plan provided user task. Do NOT write or edit any code yet.
Use the `pi-subagents` skill for all delegation, follow its current execution patterns.

User task: $@

Work like this:
1. Gather context by delegating to `scout` subagents.
2. Synthesize the findings yourself. If anything user-owned is ambiguous (scope, naming, product tradeoffs, risk), interview me before planning.
3. Write the plan yourself: files to change, order of steps, risks, validation/test strategy. Then run a `challenger` and incorporate its feedback.
4. Present the final plan to me for approval. Keep your prose tight.

Stop after presenting the plan. I will say "/execute" when I'm ready to implement.
