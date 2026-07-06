# Fantasy Football Name Generator

Fantasy Football Name Generator is a web app that helps fantasy managers turn their roster, favorite references, and league jokes into funny team names.

Users can upload screenshots of fantasy rosters, enter player names manually, choose whether generated names should stay clean or allow explicit humor, add optional keywords, and receive clever team-name ideas based on player names, pop culture, movies, music, sports references, and custom themes.

## Goals

- Extract player names from one or more uploaded roster screenshots.
- Allow manual player entry with autocomplete against active NFL rosters.
- Generate funny team names that use all or part of player names.
- Support optional keywords such as `49ers`, `PNW`, `losers`, `Game of Thrones`, `Marvel`, or inside jokes.
- Provide a clean/explicit filter so users can control how kid-friendly the output should be.
- Keep generated names explainable enough that users understand the joke.

## MVP

The first usable version should include:

- A single-page web interface.
- Manual player-name entry.
- Autocomplete powered by a local active-player dataset.
- Optional keyword entry.
- Clean or explicit content mode.
- Deterministic name-generation templates for common pun formats.
- A generated-results list with player/keyword attribution.

Screenshot upload and OCR should be planned in the MVP architecture but can be implemented after the first manual-entry flow works reliably.

## Planned Features

- Multi-image roster screenshot upload.
- OCR extraction of player names from screenshots.
- Player-name matching and correction after OCR.
- Active roster data refresh workflow.
- Clean and explicit generation modes.
- Keyword-weighted name generation.
- Pop culture, movie, song, and sports-reference pun libraries.
- Save, copy, and favorite generated names.
- Shareable generated-name result links.
- Admin or developer workflow for updating player data and phrase libraries.

## Technology Stack

Proposed stack:

- Frontend: React with TypeScript.
- App framework: Next.js or Vite, to be finalized before implementation.
- Styling: CSS modules, Tailwind CSS, or another lightweight styling system selected during setup.
- OCR: Browser-side OCR with a library such as Tesseract.js, or server-side OCR if accuracy and performance require it.
- Data: Versioned player dataset stored locally at first, with a later refresh job from a roster data source.
- Testing: Unit tests for name-generation logic and data matching, plus UI tests for core flows.

## High-Level Architecture

The app should separate concerns into clear modules:

- `ui`: screens, forms, upload controls, and generated result display.
- `players`: active-player dataset, autocomplete, normalization, and fuzzy matching.
- `ocr`: screenshot parsing and candidate player-name extraction.
- `generation`: deterministic pun templates, phrase libraries, scoring, and filtering.
- `content-safety`: clean/explicit filtering rules.
- `data`: player and phrase source files.

Generation should start deterministic and inspectable before adding any AI-assisted generation. If AI generation is added later, it should be treated as an optional layer with validation and filtering around it.

## Future Roadmap

1. Finalize stack and initialize the app.
2. Build manual player entry and autocomplete.
3. Build deterministic clean-name generation.
4. Add explicit-mode generation and filtering.
5. Add keyword-aware generation.
6. Add roster screenshot upload and OCR.
7. Add player-data refresh tooling.
8. Add sharing, favorites, and polish.

