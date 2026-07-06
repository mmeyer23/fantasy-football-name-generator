# Repository Instructions

This repository follows Mason's standard software development workflow.

## Planning First

Before writing production code:

1. Define the project's purpose.
2. Define the MVP.
3. Identify major milestones.
4. Identify the expected architecture.
5. Identify the primary technologies.

Ask questions before implementation when requirements are unclear.

## Branch Strategy

Do not develop directly on `main` after the initial repository setup. Use focused feature branches for implementation work.

Examples:

- `feature/manual-player-entry`
- `feature/name-generation`
- `feature/ocr-upload`
- `bugfix/player-matching`
- `docs/architecture`

## Development Style

- Explain architectural reasoning before major changes.
- Implement one architectural improvement at a time.
- Keep changes focused.
- Prefer deterministic solutions over AI inference.
- Keep the project runnable whenever practical.
- Verify functionality before moving on.

## Engineering Principles

Favor:

- Maintainability.
- Readability.
- Deterministic solutions.
- Explicit architecture.
- Small focused functions.
- Strong typing.
- Separation of responsibilities.
- Incremental development.

Avoid:

- Giant rewrites.
- Unnecessary abstraction.
- Hidden behavior.
- Duplicated logic.
- AI-generated code without review.

## Documentation

Maintain documentation alongside code:

- `README.md`: project overview and usage.
- `docs/architecture.md`: system architecture.
- `docs/roadmap.md`: future plans.
- `AGENTS.md`: repository-specific AI instructions.

## Commits and Pull Requests

Commit at logical milestones. Commit messages should clearly describe what changed and reference GitHub Issues when applicable.

Use `Refs #X` when work contributes to an issue.

Use `Closes #X` only when every requirement of the issue has been completed.

Open pull requests when a milestone is complete, code is stable, and tests pass where applicable.

