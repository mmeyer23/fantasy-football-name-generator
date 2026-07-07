import type { Player } from "../data/players";

export type ContentMode = "clean" | "explicit";

export type GeneratedName = {
  name: string;
  source: string;
  mode: ContentMode;
  reason: string;
  keyword?: string;
};

type Template = {
  name: string;
  mode: ContentMode;
  tags: string[];
  reason: string;
};

type ReferencePattern = {
  category: string;
  source: string;
  mode: ContentMode;
  build: (player: Player) => string;
  appliesTo: (player: Player) => boolean;
  explain: (player: Player) => string;
};

type KeywordProfile = {
  id: string;
  label: string;
  aliases: string[];
  playerTemplates: Array<{
    mode: ContentMode;
    build: (player: Player) => string;
    appliesTo?: (player: Player) => boolean;
    reason: (player: Player, keyword: string) => string;
  }>;
};

const MAX_GENERATED_NAMES = 50;

const cleanModeBlockedTerms = [
  "balls",
  "boner",
  "boob",
  "butt",
  "deez",
  "dick",
  "naked",
  "nuts",
  "sex",
  "sucks"
];

const cleanModeBlockedPhrases = ["sacks and the city"];

const playerTemplates: Record<string, Template[]> = {
  "ceedee-lamb": [
    {
      name: "CeeDeez Nuts",
      mode: "explicit",
      tags: ["pun", "classic"],
      reason: "Uses the sound of CeeDee's first name for a classic fantasy football pun."
    },
    {
      name: "Silence of the Lamb",
      mode: "clean",
      tags: ["movie"],
      reason: "Turns Lamb into a movie-title reference."
    },
    {
      name: "Lamb of God",
      mode: "clean",
      tags: ["music", "football"],
      reason: "Uses Lamb in a direct band-name reference."
    },
    {
      name: "CeeDee's TDs",
      mode: "clean",
      tags: ["football", "pun"],
      reason: "Uses CeeDee's name in a simple touchdown pun."
    }
  ],
  "kyle-pitts": [
    {
      name: "Pitts Creek",
      mode: "clean",
      tags: ["tv"],
      reason: "Swaps Kyle Pitts into a recognizable TV-title soundalike."
    },
    {
      name: "Pitts Stop",
      mode: "clean",
      tags: ["sports", "pun"],
      reason: "Turns Pitts into a quick racing and football-style phrase."
    },
    {
      name: "Brad Pitts",
      mode: "clean",
      tags: ["celebrity"],
      reason: "Uses Pitts in a recognizable celebrity-name pun."
    }
  ],
  "jalen-hurts": [
    {
      name: "Love Hurts",
      mode: "clean",
      tags: ["song"],
      reason: "Uses Hurts in a familiar song-title phrase."
    },
    {
      name: "The Hurt Locker",
      mode: "clean",
      tags: ["movie"],
      reason: "Uses Hurts as the punchline in a movie-title reference."
    }
  ],
  "justin-jefferson": [
    {
      name: "The Jefferson Air Raid",
      mode: "clean",
      tags: ["music", "football"],
      reason: "Blends Jefferson with a passing-game phrase."
    }
  ],
  "bijan-robinson": [
    {
      name: "Bijan Mustard",
      mode: "clean",
      tags: ["food", "pun"],
      reason: "Uses Bijan's first name as a Dijon soundalike."
    }
  ],
  "amon-ra-st-brown": [
    {
      name: "Ra Ra Rasputin",
      mode: "clean",
      tags: ["song"],
      reason: "Uses Amon-Ra's name in a song-title rhythm."
    }
  ],
  "christian-mccaffrey": [
    {
      name: "Run CMC",
      mode: "clean",
      tags: ["music", "football"],
      reason: "Uses McCaffrey's common nickname with a music-reference twist."
    }
  ],
  "patrick-mahomes": [
    {
      name: "Mahomes Alone",
      mode: "clean",
      tags: ["movie"],
      reason: "Turns Mahomes into a holiday movie-title pun."
    }
  ],
  "josh-allen": [
    {
      name: "Allen the Family",
      mode: "clean",
      tags: ["tv"],
      reason: "Uses Allen in a classic TV-title soundalike."
    }
  ],
  "tyreek-hill": [
    {
      name: "King of the Hill",
      mode: "clean",
      tags: ["tv"],
      reason: "Uses Hill in a recognizable TV-title phrase."
    }
  ],
  "travis-kelce": [
    {
      name: "Kelce Grammar",
      mode: "clean",
      tags: ["music"],
      reason: "Uses Kelce as a soundalike in a music-reference pun."
    }
  ],
  "saquon-barkley": [
    {
      name: "Saquon With the Wind",
      mode: "clean",
      tags: ["movie"],
      reason: "Uses Saquon's first name in a movie-title rhythm."
    }
  ]
};

