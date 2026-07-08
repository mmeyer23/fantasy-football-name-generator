# Architecture

## Purpose

Fantasy Football Name Generator turns roster inputs and optional user keywords into funny fantasy team names. The core product value comes from reliable player-name recognition, good pun matching, and clear filtering between clean and explicit results.

## Core Flows

### Manual Entry Flow

1. User types a player name.
2. Autocomplete searches active player data.
3. User selects one or more players.
4. User optionally adds keywords.
5. User selects clean or explicit mode.
6. Generator returns ranked team-name suggestions.

### Screenshot Upload Flow

1. User uploads one or more roster screenshots.
2. OCR extracts raw text from each image.
3. Name parser identifies candidate player names.
4. Fuzzy matcher maps candidates to active players.
5. User confirms or edits detected players.
6. Generator returns ranked team-name suggestions.

## Proposed Modules

### UI

Owns the user-facing screens and interactions:

- Image upload.
- Manual player entry.
- Player chips and edit controls.
- Keyword entry.
- Clean/explicit mode selector.
- Generated-name result list.

### Players

Owns player data and matching:

- Active-player dataset.
- Search index.
- Autocomplete.
- Name normalization.
- Fuzzy matching for OCR candidates.

### OCR

Owns screenshot processing:

- Image preprocessing if needed.
- OCR execution.
- Text cleanup.
- Candidate-name extraction.

### Generation

Owns name creation:

- Pun templates.
- Pop culture phrase library.
- Song, movie, and sports-reference phrases.
- Keyword incorporation.
- Ranking and de-duplication.

### Content Safety

Owns clean/explicit separation:

- Blocklist and allowlist rules.
- Explicit template tagging.
- Final result filtering.

### Data

Owns static and generated data files:

- Active players.
- Teams and aliases.
- Phrase libraries.
- Phrase corpus imports and audit tooling.
- Explicit/clean tags.

## Generation Strategy

The generator is deterministic and no-AI by default:

- Expand player names into pun atoms: first name, last name, aliases, initials, soundalikes, and curated player associations.
- Match those atoms against a structured phrase corpus of movies, songs, shows, books, games, brands, idioms, slogans, sports phrases, and food references.
- Generate a team name only when a phrase target has a defensible exact, alias, soundalike, phonetic, or rhyme match to a player atom.
- Store validation metadata on every player-pun result: reference phrase, replaced word, player atom, match kind, score, and source type.
- Rank candidates by match quality and phrase recognizability, then de-duplicate and cap repeated sound families.
- Keep keyword/theme names separate from validated player puns so generic containers do not count toward the 20-pun target.

Examples:

- `Kyle Pitts` -> `Pitts Creek`
- `CeeDee Lamb` -> `CeeDeez Nuts`
- `Game of Thrones` keyword -> `Game of Throws`
- `Marvel` keyword -> `Gridiron Guardians`

AI generation is intentionally out of scope for the current architecture to avoid API-key handling, unpredictable cost, and inconsistent quality.

The phrase corpus can be expanded from open/licensed data sources such as Wikidata, MusicBrainz, and Open Library. Competitor fantasy-name sites may be audited for coverage patterns, but exact competitor names should not be imported into production data.

## Data Strategy

The MVP can use a committed player dataset so autocomplete and matching work without a backend. A later milestone should add a repeatable refresh workflow from a roster data source.

Player records should include:

- Full name.
- First name.
- Last name.
- Team.
- Position.
- Status.
- Aliases or common abbreviations when useful.

## Testing Strategy

Tests should focus on the parts most likely to regress:

- Player-name normalization.
- Autocomplete matching.
- OCR candidate matching.
- Clean/explicit filtering.
- Generation ranking and de-duplication.
- Keyword relevance.
