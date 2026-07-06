# GitHub Setup Checklist

This file tracks the required GitHub setup for the project workflow.

## Repository

- Create GitHub repository: `fantasy-football-name-generator`
- Add local remote: `origin`
- Push the initial planning/setup commit to `main`
- Push active feature branches as work begins

## Project Board

Create a GitHub Projects board named `Fantasy Football Name Generator`.

Suggested columns:

- Backlog
- Ready
- In Progress
- Review
- Done

## Initial Issues

### 1. Initialize Application Shell

Build the first runnable React TypeScript app shell with the selected frontend stack.

Acceptance criteria:

- App runs locally.
- Project structure matches the documented architecture.
- Basic layout exists for manual entry, keyword input, content mode, and generated results.

### 2. Add Manual Player Entry

Create a manual player-entry workflow for entering roster names.

Acceptance criteria:

- Users can add and remove player names.
- Player input is normalized consistently.
- Empty and duplicate entries are handled clearly.

### 3. Add Player Autocomplete

Power player entry with an active-player dataset and autocomplete.

Acceptance criteria:

- Local player dataset exists.
- Autocomplete matches common name input.
- Selected players preserve canonical player names.

### 4. Build Deterministic Name Generation

Implement deterministic fantasy team-name generation.

Acceptance criteria:

- Generation uses explicit templates and phrase libraries.
- Results include player or keyword attribution.
- Generation logic has focused tests.

### 5. Add Clean and Explicit Modes

Support content-mode filtering for generated names.

Acceptance criteria:

- Clean mode excludes explicit names.
- Explicit mode can include adult humor.
- Filtering behavior is deterministic and testable.

### 6. Add Keyword-Aware Generation

Allow optional themes and inside jokes to influence generated names.

Acceptance criteria:

- Users can enter one or more keywords.
- Generated names can use keywords where templates support them.
- Results identify which keyword influenced the name.

### 7. Plan OCR Upload Workflow

Design and document the screenshot upload and OCR flow before implementation.

Acceptance criteria:

- OCR architecture is documented.
- Player-matching correction workflow is documented.
- Implementation risks and candidate libraries are listed.

### 8. Add Roster Screenshot OCR

Implement screenshot upload and player-name extraction.

Acceptance criteria:

- Users can upload roster screenshots.
- OCR extracts candidate player names.
- Users can confirm or correct matched players before generation.

### 9. Add Sharing, Favorites, and Polish

Add result management and final usability improvements.

Acceptance criteria:

- Users can copy generated names.
- Users can save or favorite names locally.
- Core flows are responsive and visually polished.