const keywordTemplates: Record<string, Template[]> = {
  "game of thrones": [
    {
      name: "Game of Throws",
      mode: "clean",
      tags: ["tv", "football"],
      reason: "Turns the keyword into a quarterback-friendly pop-culture pun."
    },
    {
      name: "A Song of Ice and Wire",
      mode: "clean",
      tags: ["book", "tv", "waiver-wire"],
      reason: "Uses the keyword's fantasy-world association with a waiver-wire football twist."
    },
    {
      name: "Winter Is Punting",
      mode: "clean",
      tags: ["tv", "football"],
      reason: "Turns a famous fantasy-TV slogan into a football phrase."
    }
  ],
  marvel: [
    {
      name: "Gridiron Guardians",
      mode: "clean",
      tags: ["movie", "superhero"],
      reason: "Nods to Guardians-style superhero teams with a football spin."
    },
    {
      name: "Avengers: End Zone",
      mode: "clean",
      tags: ["movie", "superhero", "football"],
      reason: "Combines a superhero team reference with a scoring-area pun."
    },
    {
      name: "The Waiver Soldier",
      mode: "clean",
      tags: ["movie", "superhero", "waiver-wire"],
      reason: "Uses a superhero-title rhythm for a waiver-wire joke."
    }
  ],
  "49ers": [
    {
      name: "Gold Rush Hour",
      mode: "clean",
      tags: ["team", "movie"],
      reason: "Connects the 49ers' gold-rush identity to a movie-title soundalike."
    },
    {
      name: "The Gold Standard",
      mode: "clean",
      tags: ["team", "slogan"],
      reason: "Uses the 49ers' gold identity in a confident team-name slogan."
    },
    {
      name: "Bay Area Blitz",
      mode: "clean",
      tags: ["team", "regional", "football"],
      reason: "Connects the keyword to a regional football phrase."
    }
  ],
  pnw: [
    {
      name: "Sleepless in the Playoffs",
      mode: "clean",
      tags: ["movie", "regional"],
      reason: "Uses a Pacific Northwest movie association with a fantasy-football twist."
    },
    {
      name: "Rain City Routes",
      mode: "clean",
      tags: ["regional", "football"],
      reason: "Turns the Pacific Northwest keyword into a passing-game phrase."
    },
    {
      name: "Evergreen End Zone",
      mode: "clean",
      tags: ["regional", "football"],
      reason: "Uses Pacific Northwest imagery with a scoring-area football hook."
    }
  ],
  losers: [
    {
      name: "Losers Club Championship",
      mode: "clean",
      tags: ["movie", "league-joke"],
      reason: "Uses the keyword as a league-joke reference without crossing into explicit content."
    },
    {
      name: "The Last-Place Dance",
      mode: "clean",
      tags: ["song", "league-joke"],
      reason: "Turns a league-joke keyword into a music-reference style name."
    },
    {
      name: "Bye Week at Bernie's",
      mode: "clean",
      tags: ["movie", "league-joke"],
      reason: "Uses a movie-title rhythm for a bad-luck fantasy team joke."
    },
    {
      name: "Sacks and the City",
      mode: "explicit",
      tags: ["tv", "adult-humor", "football"],
      reason: "Uses an adult sitcom title as the setup for a football sack pun."
    }
  ]
};

