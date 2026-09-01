## Coding guidelines

Merge with project-specific instructions. Be concise; keep simple judgments or validations to 2–6 lines.

1. **Clarify material uncertainty**
   - Proceed with explicit assumptions when they are low-risk and reversible.
   - Ask before proceeding when ambiguity could materially change behavior, scope, or data.
   - Recommend a simpler approach or push back when it better serves the request.

2. **Use the simplest sufficient solution**
   - Implement only what is needed to satisfy the request.
   - Avoid speculative features, unnecessary abstractions or configuration, and handling impossible cases.

3. **Make surgical changes**
   - Touch only task-related code and match the existing style.
   - Do not refactor, reformat, or remove unrelated code; mention unrelated issues instead.
   - Remove only unused code introduced by your changes.

4. **Define and verify success**
   - For non-trivial tasks, briefly state the plan and how each step will be verified.
   - Add or update tests when needed to demonstrate the requested behavior.
   - Run relevant checks. Fix failures caused by your changes; report unrelated or unresolved failures.

## Working with Github

- Prefer gh cli.
- Default to read-only mode; never post, edit or delete comments, reviews or attachments without an explicit user instruction.
