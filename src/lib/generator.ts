import type { Player } from "../data/players";

export type ContentMode = "clean" | "explicit";

export type GeneratedName = {
  name: string;
  source: string;
  mode: ContentMode;
  reason: string;
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
};

const MAX_GENERATED_NAMES = 50;

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
      name: "Lamb of Godwin",
      mode: "clean",
      tags: ["music", "football"],
      reason: "Blends Lamb with a band-name cadence and a football scoring nod."
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
    }
  ]
};

const referencePatterns: ReferencePattern[] = [
  {
    category: "movie",
    source: "Pulp Fiction",
    mode: "clean",
    build: (player) => `${player.lastName} Fiction`
  },
  {
    category: "movie",
    source: "The Dark Knight",
    mode: "clean",
    build: (player) => `The ${player.lastName} Knight`
  },
  {
    category: "movie",
    source: "Jurassic Park",
    mode: "clean",
    build: (player) => `Jurassic ${player.lastName}`
  },
  {
    category: "movie",
    source: "Star Wars",
    mode: "clean",
    build: (player) => `${player.lastName} Wars`
  },
  {
    category: "movie",
    source: "Lord of the Rings",
    mode: "clean",
    build: (player) => `Lord of the ${pluralize(player.lastName)}`
  },
  {
    category: "movie",
    source: "The Godfather",
    mode: "clean",
    build: (player) => `${player.lastName} Godfather`
  },
  {
    category: "movie",
    source: "Back to the Future",
    mode: "clean",
    build: (player) => `Back to the ${player.lastName}`
  },
  {
    category: "movie",
    source: "Ghostbusters",
    mode: "clean",
    build: (player) => `${player.lastName}busters`
  },
  {
    category: "movie",
    source: "The Bourne Identity",
    mode: "clean",
    build: (player) => `The ${player.lastName} Identity`
  },
  {
    category: "movie",
    source: "Raiders of the Lost Ark",
    mode: "clean",
    build: (player) => `Raiders of the Lost ${player.lastName}`
  },
  {
    category: "movie",
    source: "Finding Nemo",
    mode: "clean",
    build: (player) => `Finding ${player.firstName}`
  },
  {
    category: "movie",
    source: "Fight Club",
    mode: "clean",
    build: (player) => `${player.firstName} Club`
  },
  {
    category: "movie",
    source: "No Country for Old Men",
    mode: "clean",
    build: (player) => `No Country for Old ${pluralize(player.lastName)}`
  },
  {
    category: "movie",
    source: "The Fast and the Furious",
    mode: "clean",
    build: (player) => `The Fast and the ${player.lastName}`
  },
  {
    category: "movie",
    source: "Guardians of the Galaxy",
    mode: "clean",
    build: (player) => `Guardians of the ${player.lastName}`
  },
  {
    category: "tv",
    source: "The Last of Us",
    mode: "clean",
    build: (player) => `The Last of ${player.firstName}`
  },
  {
    category: "tv",
    source: "Breaking Bad",
    mode: "clean",
    build: (player) => `Breaking ${player.lastName}`
  },
  {
    category: "tv",
    source: "Stranger Things",
    mode: "clean",
    build: (player) => `Stranger ${pluralize(player.lastName)}`
  },
  {
    category: "tv",
    source: "Better Call Saul",
    mode: "clean",
    build: (player) => `Better Call ${player.firstName}`
  },
  {
    category: "song",
    source: "Uptown Funk",
    mode: "clean",
    build: (player) => `${player.lastName} Funk`
  },
  {
    category: "song",
    source: "Shake It Off",
    mode: "clean",
    build: (player) => `${player.lastName} It Off`
  },
  {
    category: "song",
    source: "Bad Romance",
    mode: "clean",
    build: (player) => `Bad ${player.lastName}`
  },
  {
    category: "song",
    source: "Sweet Caroline",
    mode: "clean",
    build: (player) => `Sweet ${player.firstName}`
  },
  {
    category: "song",
    source: "Can't Stop",
    mode: "clean",
    build: (player) => `Can't Stop ${player.lastName}`
  },
  {
    category: "song",
    source: "All Star",
    mode: "clean",
    build: (player) => `All-${player.team} ${player.lastName}`
  },
  {
    category: "brand",
    source: "Netflix",
    mode: "clean",
    build: (player) => `Netflix and ${player.lastName}`
  },
  {
    category: "brand",
    source: "Nike",
    mode: "clean",
    build: (player) => `Just ${player.lastName} It`
  },
  {
    category: "brand",
    source: "Taco Bell",
    mode: "clean",
    build: (player) => `Taco ${player.lastName}`
  },
  {
    category: "slogan",
    source: "Got Milk?",
    mode: "clean",
    build: (player) => `Got ${player.lastName}?`
  },
  {
    category: "slogan",
    source: "Keep Calm and Carry On",
    mode: "clean",
    build: (player) => `Keep Calm and ${player.lastName} On`
  },
  {
    category: "sports",
    source: "Waiver wire",
    mode: "clean",
    build: (player) => `${player.lastName} on the Waiver Wire`
  },
  {
    category: "sports",
    source: "End zone",
    mode: "clean",
    build: (player) => `${player.firstName} Zone`
  }
];

export function generateNames(
  players: Player[],
  keywords: string[],
  mode: ContentMode
): GeneratedName[] {
  const names = [
    ...players.flatMap((player) => templatesForPlayer(player, mode)),
    ...keywords.flatMap((keyword) => templatesForKeyword(keyword, mode)),
    ...players.flatMap((player) => referenceTemplatesForPlayer(player, mode)),
    ...keywords.flatMap((keyword) => referenceTemplatesForKeyword(keyword, mode))
  ];

  return dedupe(names).slice(0, MAX_GENERATED_NAMES);
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
      reason: template.reason
    }));
}

function referenceTemplatesForPlayer(player: Player, mode: ContentMode): GeneratedName[] {
  return referencePatterns
    .filter((pattern) => mode === "explicit" || pattern.mode === "clean")
    .map((pattern) => ({
      name: pattern.build(player),
      source: player.fullName,
      mode: pattern.mode,
      reason: `Scans the ${pattern.category} reference "${pattern.source}" and adapts it around ${player.fullName}.`
    }))
    .filter((generatedName) => isUsefulName(generatedName.name, player));
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
      reason: template.reason
    }));
}

function normalizeKeyword(keyword: string): string {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function isUsefulName(name: string, player: Player): boolean {
  const normalizedName = normalizeKeyword(name);
  const normalizedFirst = normalizeKeyword(player.firstName);
  const normalizedLast = normalizeKeyword(player.lastName);

  return normalizedName.includes(normalizedFirst) || normalizedName.includes(normalizedLast);
}

function pluralize(value: string): string {
  if (value.endsWith("s")) {
    return value;
  }

  if (value.endsWith("y")) {
    return `${value.slice(0, -1)}ies`;
  }

  return `${value}s`;
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