const referencePatterns: ReferencePattern[] = [
  {
    category: "football",
    source: "Deep threat",
    mode: "clean",
    build: (player) => `${player.firstName} Deep Threat`,
    appliesTo: (player) => hasTrait(player, "speed") || (player.position === "WR" && hasTrait(player, "air")),
    explain: (player) => `Connects ${player.fullName} to a football role that fits fast wide receivers.`
  },
  {
    category: "slogan",
    source: "Route 66",
    mode: "clean",
    build: (player) => `${player.firstName}'s Route 66`,
    appliesTo: (player) => player.position === "WR" || player.position === "TE",
    explain: (player) => `Uses ${player.fullName} in a route-running reference that fits receivers and tight ends.`
  },
  {
    category: "football",
    source: "End zone",
    mode: "clean",
    build: (player) => `${player.firstName} Zone`,
    appliesTo: (player) => player.position === "QB" || player.position === "RB" || player.position === "WR" || player.position === "TE",
    explain: (player) => `Uses ${player.firstName} in an end-zone scoring phrase.`
  },
  {
    category: "movie",
    source: "There Will Be Blood",
    mode: "clean",
    build: (player) => `There Will Be Hurts`,
    appliesTo: (player) => player.id === "jalen-hurts",
    explain: (player) => `Uses ${player.fullName}'s last name because "Hurts" naturally fits the movie title's tone.`
  },
  {
    category: "movie",
    source: "The Hurt Locker",
    mode: "clean",
    build: () => `Hurts Locker`,
    appliesTo: (player) => player.id === "jalen-hurts",
    explain: (player) => `Uses a direct sound and meaning connection between Hurts and the movie title.`
  },
  {
    category: "movie",
    source: "Home Alone",
    mode: "clean",
    build: () => `Mahomes Alone`,
    appliesTo: (player) => player.id === "patrick-mahomes",
    explain: (player) => `Uses Mahomes as a close soundalike for "home" in the movie title.`
  },
  {
    category: "slogan",
    source: "Home sweet home",
    mode: "clean",
    build: () => `Home Sweet Mahomes`,
    appliesTo: (player) => player.id === "patrick-mahomes",
    explain: (player) => `Uses Mahomes as a home soundalike in a familiar slogan.`
  },
  {
    category: "movie",
    source: "The Lion King",
    mode: "clean",
    build: () => `The Lamb King`,
    appliesTo: (player) => player.id === "ceedee-lamb",
    explain: (player) => `Uses Lamb as an animal-name swap in a recognizable animal-led movie title.`
  },
  {
    category: "song",
    source: "Mary Had a Little Lamb",
    mode: "clean",
    build: () => `CeeDee Had a Little Lamb`,
    appliesTo: (player) => player.id === "ceedee-lamb",
    explain: (player) => `Uses CeeDee Lamb with a direct nursery-rhyme reference to lamb.`
  },
  {
    category: "brand",
    source: "Lamborghini",
    mode: "clean",
    build: () => `Lamborghini CeeDee`,
    appliesTo: (player) => player.id === "ceedee-lamb",
    explain: (player) => `Uses the opening sound of Lamborghini with CeeDee Lamb's last name.`
  },
  {
    category: "slogan",
    source: "For the pits",
    mode: "clean",
    build: () => `Pitts and Giggles`,
    appliesTo: (player) => player.id === "kyle-pitts",
    explain: (player) => `Uses Pitts as a close soundalike for "fits" in a familiar phrase.`
  },
  {
    category: "movie",
    source: "Money Pit",
    mode: "clean",
    build: () => `The Money Pitts`,
    appliesTo: (player) => player.id === "kyle-pitts",
    explain: (player) => `Uses Pitts as a plural pit sound in a movie-title style phrase.`
  },
  {
    category: "brand",
    source: "Pitt Stop",
    mode: "clean",
    build: () => `Pitts Stop Crew`,
    appliesTo: (player) => player.id === "kyle-pitts",
    explain: (player) => `Uses Pitts as a pit-stop soundalike, which also feels sports-adjacent.`
  },
  {
    category: "song",
    source: "Ain't No Mountain High Enough",
    mode: "clean",
    build: () => `Ain't No Hill High Enough`,
    appliesTo: (player) => player.id === "tyreek-hill",
    explain: (player) => `Uses Hill because it naturally fits a mountain-themed song title.`
  },
  {
    category: "tv",
    source: "King of the Hill",
    mode: "clean",
    build: () => `King of the Hill`,
    appliesTo: (player) => player.id === "tyreek-hill",
    explain: (player) => `Uses Hill because it directly matches the TV title.`
  },
  {
    category: "song",
    source: "Run-DMC",
    mode: "clean",
    build: () => `Run CMC`,
    appliesTo: (player) => player.id === "christian-mccaffrey",
    explain: (player) => `Uses McCaffrey's common CMC nickname with a direct music-reference rhyme.`
  },
  {
    category: "slogan",
    source: "Run for your life",
    mode: "clean",
    build: () => `Run for Your CMC`,
    appliesTo: (player) => player.id === "christian-mccaffrey",
    explain: (player) => `Uses McCaffrey's CMC nickname in a running-back appropriate phrase.`
  },
  {
    category: "song",
    source: "Mr. Brightside",
    mode: "clean",
    build: () => `Mr. Sun God`,
    appliesTo: (player) => player.id === "amon-ra-st-brown",
    explain: (player) => `Uses Amon-Ra's Sun God nickname in a music-title style name.`
  },
  {
    category: "movie",
    source: "Remember the Titans",
    mode: "clean",
    build: () => `Remember the Sun God`,
    appliesTo: (player) => player.id === "amon-ra-st-brown",
    explain: (player) => `Uses Amon-Ra's Sun God nickname in a memorable sports-movie cadence.`
  },
  {
    category: "song",
    source: "Mrs. Robinson",
    mode: "clean",
    build: () => `Bijan Robinson`,
    appliesTo: (player) => player.id === "bijan-robinson",
    explain: (player) => `Uses Robinson's last name in a direct song-title reference.`
  },
  {
    category: "brand",
    source: "Grey Poupon",
    mode: "clean",
    build: () => `Bijan Poupon`,
    appliesTo: (player) => player.id === "bijan-robinson",
    explain: (player) => `Uses Bijan as a Dijon soundalike in a mustard-brand reference.`
  },
  {
    category: "song",
    source: "Bark at the Moon",
    mode: "clean",
    build: () => `Barkley at the Moon`,
    appliesTo: (player) => player.id === "saquon-barkley",
    explain: (player) => `Uses the bark sound inside Barkley with a song-title reference.`
  },
  {
    category: "movie",
    source: "Gone with the Wind",
    mode: "clean",
    build: () => `Saquon with the Wind`,
    appliesTo: (player) => player.id === "saquon-barkley",
    explain: (player) => `Uses Saquon's first name in a close movie-title cadence.`
  },
  {
    category: "tv",
    source: "All in the Family",
    mode: "clean",
    build: () => `Allen the Family`,
    appliesTo: (player) => player.id === "josh-allen",
    explain: (player) => `Uses Allen as a close soundalike in a classic TV-title phrase.`
  },
  {
    category: "slogan",
    source: "All in",
    mode: "clean",
    build: () => `All-In on Allen`,
    appliesTo: (player) => player.id === "josh-allen",
    explain: (player) => `Uses Allen because it starts with an "all-in" sound and fits a confident fantasy slogan.`
  },
  {
    category: "song",
    source: "Hot in Herre",
    mode: "clean",
    build: () => `Kelce in Here`,
    appliesTo: (player) => player.id === "travis-kelce",
    explain: (player) => `Uses Kelce as a rhythm fit in a recognizable song-title cadence.`
  },
  {
    category: "brand",
    source: "Kelsey Grammer",
    mode: "clean",
    build: () => `Kelce Grammar`,
    appliesTo: (player) => player.id === "travis-kelce",
    explain: (player) => `Uses Kelce as a close soundalike for Kelsey in a celebrity-name pun.`
  },
  {
    category: "movie",
    source: "Air Force One",
    mode: "clean",
    build: (player) => `Air ${player.lastName} One`,
    appliesTo: (player) => player.position === "QB" || hasTrait(player, "air"),
    explain: (player) => `Uses ${player.fullName} in an air-game reference that fits passers and aerial offenses.`
  },
  {
    category: "football",
    source: "Waiver wire",
    mode: "clean",
    build: (player) => `${player.lastName} on the Waiver Wire`,
    appliesTo: (player) => hasTrait(player, "bench") || player.position === "RB" || player.position === "WR" || player.position === "TE",
    explain: (player) => `Uses ${player.fullName} in a fantasy-football phrase rather than forcing a pop-culture swap.`
  }
];

