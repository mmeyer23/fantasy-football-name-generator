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

type ReferencePhrase = {
  category: string;
  source: string;
  mode: ContentMode;
  targetSound: string;
  build: (atom: PlayerPunAtom) => string;
  explain: (player: Player, atom: PlayerPunAtom) => string;
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

type CustomKeywordProfile = {
  label: string;
  original: string;
};

export type PlayerNamePart = "first" | "last" | "alias";

export type PlayerPunAtom = {
  part: PlayerNamePart;
  replacement: string;
  soundsLike: string[];
  phraseHooks: string[];
};

type PlayerPunProfile = {
  atoms: PlayerPunAtom[];
  templates: Template[];
};

const MAX_GENERATED_NAMES = 50;
const MIN_CUSTOM_KEYWORD_LENGTH = 2;

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

const ignoredCustomKeywords = new Set(["a", "an", "and", "for", "of", "or", "the", "with"]);

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

const playerPunProfiles: Record<string, PlayerPunProfile> = {
  "bijan-robinson": {
    atoms: [
      {
        part: "first",
        replacement: "Bijan",
        soundsLike: ["dijon", "beyond"],
        phraseHooks: ["Dijon mustard", "Bed Bath & Beyond", "to infinity and beyond"]
      }
    ],
    templates: []
  },
  "christian-mccaffrey": {
    atoms: [
      {
        part: "alias",
        replacement: "McCaff",
        soundsLike: ["calf", "mccafe"],
        phraseHooks: ["pulled a calf", "McCafe"]
      },
      {
        part: "alias",
        replacement: "CMC",
        soundsLike: ["run dmc", "cmc"],
        phraseHooks: ["Run-DMC"]
      }
    ],
    templates: []
  },
  "jahmyr-gibbs": {
    atoms: [
      {
        part: "last",
        replacement: "Gibbs",
        soundsLike: ["ribs", "gives"],
        phraseHooks: ["Baby Back Ribs", "give and take", "gimme the loot"]
      }
    ],
    templates: [
      {
        name: "Baby Back Gibbs",
        mode: "clean",
        tags: ["food", "soundalike", "classic"],
        reason: "Uses Gibbs as a ribs soundalike in the familiar baby back ribs phrase."
      },
      {
        name: "Gibbs and Take",
        mode: "clean",
        tags: ["phrase", "soundalike"],
        reason: "Uses Gibbs as a gives soundalike in the phrase give and take."
      },
      {
        name: "Gibbs Me the Loot",
        mode: "clean",
        tags: ["song", "soundalike"],
        reason: "Uses Gibbs as a gives soundalike in a recognizable song-title cadence."
      }
    ]
  },
  "drake-maye": {
    atoms: [
      {
        part: "last",
        replacement: "Maye",
        soundsLike: ["may", "mayhem"],
        phraseHooks: ["mayhem", "come what may", "may the force be with you"]
      },
      {
        part: "first",
        replacement: "Drake",
        soundsLike: ["drake"],
        phraseHooks: ["Drake", "Hotline Bling", "Started from the Bottom"]
      }
    ],
    templates: [
      {
        name: "Mayehem",
        mode: "clean",
        tags: ["soundalike", "wordplay"],
        reason: "Uses Maye as the opening sound in mayhem."
      },
      {
        name: "Come What Maye",
        mode: "clean",
        tags: ["phrase", "soundalike"],
        reason: "Uses Maye as a direct may soundalike in a familiar phrase."
      },
      {
        name: "Maye the Force Be With You",
        mode: "clean",
        tags: ["movie", "soundalike"],
        reason: "Uses Maye as a may soundalike in a recognizable movie quote."
      }
    ]
  },
  "ladd-mcconkey": {
    atoms: [
      {
        part: "first",
        replacement: "Ladd",
        soundsLike: ["lad", "glad", "gladiator"],
        phraseHooks: ["lad", "glad", "Gladiator"]
      },
      {
        part: "last",
        replacement: "McConkey",
        soundsLike: ["monkey", "donkey", "honky", "conk", "key"],
        phraseHooks: [
          "Donkey Kong",
          "Donkey Kong Country",
          "Pin the Tail on the Donkey",
          "Honky Tonk Blues",
          "monkey business"
        ]
      }
    ],
    templates: [
      {
        name: "McConkey Kong",
        mode: "clean",
        tags: ["game", "soundalike"],
        reason: "Uses McConkey as a monkey soundalike in the Donkey Kong reference."
      },
      {
        name: "McConkey Business",
        mode: "clean",
        tags: ["phrase", "soundalike"],
        reason: "Uses McConkey as a monkey soundalike in the phrase monkey business."
      },
      {
        name: "McConkey Kong Country",
        mode: "clean",
        tags: ["game", "soundalike"],
        reason: "Uses McConkey as a donkey soundalike in the Donkey Kong Country game title."
      },
      {
        name: "Pin the Tail on the McConkey",
        mode: "clean",
        tags: ["game", "soundalike"],
        reason: "Uses McConkey as a donkey soundalike in the party-game phrase."
      },
      {
        name: "McConkey Tonk Blues",
        mode: "clean",
        tags: ["song", "soundalike"],
        reason: "Uses McConkey as a honky soundalike in a recognizable country-song phrase."
      },
      {
        name: "Laddiator",
        mode: "clean",
        tags: ["movie", "soundalike"],
        reason: "Blends Ladd into Gladiator with a clear first-name sound hook."
      },
      {
        name: "No McConkeying Around",
        mode: "clean",
        tags: ["phrase", "soundalike"],
        reason: "Uses McConkey as a monkey soundalike in a common phrase."
      }
    ]
  }
};

const referencePhrases: ReferencePhrase[] = [
  {
    category: "brand",
    source: "Bed Bath & Beyond",
    mode: "clean",
    targetSound: "beyond",
    build: (atom) => `Bed, Bath, and ${atom.replacement}`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "beyond")} soundalike in a familiar brand phrase.`
  },
  {
    category: "phrase",
    source: "Pulled a calf",
    mode: "clean",
    targetSound: "calf",
    build: (atom) => `I Think I Pulled ${atom.replacement}`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "calf")} soundalike in an injury phrase.`
  },
  {
    category: "game",
    source: "Donkey Kong Country",
    mode: "clean",
    targetSound: "donkey",
    build: (atom) => `${atom.replacement} Kong Country`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "donkey")} soundalike in the game title.`
  },
  {
    category: "game",
    source: "Pin the Tail on the Donkey",
    mode: "clean",
    targetSound: "donkey",
    build: (atom) => `Pin the Tail on the ${atom.replacement}`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "donkey")} soundalike in the party-game phrase.`
  },
  {
    category: "song",
    source: "Honky Tonk Blues",
    mode: "clean",
    targetSound: "honky",
    build: (atom) => `${atom.replacement} Tonk Blues`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "honky")} soundalike in a country-song phrase.`
  },
  {
    category: "movie",
    source: "Gladiator",
    mode: "clean",
    targetSound: "gladiator",
    build: (atom) => `${atom.replacement}iator`,
    explain: (player, atom) =>
      `Blends ${atom.replacement} from ${player.fullName} into the Gladiator title because the opening sound matches.`
  },
  {
    category: "food",
    source: "Baby Back Ribs",
    mode: "clean",
    targetSound: "ribs",
    build: (atom) => `Baby Back ${atom.replacement}`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "ribs")} soundalike in a food phrase.`
  },
  {
    category: "movie",
    source: "May the Force Be With You",
    mode: "clean",
    targetSound: "may",
    build: (atom) => `${atom.replacement} the Force Be With You`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "may")} soundalike in a movie quote.`
  },
  {
    category: "song",
    source: "Run-DMC",
    mode: "clean",
    targetSound: "run dmc",
    build: (atom) => `Run ${atom.replacement}`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct Run-DMC music reference.`
  },
  {
    category: "food",
    source: "Dijon mustard",
    mode: "clean",
    targetSound: "dijon",
    build: (atom) => `${atom.replacement} Mustard`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "dijon")} soundalike in a food phrase.`
  },
  {
    category: "movie",
    source: "Love Actually",
    mode: "clean",
    targetSound: "love",
    build: (atom) => `${atom.replacement} Actually`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct movie-title reference.`
  },
  {
    category: "song",
    source: "All You Need Is Love",
    mode: "clean",
    targetSound: "love",
    build: (atom) => `All You Need Is ${atom.replacement}`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct song-title reference.`
  },
  {
    category: "tv",
    source: "Too Many Cooks",
    mode: "clean",
    targetSound: "cook",
    build: (atom) => `Too Many ${pluralizeAtom(atom)}`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct TV-reference phrase.`
  },
  {
    category: "song",
    source: "London Calling",
    mode: "clean",
    targetSound: "london",
    build: (atom) => `${atom.replacement} Calling`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct song-title reference.`
  },
  {
    category: "slogan",
    source: "We're not worthy",
    mode: "clean",
    targetSound: "worthy",
    build: (atom) => `We're Not ${atom.replacement}`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a familiar pop-culture slogan.`
  },
  {
    category: "brand",
    source: "Rice Krispies",
    mode: "clean",
    targetSound: "rice",
    build: (atom) => `${atom.replacement} Krispies`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct cereal-brand reference.`
  },
  {
    category: "song",
    source: "Brown Eyed Girl",
    mode: "clean",
    targetSound: "brown",
    build: (atom) => `${atom.replacement} Eyed Squad`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a recognizable song-title cadence.`
  },
  {
    category: "song",
    source: "Flowers",
    mode: "clean",
    targetSound: "flowers",
    build: (atom) => `I Can Buy Myself ${atom.replacement}`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct song-title reference.`
  },
  {
    category: "brand",
    source: "Chase Bank",
    mode: "clean",
    targetSound: "chase",
    build: (atom) => `${atom.replacement} Bank`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct brand-name reference.`
  },
  {
    category: "slogan",
    source: "Cut to the chase",
    mode: "clean",
    targetSound: "chase",
    build: (atom) => `Cut to the ${atom.replacement}`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a familiar phrase.`
  },
  {
    category: "movie",
    source: "The Fast and the Furious",
    mode: "clean",
    targetSound: "swift",
    build: (atom) => `The Fast and the ${atom.replacement}`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} because swift means fast.`
  },
  {
    category: "music",
    source: "Taylor Swift",
    mode: "clean",
    targetSound: "swift",
    build: (atom) => `Taylor ${atom.replacement}`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct music-celebrity reference.`
  },
  {
    category: "slogan",
    source: "Hall of Fame",
    mode: "clean",
    targetSound: "hall",
    build: (atom) => `${atom.replacement} of Fame`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct achievement phrase.`
  },
  {
    category: "food",
    source: "Baker's dozen",
    mode: "clean",
    targetSound: "baker",
    build: (atom) => `${atom.replacement}'s Dozen`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct food phrase.`
  },
  {
    category: "anime",
    source: "Hunter x Hunter",
    mode: "clean",
    targetSound: "hunter",
    build: (atom) => `${atom.replacement} x ${atom.replacement}`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct anime-title reference.`
  },
  {
    category: "slogan",
    source: "Pickens and grinnin",
    mode: "clean",
    targetSound: "pickens",
    build: (atom) => `${atom.replacement} and Grinnin'`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a familiar music phrase.`
  },
  {
    category: "slogan",
    source: "Mark my words",
    mode: "clean",
    targetSound: "mark",
    build: (atom) => `${atom.replacement} My Words`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a familiar phrase.`
  },
  {
    category: "slogan",
    source: "Meet Joe Black",
    mode: "clean",
    targetSound: "joe",
    build: (atom) => `Meet ${atom.replacement} Stack`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a movie-title cadence with a football finish.`
  },
  {
    category: "slogan",
    source: "What can Brown do for you",
    mode: "clean",
    targetSound: "brown",
    build: (atom) => `What Can ${atom.replacement} Do for You?`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a familiar brand-slogan cadence.`
  }
];

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
  const customKeywordProfiles = resolveCustomKeywordProfiles(keywords, activeKeywordProfiles);
  const names = [
    ...players.flatMap((player) => templatesForPlayerPunProfile(player, mode)),
    ...players.flatMap((player) => referencePhraseTemplatesForPlayer(player, mode)),
    ...players.flatMap((player) => templatesForPlayer(player, mode)),
    ...keywords.flatMap((keyword) => templatesForKeyword(keyword, mode)),
    ...players.flatMap((player) =>
      activeKeywordProfiles.flatMap((profile) => templatesForPlayerKeyword(player, profile, mode))
    ),
    ...players.flatMap((player) =>
      customKeywordProfiles.flatMap((profile) => templatesForCustomPlayerKeyword(player, profile, mode))
    ),
    ...players.flatMap((player) => referenceTemplatesForPlayer(player, mode)),
    ...customKeywordProfiles.flatMap((profile) => referenceTemplatesForCustomKeyword(profile, mode))
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

function templatesForCustomPlayerKeyword(
  player: Player,
  keywordProfile: CustomKeywordProfile,
  mode: ContentMode
): GeneratedName[] {
  const templates: Template[] = [
    {
      name: `${player.lastName}'s ${keywordProfile.label} Club`,
      mode: "clean",
      tags: ["custom-keyword", "club"],
      reason: `Uses "${keywordProfile.original}" as a custom theme owned by ${player.fullName}.`
    },
    {
      name: `${player.firstName}'s ${keywordProfile.label} Playbook`,
      mode: "clean",
      tags: ["custom-keyword", "football"],
      reason: `Uses "${keywordProfile.original}" as a custom playbook theme around ${player.fullName}.`
    }
  ];

  return templates
    .filter((template) => mode === "explicit" || template.mode === "clean")
    .map((template) => ({
      name: template.name,
      source: `${player.fullName} + ${keywordProfile.label}`,
      mode: template.mode,
      reason: template.reason,
      keyword: keywordProfile.label
    }));
}

function templatesForPlayerPunProfile(player: Player, mode: ContentMode): GeneratedName[] {
  const profile = playerPunProfiles[player.id];

  if (!profile) {
    return [];
  }

  return profile.templates
    .filter((template) => mode === "explicit" || template.mode === "clean")
    .map((template) => ({
      name: template.name,
      source: player.fullName,
      mode: template.mode,
      reason: `${template.reason} Sound hooks: ${summarizePunAtoms(getPlayerPunAtoms(player))}.`
    }));
}

export function getPlayerPunAtoms(player: Player): PlayerPunAtom[] {
  const profile = playerPunProfiles[player.id];
  const baselineAtoms: PlayerPunAtom[] = [
    {
      part: "first",
      replacement: player.firstName,
      soundsLike: [player.firstName],
      phraseHooks: [player.firstName]
    },
    {
      part: "last",
      replacement: player.lastName,
      soundsLike: [player.lastName],
      phraseHooks: [player.lastName]
    },
    ...(player.aliases ?? []).map((alias): PlayerPunAtom => ({
      part: "alias",
      replacement: alias,
      soundsLike: [alias],
      phraseHooks: [alias]
    }))
  ];

  return dedupePunAtoms([...baselineAtoms, ...(profile?.atoms ?? [])]);
}

function summarizePunAtoms(atoms: PlayerPunAtom[]): string {
  return atoms.flatMap((atom) => atom.soundsLike).join(", ");
}

function referencePhraseTemplatesForPlayer(player: Player, mode: ContentMode): GeneratedName[] {
  const atoms = getPlayerPunAtoms(player);

  return referencePhrases
    .filter((phrase) => mode === "explicit" || phrase.mode === "clean")
    .flatMap((phrase) =>
      atoms
        .filter((atom) => atomMatchesReferencePhrase(atom, phrase))
        .map((atom) => ({
          name: phrase.build(atom),
          source: player.fullName,
          mode: phrase.mode,
          reason: phrase.explain(player, atom)
        }))
    );
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

function referenceTemplatesForCustomKeyword(
  keywordProfile: CustomKeywordProfile,
  mode: ContentMode
): GeneratedName[] {
  const templates: Template[] = [
    {
      name: `${keywordProfile.label} League`,
      mode: "clean",
      tags: ["slogan"],
      reason: `Uses "${keywordProfile.original}" as a custom league theme.`
    },
    {
      name: `The ${keywordProfile.label} Bowl`,
      mode: "clean",
      tags: ["sports"],
      reason: `Uses "${keywordProfile.original}" as the hook for a championship-style name.`
    },
    {
      name: `${keywordProfile.label} Playbook`,
      mode: "clean",
      tags: ["football"],
      reason: `Uses "${keywordProfile.original}" as a football playbook theme.`
    },
    {
      name: `${keywordProfile.label} Crew`,
      mode: "clean",
      tags: ["custom-keyword"],
      reason: `Uses "${keywordProfile.original}" as a simple custom group identity.`
    },
    {
      name: `${keywordProfile.label} End Zone`,
      mode: "clean",
      tags: ["football"],
      reason: `Uses "${keywordProfile.original}" as a scoring-area football theme.`
    }
  ];

  return templates
    .filter((template) => mode === "explicit" || template.mode === "clean")
    .map((template) => ({
      name: template.name,
      source: keywordProfile.original,
      mode: template.mode,
      reason: template.reason,
      keyword: keywordProfile.label
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

function resolveCustomKeywordProfiles(
  keywords: string[],
  activeKeywordProfiles: KeywordProfile[]
): CustomKeywordProfile[] {
  const seen = new Set<string>();
  const recognizedAliases = new Set(
    activeKeywordProfiles.flatMap((profile) => profile.aliases.map((alias) => normalizeKeyword(alias)))
  );

  return keywords.flatMap((keyword) => {
    const normalizedKeyword = normalizeKeyword(keyword);

    if (
      !normalizedKeyword ||
      normalizedKeyword.length < MIN_CUSTOM_KEYWORD_LENGTH ||
      ignoredCustomKeywords.has(normalizedKeyword) ||
      recognizedAliases.has(normalizedKeyword) ||
      seen.has(normalizedKeyword)
    ) {
      return [];
    }

    seen.add(normalizedKeyword);
    return [
      {
        label: formatKeywordLabel(keyword),
        original: keyword
      }
    ];
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

function atomMatchesReferencePhrase(atom: PlayerPunAtom, phrase: ReferencePhrase): boolean {
  const normalizedTarget = normalizeKeyword(phrase.targetSound);

  return atom.soundsLike.some((sound) => normalizeKeyword(sound) === normalizedTarget);
}

function targetSoundLabel(atom: PlayerPunAtom, targetSound: string): string {
  return atom.soundsLike.find((sound) => normalizeKeyword(sound) === normalizeKeyword(targetSound)) ?? targetSound;
}

function pluralizeAtom(atom: PlayerPunAtom): string {
  return atom.replacement.endsWith("s") ? atom.replacement : `${atom.replacement}s`;
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

function dedupePunAtoms(atoms: PlayerPunAtom[]): PlayerPunAtom[] {
  const seen = new Set<string>();

  return atoms.filter((atom) => {
    const key = `${atom.part}:${normalizeKeyword(atom.replacement)}:${atom.soundsLike
      .map((sound) => normalizeKeyword(sound))
      .join("|")}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}
