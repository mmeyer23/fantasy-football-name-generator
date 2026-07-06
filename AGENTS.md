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

## GitHub Workflow Gate

Before starting feature implementation, verify that the GitHub setup from Mason's standard workflow is complete.

Required checks:

1. A GitHub repository exists for this project.
2. The local repository has an `origin` remote pointing to that GitHub repository.
3. The initial planning/setup commit has been pushed to GitHub.
4. GitHub Issues exist for the major milestones.
5. A GitHub Projects Kanban board exists for the project.
6. The milestone issues have been added to the board and prioritized.

If any required check is incomplete, stop feature work and report exactly what is missing. Ask for the missing GitHub owner, repository name, visibility, or permissions needed to finish the setup.

Do not treat local repository initialization as complete project setup until the GitHub repository, issues, and project board are verified.

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