const keywordProfiles: KeywordProfile[] = [
  {
    id: "game-of-thrones",
    label: "Game of Thrones",
    aliases: ["game of thrones", "got", "house of the dragon", "dragon"],
    playerTemplates: [
      {
        mode: "clean",
        build: (player) => `House ${player.lastName}`,
        reason: (player, keyword) => `Uses "${keyword}" as a fantasy-house theme around ${player.fullName}.`
      },
      {
        mode: "clean",
        build: (player) => `The ${player.lastName} Watch`,
        reason: (player, keyword) => `Uses "${keyword}" to turn ${player.fullName} into a Night's Watch-style team name.`
      }
    ]
  },
  {
    id: "marvel",
    label: "Marvel",
    aliases: ["marvel", "avengers", "superhero", "superheroes", "mcu"],
    playerTemplates: [
      {
        mode: "clean",
        build: (player) => `Captain ${player.lastName}`,
        reason: (player, keyword) => `Uses "${keyword}" as a superhero-title theme around ${player.fullName}.`
      },
      {
        mode: "clean",
        build: (player) => `${player.firstName} Supreme`,
        reason: (player, keyword) => `Uses "${keyword}" to give ${player.fullName} a comic-book title cadence.`
      }
    ]
  },
  {
    id: "pnw",
    label: "PNW",
    aliases: ["pnw", "pacific northwest", "seattle", "portland", "rain", "evergreen"],
    playerTemplates: [
      {
        mode: "clean",
        build: (player) => `${player.lastName} Rainmakers`,
        reason: (player, keyword) => `Uses "${keyword}" as a Pacific Northwest rain theme around ${player.fullName}.`
      },
      {
        mode: "clean",
        build: (player) => `Evergreen ${player.firstName}`,
        reason: (player, keyword) => `Uses "${keyword}" as a regional evergreen theme around ${player.fullName}.`
      }
    ]
  },
  {
    id: "49ers",
    label: "49ers",
    aliases: ["49ers", "niners", "san francisco", "sf", "gold rush"],
    playerTemplates: [
      {
        mode: "clean",
        build: (player) => `Gold Rush ${player.lastName}`,
        reason: (player, keyword) => `Uses "${keyword}" as a 49ers gold-rush theme around ${player.fullName}.`
      },
      {
        mode: "clean",
        build: (player) => `${player.firstName} by the Bay`,
        reason: (player, keyword) => `Uses "${keyword}" as a Bay Area football theme around ${player.fullName}.`
      }
    ]
  },
  {
    id: "losers",
    label: "Losers",
    aliases: ["losers", "last place", "toilet bowl", "trash talk"],
    playerTemplates: [
      {
        mode: "clean",
        build: (player) => `${player.lastName} Last Picks`,
        reason: (player, keyword) => `Uses "${keyword}" as a league-trash-talk theme around ${player.fullName}.`
      },
      {
        mode: "clean",
        build: (player) => `The ${player.firstName} L`,
        reason: (player, keyword) => `Uses "${keyword}" as a short league-joke theme around ${player.fullName}.`
      }
    ]
  }
];

export function generateNames(
  players: Player[],
  keywords: string[],
  mode: ContentMode
): GeneratedName[] {
  const activeKeywordProfiles = resolveKeywordProfiles(keywords);
  const names = [
    ...players.flatMap((player) => templatesForPlayer(player, mode)),
    ...keywords.flatMap((keyword) => templatesForKeyword(keyword, mode)),
    ...players.flatMap((player) =>
      activeKeywordProfiles.flatMap((profile) => templatesForPlayerKeyword(player, profile, mode))
    ),
    ...players.flatMap((player) => referenceTemplatesForPlayer(player, mode)),
    ...keywords.flatMap((keyword) => referenceTemplatesForKeyword(keyword, mode))
  ];

  return dedupe(names).filter((name) => isAllowedForMode(name, mode)).slice(0, MAX_GENERATED_NAMES);
}

function templatesForPlayer(player: Player, mode: ContentMode): GeneratedName[] {
  return (playerTemplates[player.id] ?? [])
    .filter((template) => mode === "explicit" || template.mode === "clean")
    .map((template) => ({
      name: template.name,
      source: player.fullName,
      mode: template.mode,
      reason: template.reason
    }));
}

function templatesForKeyword(keyword: string, mode: ContentMode): GeneratedName[] {
  const normalizedKeyword = normalizeKeyword(keyword);
  return (keywordTemplates[normalizedKeyword] ?? [])
    .filter((template) => mode === "explicit" || template.mode === "clean")
    .map((template) => ({
      name: template.name,
      source: keyword,
      mode: template.mode,
      reason: template.reason,
      keyword
    }));
}

function templatesForPlayerKeyword(player: Player, keywordProfile: KeywordProfile, mode: ContentMode): GeneratedName[] {
  return keywordProfile.playerTemplates
    .filter((template) => mode === "explicit" || template.mode === "clean")
    .filter((template) => template.appliesTo?.(player) ?? true)
    .map((template) => ({
      name: template.build(player),
      source: `${player.fullName} + ${keywordProfile.label}`,
      mode: template.mode,
      reason: template.reason(player, keywordProfile.label),
      keyword: keywordProfile.label
    }));
}

function referenceTemplatesForPlayer(player: Player, mode: ContentMode): GeneratedName[] {
  return referencePatterns
    .filter((pattern) => mode === "explicit" || pattern.mode === "clean")
    .filter((pattern) => pattern.appliesTo(player))
    .map((pattern) => ({
      name: pattern.build(player),
      source: player.fullName,
      mode: pattern.mode,
      reason: pattern.explain(player)
    }));
}

function referenceTemplatesForKeyword(keyword: string, mode: ContentMode): GeneratedName[] {
  const normalizedKeyword = normalizeKeyword(keyword);
  const keywordLabel = formatKeywordLabel(keyword);

  if (!keywordLabel) {
    return [];
  }

  const templates: Template[] = [
    {
      name: `${keywordLabel} League`,
      mode: "clean",
      tags: ["slogan"],
      reason: `Turns "${keyword}" into a league-name style slogan.`
    },
    {
      name: `The ${keywordLabel} Bowl`,
      mode: "clean",
      tags: ["sports"],
      reason: `Uses "${keyword}" as the hook for a championship-style name.`
    },
    {
      name: `${keywordLabel} and Chill`,
      mode: "clean",
      tags: ["brand", "slogan"],
      reason: `Adapts a streaming-era slogan around "${keyword}".`
    },
    {
      name: `Straight Outta ${keywordLabel}`,
      mode: "clean",
      tags: ["music", "movie"],
      reason: `Uses a pop-culture title cadence around "${keyword}".`
    },
    {
      name: `${keywordLabel} Things`,
      mode: "clean",
      tags: ["tv"],
      reason: `Turns "${keyword}" into a TV-title style name.`
    }
  ];

  return templates
    .filter((template) => mode === "explicit" || template.mode === "clean")
    .map((template) => ({
      name: template.name,
      source: keyword,
      mode: template.mode,
      reason: template.reason,
      keyword
    }));
}

function resolveKeywordProfiles(keywords: string[]): KeywordProfile[] {
  const seen = new Set<string>();

  return keywords.flatMap((keyword) => {
    const normalizedKeyword = normalizeKeyword(keyword);
    const profile = keywordProfiles.find((candidate) =>
      candidate.aliases.some((alias) => normalizeKeyword(alias) === normalizedKeyword)
    );

    if (!profile || seen.has(profile.id)) {
      return [];
    }

    seen.add(profile.id);
    return [profile];
  });
}

function normalizeKeyword(keyword: string): string {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function formatKeywordLabel(keyword: string): string {
  const trimmedKeyword = keyword.trim();

  if (/^[A-Z0-9]{2,5}$/.test(trimmedKeyword)) {
    return trimmedKeyword;
  }

  return titleCase(normalizeKeyword(trimmedKeyword));
}

function hasTrait(player: Player, trait: string): boolean {
  return playerTraits[player.id]?.includes(trait) ?? false;
}

export function isAllowedForMode(generatedName: GeneratedName, mode: ContentMode): boolean {
  if (mode === "explicit") {
    return true;
  }

  if (generatedName.mode === "explicit") {
    return false;
  }

  return isCleanSafeName(generatedName.name);
}

export function isCleanSafeName(name: string): boolean {
  const normalizedName = normalizeKeyword(name);
  const words = normalizedName.split(" ").filter(Boolean);

  if (cleanModeBlockedPhrases.some((phrase) => normalizedName.includes(phrase))) {
    return false;
  }

  return !words.some((word) => cleanModeBlockedTerms.includes(word));
}

const playerTraits: Record<string, string[]> = {
  "amon-ra-st-brown": ["air", "nickname", "sun"],
  "bijan-robinson": ["run", "dijon"],
  "ceedee-lamb": ["animal", "lamb", "receiver"],
  "christian-mccaffrey": ["run", "cmc"],
  "jalen-hurts": ["air", "hurt", "qb"],
  "josh-allen": ["air", "all-in", "qb"],
  "justin-jefferson": ["air", "receiver"],
  "kyle-pitts": ["pit", "receiver"],
  "patrick-mahomes": ["air", "home", "qb"],
  "saquon-barkley": ["run", "bark"],
  "travis-kelce": ["receiver", "soundalike"],
  "tyreek-hill": ["speed", "hill", "receiver"]
};

function dedupe(names: GeneratedName[]): GeneratedName[] {
  const seen = new Set<string>();

  return names.filter((generatedName) => {
    const key = generatedName.name.toLowerCase();
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}
