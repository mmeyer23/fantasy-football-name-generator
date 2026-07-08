import { phraseCorpus, type PhraseCorpusEntry, type PhraseCorpusTarget } from "../data/phraseCorpus";
import type { Player } from "../data/players";

export type ContentMode = "clean" | "explicit";

export type GeneratedName = {
  name: string;
  source: string;
  mode: ContentMode;
  reason: string;
  keyword?: string;
  referencePhrase?: string;
  replacedWord?: string;
  playerAtom?: string;
  matchKind?: PunMatchKind;
  score?: number;
  sourceType?: GeneratedNameSourceType;
  isValidatedPun?: boolean;
};

export type PunMatchKind = "exact" | "soundalike" | "alias" | "phonetic" | "rhyme" | "curated";

export type GeneratedNameSourceType =
  | "phrase-corpus"
  | "curated-reference"
  | "curated-template"
  | "keyword"
  | "custom-keyword"
  | "fallback";

export type PunMatch = {
  matchKind: PunMatchKind;
  score: number;
  matchedSound: string;
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
  build: (atom: PlayerPunAtom, player: Player) => string;
  explain: (player: Player, atom: PlayerPunAtom) => string;
  variants?: ReferencePhraseVariant[];
};

type ReferencePhraseVariant = {
  source: string;
  build: (atom: PlayerPunAtom, player: Player) => string;
  explain?: (player: Player, atom: PlayerPunAtom) => string;
};

type PhraseFrame = {
  source: string;
  mode: ContentMode;
  targetSound: string;
  build: (atom: PlayerPunAtom, player: Player) => string;
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
const MAX_NAMES_PER_REPLACED_WORD = 12;
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

const alliterativeIdeaWords: Record<string, string[]> = {
  a: ["Airwaves", "Alliance", "Afterburners", "Avalanche"],
  b: ["Breakers", "Brigade", "Buzz", "Barricade"],
  c: ["Command", "Circuit", "Carnival", "Collective"],
  d: ["Dynasty", "Drive", "District", "Detonators"],
  e: ["Empire", "Express", "Energy", "Encore"],
  f: ["Factory", "Force", "Fever", "Finale"],
  g: ["Galaxy", "Guild", "Gridlock", "Goldmine"],
  h: ["Havoc", "House", "Hammer", "Highway"],
  i: ["Inferno", "Impact", "Illusion", "Institute"],
  j: ["Juggernauts", "Jukebox", "Jetstream", "Justice"],
  k: ["Kingdom", "Krew", "Kickstart", "Knockout"],
  l: ["Legends", "Laboratory", "Lightning", "Lounge"],
  m: ["Machine", "Mayhem", "Ministry", "Miracle"],
  n: ["Nation", "Network", "Nightshift", "Nova"],
  o: ["Outlaws", "Odyssey", "Overdrive", "Orbit"],
  p: ["Party", "Project", "Powerhouse", "Parade"],
  q: ["Quest", "Quake", "Quorum", "Quickstrike"],
  r: ["Rebellion", "Revival", "Rush", "Renegades"],
  s: ["Show", "Society", "Storm", "Syndicate"],
  t: ["Takeover", "Train", "Theory", "Titans"],
  u: ["Union", "Uprising", "Undercard", "Universe"],
  v: ["Voltage", "Vortex", "Vanguard", "Victory"],
  w: ["Workshop", "Wave", "War Room", "Wildfire"],
  x: ["X-Factor", "Xpress", "Xperiment", "Xchange"],
  y: ["Yard", "Yearbook", "Yacht Club", "Yellowjackets"],
  z: ["Zone", "Zeppelin", "Zeitgeist", "Zero Hour"]
};

const positionIdeaWords: Record<Player["position"], string[]> = {
  QB: ["Audibles", "Air Show", "Pocket Presence", "Two-Minute Drill", "Launch Codes", "QB Club"],
  RB: ["Ground Game", "Breakaway", "Backfield", "Goal-Line Club", "Run Game", "Yard Factory"],
  WR: ["Route Lab", "Deep Shots", "Hands Team", "Catch Radius", "Sideline Show", "Target Share"],
  TE: ["Mismatch", "Seam Team", "Red-Zone Room", "Hands Department", "YAC Lab", "Safety Valve"],
  K: ["Kick Club", "Uprights", "Field Goals", "Leg Day", "Boot Room", "Three-Point Plan"],
  DST: ["Takeaways", "Pass Rush", "No-Fly Zone", "Turnover Factory", "Pressure Package", "Pick Parade"]
};

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
  "amon-ra-st-brown": {
    atoms: [
      {
        part: "alias",
        replacement: "Sun",
        soundsLike: ["sun"],
        phraseHooks: ["Here Comes the Sun", "Sunshine of Your Love", "God mode"]
      },
      {
        part: "alias",
        replacement: "Sun God",
        soundsLike: ["god"],
        phraseHooks: ["God mode", "God of Thunder"]
      },
      {
        part: "first",
        replacement: "Ra",
        soundsLike: ["ra", "raw"],
        phraseHooks: ["ra ra", "raw power"]
      }
    ],
    templates: []
  },
  "breece-hall": {
    atoms: [
      {
        part: "first",
        replacement: "Breece",
        soundsLike: ["reese", "grease", "breeze", "breezy", "beast"],
        phraseHooks: ["Reese's Pieces", "Grease Lightning", "Summer Breeze", "easy breezy", "beast mode"]
      },
      {
        part: "last",
        replacement: "Hall",
        soundsLike: ["hall", "all"],
        phraseHooks: ["Hall of Fame", "hall pass", "hall monitor", "all or nothing", "against all odds"]
      }
    ],
    templates: []
  },
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
  "de-von-achane": {
    atoms: [
      {
        part: "first",
        replacement: "De'Von",
        soundsLike: ["divine", "devon"],
        phraseHooks: ["divine intervention", "Devon"]
      },
      {
        part: "last",
        replacement: "Achane",
        soundsLike: ["a chain", "chain", "chains", "chained", "insane", "asians", "machine", "train"],
        phraseHooks: [
          "Insane in the Membrane",
          "Crazy Rich Asians",
          "chain reaction",
          "Django Unchained",
          "Alice in Chains",
          "Rage Against the Machine",
          "the train has left the station"
        ]
      }
    ],
    templates: []
  },
  "derrick-henry": {
    atoms: [
      {
        part: "first",
        replacement: "Derrick",
        soundsLike: ["direction", "direct", "directly"],
        phraseHooks: ["One Direction", "go directly to jail"]
      },
      {
        part: "last",
        replacement: "Henry",
        soundsLike: ["anything", "hen", "henhouse", "henry"],
        phraseHooks: ["I Would Do Anything for Love", "fox in the henhouse", "Henry Danger"]
      },
      {
        part: "alias",
        replacement: "King Henry",
        soundsLike: ["king", "henry"],
        phraseHooks: ["King of the Hill", "Henry VIII", "Long Live the King"]
      }
    ],
    templates: []
  },
  "ceedee-lamb": {
    atoms: [
      {
        part: "first",
        replacement: "CeeDee",
        soundsLike: ["cd"],
        phraseHooks: ["CD", "CD-ROM"]
      },
      {
        part: "first",
        replacement: "CeeDeeCee",
        soundsLike: ["cdc"],
        phraseHooks: ["CDC Guidelines"]
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
  "james-cook": {
    atoms: [
      {
        part: "last",
        replacement: "Cook",
        soundsLike: ["cook", "cooks", "cooking"],
        phraseHooks: ["Too Many Cooks", "What's Cooking", "Cook Out"]
      }
    ],
    templates: []
  },
  "justin-jefferson": {
    atoms: [
      {
        part: "first",
        replacement: "Justin",
        soundsLike: ["just", "just in", "justice"],
        phraseHooks: ["Just in Time", "Just in Case", "Justice League"]
      },
      {
        part: "last",
        replacement: "Jefferson",
        soundsLike: ["jefferson", "jetsons"],
        phraseHooks: ["Jefferson Airplane", "The Jetsons"]
      },
      {
        part: "alias",
        replacement: "Griddy",
        soundsLike: ["city"],
        phraseHooks: ["We Built This City"]
      }
    ],
    templates: []
  },
  "jahmyr-gibbs": {
    atoms: [
      {
        part: "first",
        replacement: "Jahmyr",
        soundsLike: ["mirror"],
        phraseHooks: ["Man in the Mirror"]
      },
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
  "malik-nabers": {
    atoms: [
      {
        part: "last",
        replacement: "Nabers",
        soundsLike: ["neighbors"],
        phraseHooks: ["Won't You Be My Neighbor", "Good Neighbors", "Neighbors"]
      }
    ],
    templates: []
  },
  "puka-nacua": {
    atoms: [
      {
        part: "first",
        replacement: "Puka",
        soundsLike: ["puka"],
        phraseHooks: ["puka shell"]
      },
      {
        part: "last",
        replacement: "Nacua",
        soundsLike: ["hakuna"],
        phraseHooks: ["Hakuna Matata"]
      }
    ],
    templates: []
  },
  "kyren-williams": {
    atoms: [
      {
        part: "first",
        replacement: "Kyren",
        soundsLike: ["crying"],
        phraseHooks: ["for crying out loud"]
      }
    ],
    templates: []
  },
  "saquon-barkley": {
    atoms: [
      {
        part: "first",
        replacement: "Saquon",
        soundsLike: ["so gone"],
        phraseHooks: ["so gone", "Gone with the Wind"]
      },
      {
        part: "last",
        replacement: "Barkley",
        soundsLike: ["bark", "barkley"],
        phraseHooks: ["Bark at the Moon", "no bark all bite", "Bark Side"]
      }
    ],
    templates: []
  },
  "tyreek-hill": {
    atoms: [
      {
        part: "last",
        replacement: "Hill",
        soundsLike: ["hill"],
        phraseHooks: ["King of the Hill", "The Hills Have Eyes", "Hill Street Blues"]
      }
    ],
    templates: []
  },
  "travis-kelce": {
    atoms: [
      {
        part: "last",
        replacement: "Kelce",
        soundsLike: ["kelsey", "chelsea", "else"],
        phraseHooks: ["Kelsey Grammer", "Chelsea Dagger", "Nothing Else Matters"]
      },
      {
        part: "alias",
        replacement: "TK",
        soundsLike: ["tk"],
        phraseHooks: ["TK"]
      }
    ],
    templates: []
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
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "beyond")} soundalike in a familiar brand phrase.`,
    variants: [
      {
        source: "To infinity and beyond",
        build: (atom) => `To Infinity and ${atom.replacement}`
      },
      {
        source: "Beyond belief",
        build: (atom) => `${atom.replacement} Belief`
      },
      {
        source: "Beyond the Sea",
        build: (atom) => `${atom.replacement} the Sea`
      }
    ]
  },
  {
    category: "phrase",
    source: "Pulled a calf",
    mode: "clean",
    targetSound: "calf",
    build: (atom) => `I Think I Pulled ${atom.replacement}`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "calf")} soundalike in an injury phrase.`,
    variants: [
      {
        source: "Calf raises",
        build: (atom) => `${atom.replacement} Raises`
      },
      {
        source: "Calf strain",
        build: (atom) => `${atom.replacement} Strain`
      }
    ]
  },
  {
    category: "brand",
    source: "McCafe",
    mode: "clean",
    targetSound: "mccafe",
    build: (atom) => `${atom.replacement} Latte`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "mccafe")} soundalike in a coffee-brand phrase.`,
    variants: [
      {
        source: "Cafe mocha",
        build: (atom) => `${atom.replacement} Mocha`
      },
      {
        source: "Coffee run",
        build: (atom) => `${atom.replacement} Coffee Run`
      }
    ]
  },
  {
    category: "music",
    source: "One Direction",
    mode: "clean",
    targetSound: "direction",
    build: (atom) => `One ${atom.replacement}tion`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as the opening sound in a One Direction-style phrase.`,
    variants: [
      {
        source: "Wrong direction",
        build: (atom) => `Wrong ${atom.replacement}tion`
      },
      {
        source: "Final direction",
        build: (atom) => `Final ${atom.replacement}tion`
      }
    ]
  },
  {
    category: "game",
    source: "Go directly to jail",
    mode: "clean",
    targetSound: "directly",
    build: (atom) => `Go ${atom.replacement}ly to Jail`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as the opening sound in a familiar board-game instruction.`
  },
  {
    category: "song",
    source: "I Would Do Anything for Love",
    mode: "clean",
    targetSound: "anything",
    build: (atom) => `I Would Do ${atom.replacement}thing for Love`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as the opening sound in a song-title phrase.`,
    variants: [
      {
        source: "Anything goes",
        build: (atom) => `${atom.replacement}thing Goes`
      }
    ]
  },
  {
    category: "phrase",
    source: "Fox in the henhouse",
    mode: "clean",
    targetSound: "henhouse",
    build: (atom) => `Fox in the ${atom.replacement}house`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as the opening sound in a familiar henhouse phrase.`
  },
  {
    category: "tv",
    source: "Henry Danger",
    mode: "clean",
    targetSound: "henry",
    build: (atom) => `${atom.replacement} Danger`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct TV-title reference.`,
    variants: [
      {
        source: "King Henry's Court",
        build: (atom) => `${possessiveAtom(atom)} Court`
      },
      {
        source: "Henry VIII",
        build: (atom) => `${atom.replacement} VIII`
      }
    ]
  },
  {
    category: "game",
    source: "Donkey Kong Country",
    mode: "clean",
    targetSound: "donkey",
    build: (atom) => `${atom.replacement} Kong Country`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "donkey")} soundalike in the game title.`,
    variants: [
      {
        source: "Donkey Kong",
        build: (atom) => `${atom.replacement} Kong`
      },
      {
        source: "Donkey Kong Jr.",
        build: (atom) => `${atom.replacement} Kong Jr.`
      }
    ]
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
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "honky")} soundalike in a country-song phrase.`,
    variants: [
      {
        source: "Honky Cat",
        build: (atom) => `${atom.replacement} Cat`
      }
    ]
  },
  {
    category: "movie",
    source: "Gladiator",
    mode: "clean",
    targetSound: "gladiator",
    build: (atom) => `${atom.replacement}iator`,
    explain: (player, atom) =>
      `Blends ${atom.replacement} from ${player.fullName} into the Gladiator title because the opening sound matches.`,
    variants: [
      {
        source: "Are you not entertained",
        build: (atom) => `${atom.replacement}, Are You Not Entertained?`
      }
    ]
  },
  {
    category: "phrase",
    source: "Monkey business",
    mode: "clean",
    targetSound: "monkey",
    build: (atom) => `${atom.replacement} Business`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "monkey")} soundalike in a familiar phrase.`,
    variants: [
      {
        source: "Monkey see, monkey do",
        build: (atom) => `${atom.replacement} See, ${atom.replacement} Do`
      },
      {
        source: "Monkey wrench",
        build: (atom) => `${atom.replacement} Wrench`
      }
    ]
  },
  {
    category: "food",
    source: "Baby Back Ribs",
    mode: "clean",
    targetSound: "ribs",
    build: (atom) => `Baby Back ${atom.replacement}`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "ribs")} soundalike in a food phrase.`,
    variants: [
      {
        source: "Spare ribs",
        build: (atom) => `Spare ${atom.replacement}`
      },
      {
        source: "Rib tips",
        build: (atom) => `${atom.replacement} Tips`
      },
      {
        source: "Ribeye",
        build: (atom) => `${atom.replacement} Eye`
      }
    ]
  },
  {
    category: "phrase",
    source: "Give and take",
    mode: "clean",
    targetSound: "gives",
    build: (atom) => `${atom.replacement} and Take`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "gives")} soundalike in a familiar phrase.`,
    variants: [
      {
        source: "Gimme the loot",
        build: (atom) => `${atom.replacement} Me the Loot`
      },
      {
        source: "Give me shelter",
        build: (atom) => `${atom.replacement} Me Shelter`
      }
    ]
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
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct Run-DMC music reference.`,
    variants: [
      {
        source: "It's Tricky",
        build: (atom) => `It's Tricky ${atom.replacement}`
      },
      {
        source: "Walk This Way",
        build: (atom) => `${atom.replacement} This Way`
      },
      {
        source: "King of Rock",
        build: (atom) => `King of ${atom.replacement}`
      }
    ]
  },
  {
    category: "food",
    source: "Dijon mustard",
    mode: "clean",
    targetSound: "dijon",
    build: (atom) => `${atom.replacement} Mustard`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "dijon")} soundalike in a food phrase.`,
    variants: [
      {
        source: "Grey Poupon",
        build: (atom) => `${atom.replacement} Poupon`
      },
      {
        source: "Dijonnaise",
        build: (atom) => `${atom.replacement}naise`
      },
      {
        source: "Pass the mustard",
        build: (atom) => `Pass the ${atom.replacement}`
      }
    ]
  },
  {
    category: "candy",
    source: "Reese's Pieces",
    mode: "clean",
    targetSound: "reese",
    build: (atom) => `${possessiveAtom(atom)} Pieces`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "reese")} soundalike in a candy reference.`,
    variants: [
      {
        source: "Reese's Peanut Butter Cups",
        build: (atom) => `${possessiveAtom(atom)} Cups`
      },
      {
        source: "Reese's Puffs",
        build: (atom) => `${possessiveAtom(atom)} Puffs`
      },
      {
        source: "Reese's Take 5",
        build: (atom) => `${possessiveAtom(atom)} Take Five`
      }
    ]
  },
  {
    category: "movie",
    source: "Grease Lightning",
    mode: "clean",
    targetSound: "grease",
    build: (atom) => `${atom.replacement} Lightning`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "grease")} soundalike in a movie-song title.`,
    variants: [
      {
        source: "Grease is the word",
        build: (atom) => `${atom.replacement} Is the Word`
      },
      {
        source: "Grease Live",
        build: (atom) => `${atom.replacement} Live`
      }
    ]
  },
  {
    category: "song",
    source: "Summer Breeze",
    mode: "clean",
    targetSound: "breeze",
    build: (atom) => `Summer ${atom.replacement}`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "breeze")} soundalike in a song title.`,
    variants: [
      {
        source: "Catch a breeze",
        build: (atom) => `Catch a ${atom.replacement}`
      },
      {
        source: "Breeze through",
        build: (atom) => `${atom.replacement} Through the Playoffs`
      }
    ]
  },
  {
    category: "brand",
    source: "Easy breezy",
    mode: "clean",
    targetSound: "breezy",
    build: (atom) => `Easy ${atom.replacement}y`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "breezy")} soundalike in a familiar slogan.`
  },
  {
    category: "phrase",
    source: "Beast mode",
    mode: "clean",
    targetSound: "beast",
    build: (atom) => `${atom.replacement} Mode`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "beast")} soundalike in a sports phrase.`,
    variants: [
      {
        source: "Beauty and the Beast",
        build: (atom) => `Beauty and the ${atom.replacement}`
      }
    ]
  },
  {
    category: "slogan",
    source: "CDC Guidelines",
    mode: "clean",
    targetSound: "cdc",
    build: (atom) => `${atom.replacement} Guidelines`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "cdc")} soundalike in an acronym phrase.`
  },
  {
    category: "technology",
    source: "CD-ROM",
    mode: "clean",
    targetSound: "cd",
    build: (atom) => `${atom.replacement}-ROM`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "cd")} soundalike in a technology phrase.`,
    variants: [
      {
        source: "CD player",
        build: (atom) => `${atom.replacement} Player`
      },
      {
        source: "Compact disc",
        build: (atom) => `Compact ${atom.replacement}`
      },
      {
        source: "Burn a CD",
        build: (atom) => `Burning ${atom.replacement}s`
      }
    ]
  },
  {
    category: "song",
    source: "Man in the Mirror",
    mode: "clean",
    targetSound: "mirror",
    build: (atom) => `The Man in the ${atom.replacement}ror`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as the opening sound in a mirror-themed song title.`,
    variants: [
      {
        source: "Mirror mirror",
        build: (atom) => `${atom.replacement}, ${atom.replacement} on the Wall`
      },
      {
        source: "Black Mirror",
        build: (atom) => `Black ${atom.replacement}ror`
      }
    ]
  },
  {
    category: "song",
    source: "We Built This City",
    mode: "clean",
    targetSound: "city",
    build: (atom) => `We Built This ${atom.replacement}`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName}'s player association as a ${targetSoundLabel(atom, "city")} soundalike in a song title.`,
    variants: [
      {
        source: "Paradise City",
        build: (atom) => `Paradise ${atom.replacement}`
      },
      {
        source: "City limits",
        build: (atom) => `${atom.replacement} Limits`
      },
      {
        source: "Sin City",
        build: (atom) => `Win ${atom.replacement}`
      },
      {
        source: "Electric City",
        build: (atom) => `Electric ${atom.replacement}`
      }
    ]
  },
  {
    category: "phrase",
    source: "For crying out loud",
    mode: "clean",
    targetSound: "crying",
    build: (atom) => `For ${atom.replacement} Out Loud`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "crying")} soundalike in a familiar phrase.`,
    variants: [
      {
        source: "No crying in baseball",
        build: (atom) => `No ${atom.replacement} in Football`
      },
      {
        source: "Crying game",
        build: (atom) => `The ${atom.replacement} Game`
      },
      {
        source: "Crying shame",
        build: (atom) => `${atom.replacement} Shame`
      },
      {
        source: "Crying over spilled milk",
        build: (atom) => `${atom.replacement} Over Spilled Points`
      },
      {
        source: "Crying Jordan",
        build: (atom) => `${atom.replacement} Jordan`
      },
      {
        source: "Crying lightning",
        build: (atom) => `${atom.replacement} Lightning`
      },
      {
        source: "Cry me a river",
        build: (atom) => `${atom.replacement} Me a River`
      }
    ]
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
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct TV-reference phrase.`,
    variants: [
      {
        source: "What's cooking",
        build: (atom) => `What's ${atom.replacement}ing?`
      },
      {
        source: "Cookout",
        build: (atom) => `${atom.replacement}out Kings`
      },
      {
        source: "Cooking with gas",
        build: (atom) => `${atom.replacement}ing with Gas`
      },
      {
        source: "Let him cook",
        build: (atom, player) => `Let ${player.firstName} ${atom.replacement}`
      },
      {
        source: "Cookbook",
        build: (atom) => `${atom.replacement}book`
      },
      {
        source: "Captain Cook",
        build: (atom) => `Captain ${atom.replacement}`
      },
      {
        source: "Cook the books",
        build: (atom) => `${atom.replacement} the Books`
      }
    ]
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
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct achievement phrase.`,
    variants: [
      {
        source: "Hall of Fame",
        build: (atom, player) => `${player.firstName} ${atom.replacement} of Fame`
      },
      {
        source: "Hall pass",
        build: (atom) => `${atom.replacement} Pass`
      },
      {
        source: "Hall pass",
        build: (atom, player) => `${player.firstName} ${atom.replacement} Pass`
      },
      {
        source: "Hall monitor",
        build: (atom) => `${atom.replacement} Monitor`
      },
      {
        source: "Hall monitor",
        build: (atom, player) => `${player.firstName} ${atom.replacement} Monitor`
      },
      {
        source: "Hall of Justice",
        build: (atom) => `${atom.replacement} of Justice`
      },
      {
        source: "Halls of Valhalla",
        build: (atom, player) => `${player.firstName} ${pluralizeAtom(atom)} of Valhalla`
      }
    ]
  },
  {
    category: "slogan",
    source: "All or nothing",
    mode: "clean",
    targetSound: "all",
    build: (atom) => `${atom.replacement} or Nothing`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as an ${targetSoundLabel(atom, "all")} soundalike in a familiar phrase.`,
    variants: [
      {
        source: "Against all odds",
        build: (atom) => `Against ${atom.replacement} Odds`
      },
      {
        source: "Above all else",
        build: (atom) => `Above ${atom.replacement} Else`
      },
      {
        source: "All the small things",
        build: (atom) => `${atom.replacement} the Small Things`
      }
    ]
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
  },
  {
    category: "song",
    source: "Insane in the Membrane",
    mode: "clean",
    targetSound: "insane",
    build: (atom) => `${atom.replacement} in the Membrane`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as an ${targetSoundLabel(atom, "insane")} soundalike in a song hook.`,
    variants: [
      {
        source: "Insane in the brain",
        build: (atom) => `${atom.replacement} in the Brain`
      }
    ]
  },
  {
    category: "movie",
    source: "Crazy Rich Asians",
    mode: "clean",
    targetSound: "asians",
    build: (atom) => `Crazy Rich ${pluralizeAtom(atom)}`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as an ${targetSoundLabel(atom, "asians")} soundalike in a movie title.`
  },
  {
    category: "science",
    source: "Chain reaction",
    mode: "clean",
    targetSound: "chain",
    build: (atom) => `${atom.replacement} Reaction`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "chain")} soundalike in a familiar phrase.`,
    variants: [
      {
        source: "Chain of fools",
        build: (atom) => `${atom.replacement} of Fools`
      },
      {
        source: "Off the chain",
        build: (atom) => `Off the ${atom.replacement}`
      },
      {
        source: "Supply chain",
        build: (atom) => `Supply ${atom.replacement}`
      }
    ]
  },
  {
    category: "movie",
    source: "Django Unchained",
    mode: "clean",
    targetSound: "chained",
    build: (atom) => `Django ${atom.replacement}d`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "chained")} soundalike in a movie title.`
  },
  {
    category: "music",
    source: "Alice in Chains",
    mode: "clean",
    targetSound: "chains",
    build: (atom) => `Alice in ${pluralizeAtom(atom)}`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "chains")} soundalike in a band-name reference.`
  },
  {
    category: "song",
    source: "Rage Against the Machine",
    mode: "clean",
    targetSound: "machine",
    build: (atom) => `Rage Against the ${atom.replacement}`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "machine")} soundalike in a band-name reference.`,
    variants: [
      {
        source: "Florence and the Machine",
        build: (atom) => `Florence and the ${atom.replacement}`
      }
    ]
  },
  {
    category: "phrase",
    source: "The train has left the station",
    mode: "clean",
    targetSound: "train",
    build: (atom) => `${atom.replacement} Has Left the Station`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "train")} soundalike in a familiar phrase.`
  },
  {
    category: "phrase",
    source: "Divine intervention",
    mode: "clean",
    targetSound: "divine",
    build: (atom) => `${atom.replacement} Intervention`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "divine")} soundalike in a familiar phrase.`
  },
  {
    category: "song",
    source: "Here Comes the Sun",
    mode: "clean",
    targetSound: "sun",
    build: (atom) => `Here Comes the ${atom.replacement}`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct sun-themed song title.`,
    variants: [
      {
        source: "Sunshine of Your Love",
        build: (atom) => `${atom.replacement}shine of Your Love`
      },
      {
        source: "House of the Rising Sun",
        build: (atom) => `House of the Rising ${atom.replacement}`
      },
      {
        source: "Walking on Sunshine",
        build: (atom) => `Walking on ${atom.replacement}shine`
      },
      {
        source: "Black Hole Sun",
        build: (atom) => `Black Hole ${atom.replacement}`
      }
    ]
  },
  {
    category: "phrase",
    source: "God mode",
    mode: "clean",
    targetSound: "god",
    build: (atom) => `${atom.replacement} Mode`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a familiar gaming phrase.`,
    variants: [
      {
        source: "God of Thunder",
        build: (atom) => `${atom.replacement} of Thunder`
      },
      {
        source: "God only knows",
        build: (atom) => `${atom.replacement} Only Knows`
      }
    ]
  },
  {
    category: "tv",
    source: "King of the Hill",
    mode: "clean",
    targetSound: "hill",
    build: (atom) => `King of the ${atom.replacement}`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct TV-title reference.`,
    variants: [
      {
        source: "The Hills Have Eyes",
        build: (atom) => `The ${pluralizeAtom(atom)} Have Eyes`
      },
      {
        source: "Hill Street Blues",
        build: (atom) => `${atom.replacement} Street Blues`
      },
      {
        source: "Over the hill",
        build: (atom) => `Over the ${atom.replacement}`
      },
      {
        source: "Ain't No Mountain High Enough",
        build: (atom) => `Ain't No ${atom.replacement} High Enough`
      },
      {
        source: "Run for the hills",
        build: (atom) => `Run for the ${pluralizeAtom(atom)}`
      },
      {
        source: "Hill yeah",
        build: (atom) => `${atom.replacement} Yeah`
      }
    ]
  },
  {
    category: "song",
    source: "Bark at the Moon",
    mode: "clean",
    targetSound: "bark",
    build: (atom) => `${atom.replacement} at the Moon`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "bark")} soundalike in a song title.`,
    variants: [
      {
        source: "No bark all bite",
        build: (atom) => `No ${atom.replacement}, All Bite`
      },
      {
        source: "The dark side",
        build: (atom) => `The ${atom.replacement} Side`
      },
      {
        source: "Bark up the wrong tree",
        build: (atom) => `${atom.replacement} Up the Wrong Tree`
      },
      {
        source: "Bark twice",
        build: (atom) => `${atom.replacement} Twice`
      }
    ]
  },
  {
    category: "song",
    source: "So Gone",
    mode: "clean",
    targetSound: "so gone",
    build: (atom) => `${atom.replacement} Gone`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "so gone")} soundalike in a song-title phrase.`,
    variants: [
      {
        source: "Gone with the Wind",
        build: (atom) => `${atom.replacement} with the Wind`
      },
      {
        source: "Gone in 60 Seconds",
        build: (atom) => `${atom.replacement} in 60 Seconds`
      }
    ]
  },
  {
    category: "tv",
    source: "Won't You Be My Neighbor",
    mode: "clean",
    targetSound: "neighbors",
    build: (atom) => `Won't You Be My ${atom.replacement}?`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "neighbors")} soundalike in a TV phrase.`,
    variants: [
      {
        source: "Good Neighbors",
        build: (atom) => `Good ${atom.replacement}`
      },
      {
        source: "Neighbors",
        build: (atom) => `${atom.replacement} from Hell`
      },
      {
        source: "The Neighborhood",
        build: (atom) => `Welcome to the ${atom.replacement}hood`
      },
      {
        source: "Hello Neighbor",
        build: (atom) => `Hello ${atom.replacement}`
      },
      {
        source: "Love thy neighbor",
        build: (atom) => `Love Thy ${atom.replacement}`
      },
      {
        source: "Mister Rogers' Neighborhood",
        build: (atom) => `Mister ${atom.replacement}hood`
      },
      {
        source: "Beautiful day in the neighborhood",
        build: (atom) => `Beautiful Day in the ${atom.replacement}hood`
      }
    ]
  },
  {
    category: "phrase",
    source: "Puka shell",
    mode: "clean",
    targetSound: "puka",
    build: (atom) => `${atom.replacement} Shells`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct phrase.`,
    variants: [
      {
        source: "Shell game",
        build: (atom) => `${atom.replacement} Shell Game`
      },
      {
        source: "Shell shock",
        build: (atom) => `${atom.replacement} Shell Shock`
      },
      {
        source: "Puka shell necklace",
        build: (atom) => `${atom.replacement} Shell Necklace`
      }
    ]
  },
  {
    category: "movie",
    source: "Hakuna Matata",
    mode: "clean",
    targetSound: "hakuna",
    build: (atom) => `${atom.replacement} Matata`,
    explain: (player, atom) =>
      `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(atom, "hakuna")} soundalike in a movie-song title.`,
    variants: [
      {
        source: "Hakuna Matata",
        build: (atom, player) => `${player.firstName} ${atom.replacement} Matata`
      },
      {
        source: "No worries",
        build: (atom) => `${atom.replacement} No Worries`
      },
      {
        source: "Hakuna Matata",
        build: (atom) => `${atom.replacement} Means No Worries`
      }
    ]
  },
  {
    category: "slogan",
    source: "Long live the king",
    mode: "clean",
    targetSound: "king",
    build: (atom) => `Long Live ${atom.replacement}`,
    explain: (player, atom) => `Uses ${atom.replacement} from ${player.fullName} in a direct royal slogan.`,
    variants: [
      {
        source: "Return of the King",
        build: (atom) => `Return of ${atom.replacement}`
      }
    ]
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
    appliesTo: (player) => hasTrait(player, "route"),
    explain: (player) => `Uses ${player.fullName} in a route-running reference that fits receivers and tight ends.`
  },
  {
    category: "football",
    source: "End zone",
    mode: "clean",
    build: (player) => `${player.firstName} Zone`,
    appliesTo: (player) => hasTrait(player, "end-zone"),
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
    appliesTo: (player) => hasTrait(player, "waiver"),
    explain: (player) => `Uses ${player.fullName} in a waiver-wire phrase because the player is explicitly marked as a waiver theme fit.`
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
    ...players.flatMap((player) => phraseCorpusTemplatesForPlayer(player, mode)),
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
    ...customKeywordProfiles.flatMap((profile) => referenceTemplatesForCustomKeyword(profile, mode))
  ];

  return rankGeneratedNames(dedupe(names).filter((name) => isAllowedForMode(name, mode))).slice(0, MAX_GENERATED_NAMES);
}

function templatesForPlayer(player: Player, mode: ContentMode): GeneratedName[] {
  return (playerTemplates[player.id] ?? [])
    .filter((template) => mode === "explicit" || template.mode === "clean")
    .map((template) => ({
      name: template.name,
      source: player.fullName,
      mode: template.mode,
      reason: template.reason,
      ...curatedTemplateMetadata(player, template)
    }));
}

function phraseCorpusTemplatesForPlayer(player: Player, mode: ContentMode): GeneratedName[] {
  const atoms = getPlayerPunAtoms(player);
  const namesByTarget = new Map<string, GeneratedName[]>();

  for (const entry of phraseCorpus) {
    if (mode !== "explicit" && entry.mode === "explicit") {
      continue;
    }

    for (const target of entry.targets) {
      for (const atom of atoms) {
        const match = matchPlayerAtomToTarget(atom, target.targetSound);

        if (!match) {
          continue;
        }

        const generatedName = generatedPhraseCorpusName(player, atom, entry, target, match);
        const targetKey = `${normalizeKeyword(player.id)}:${normalizeKeyword(target.targetSound)}`;
        namesByTarget.set(targetKey, [...(namesByTarget.get(targetKey) ?? []), generatedName]);
      }
    }
  }

  return [...namesByTarget.values()].flatMap((names) =>
    names.sort((first, second) => (second.score ?? 0) - (first.score ?? 0)).slice(0, MAX_NAMES_PER_REPLACED_WORD)
  );
}

function generatedIdeaTemplatesForPlayer(player: Player, mode: ContentMode): GeneratedName[] {
  if (mode !== "clean" && mode !== "explicit") {
    return [];
  }

  const ideas: GeneratedName[] = [...cleverPhraseFrameIdeasForPlayer(player)];
  const initials = playerInitials(player);
  const lastInitial = normalizeKeyword(player.lastName).charAt(0);
  const alliterativeWords = alliterativeIdeaWords[lastInitial] ?? ["Dynasty", "Express", "Takeover", "Society"];
  const positionWords = positionIdeaWords[player.position];
  const primaryAlias = player.aliases?.[0];

  for (const word of alliterativeWords.slice(0, 2)) {
    ideas.push(generatedIdea(player, `${player.lastName} ${word}`, "alliterative last-name generator"));
  }

  for (const word of positionWords.slice(0, 2)) {
    ideas.push(generatedIdea(player, `${player.lastName} ${word}`, `${player.position} role generator`));
  }

  ideas.push(
    generatedIdea(player, `${initials} Takeover`, "initials generator"),
    generatedIdea(player, `${initials} After Dark`, "initials generator")
  );

  if (primaryAlias) {
    ideas.push(
      generatedIdea(player, `${primaryAlias} Mode`, "alias generator")
    );
  }

  return ideas;
}

const supplementalPhraseFrames: PhraseFrame[] = [
  {
    source: "First things first",
    mode: "clean",
    targetSound: "first",
    build: (atom) => `${atom.replacement} Things First`
  },
  {
    source: "James and the Giant Peach",
    mode: "clean",
    targetSound: "james",
    build: (atom) => `${atom.replacement} and the Giant Peach`
  },
  {
    source: "Grey's Anatomy",
    mode: "clean",
    targetSound: "grey",
    build: (atom) => `${atom.replacement}'s Anatomy`
  },
  {
    source: "Baby Got Back",
    mode: "clean",
    targetSound: "baby",
    build: (atom) => `${atom.replacement} Got Back`
  },
  {
    source: "Love Actually",
    mode: "clean",
    targetSound: "love",
    build: (atom) => `${atom.replacement} Actually`
  },
  {
    source: "The Bourne Identity",
    mode: "clean",
    targetSound: "born",
    build: (atom) => `The ${atom.replacement} Identity`
  },
  {
    source: "The Bourne Supremacy",
    mode: "clean",
    targetSound: "born",
    build: (atom) => `The ${atom.replacement} Supremacy`
  },
  {
    source: "Field of Dreams",
    mode: "clean",
    targetSound: "field",
    build: (atom) => `${atom.replacement} of Dreams`
  },
  {
    source: "House of Cards",
    mode: "clean",
    targetSound: "cards",
    build: (atom) => `House of ${atom.replacement}`
  },
  {
    source: "Saving Private Ryan",
    mode: "clean",
    targetSound: "ryan",
    build: (atom) => `Saving Private ${atom.replacement}`
  },
  {
    source: "Law & Order",
    mode: "clean",
    targetSound: "law",
    build: (atom) => `${atom.replacement} & Order`
  },
  {
    source: "Toy Story",
    mode: "clean",
    targetSound: "toy",
    build: (atom) => `${atom.replacement} Story`
  },
  {
    source: "The Dark Knight",
    mode: "clean",
    targetSound: "dark",
    build: (atom) => `The ${atom.replacement} Knight`
  },
  {
    source: "Die Hard",
    mode: "clean",
    targetSound: "die",
    build: (atom) => `${atom.replacement} Hard`
  },
  {
    source: "Bruce Almighty",
    mode: "clean",
    targetSound: "bruce",
    build: (atom) => `${atom.replacement} Almighty`
  },
  {
    source: "Star Wars",
    mode: "clean",
    targetSound: "star",
    build: (atom) => `${atom.replacement} Wars`
  },
  {
    source: "Star Trek",
    mode: "clean",
    targetSound: "star",
    build: (atom) => `${atom.replacement} Trek`
  },
  {
    source: "Blade Runner",
    mode: "clean",
    targetSound: "blade",
    build: (atom) => `${atom.replacement} Runner`
  },
  {
    source: "Jimi Hendrix Experience",
    mode: "clean",
    targetSound: "hendrix",
    build: (atom, player) => `${player.fullName} Experience`
  }
];

function cleverPhraseFrameIdeasForPlayer(player: Player): GeneratedName[] {
  const atoms = getPlayerPunAtoms(player);

  return supplementalPhraseFrames
    .filter((frame) => frame.mode === "clean")
    .flatMap((frame) =>
      atoms
        .filter((atom) => atomMatchesTargetSound(atom, frame.targetSound))
        .map((atom) => generatedPhraseFrameIdea(player, atom, frame))
    );
}

function generatedIdea(player: Player, name: string, reason: string): GeneratedName {
  return {
    name,
    source: player.fullName,
    mode: "clean",
    reason: `Generated from ${player.fullName}'s name using the ${reason}.`
  };
}

function generatedPhraseFrameIdea(player: Player, atom: PlayerPunAtom, frame: PhraseFrame): GeneratedName {
  return {
    name: frame.build(atom, player),
    source: player.fullName,
    mode: frame.mode,
    reason: `Uses ${atom.replacement} from ${player.fullName} as a ${targetSoundLabel(
      atom,
      frame.targetSound
    )} soundalike in "${frame.source}".`,
    referencePhrase: frame.source,
    replacedWord: frame.targetSound,
    playerAtom: atom.replacement,
    matchKind: "soundalike",
    score: 82,
    sourceType: "curated-reference",
    isValidatedPun: true
  };
}

function generatedPhraseCorpusName(
  player: Player,
  atom: PlayerPunAtom,
  entry: PhraseCorpusEntry,
  target: PhraseCorpusTarget,
  match: PunMatch
): GeneratedName {
  const score = Math.min(100, match.score + Math.round(entry.popularityScore / 10));

  return {
    name: renderPhraseTemplate(target.template, player, atom),
    source: player.fullName,
    mode: entry.mode,
    reason: `Uses ${atom.replacement} from ${player.fullName} as a ${match.matchedSound} ${match.matchKind} match for "${target.replacedWord}" in "${entry.text}".`,
    referencePhrase: entry.text,
    replacedWord: target.replacedWord,
    playerAtom: atom.replacement,
    matchKind: match.matchKind,
    score,
    sourceType: "phrase-corpus",
    isValidatedPun: true
  };
}

function renderPhraseTemplate(template: string, player: Player, atom: PlayerPunAtom): string {
  return template
    .split("{atomPossessive}")
    .join(possessiveAtom(atom))
    .split("{atomPlural}")
    .join(pluralizeAtom(atom))
    .split("{atom}")
    .join(atom.replacement)
    .split("{playerFirst}")
    .join(player.firstName)
    .split("{playerLast}")
    .join(player.lastName)
    .split("{playerFull}")
    .join(player.fullName);
}

function curatedTemplateMetadata(player: Player, template: Template): Pick<
  GeneratedName,
  "referencePhrase" | "replacedWord" | "playerAtom" | "matchKind" | "score" | "sourceType" | "isValidatedPun"
> {
  return {
    referencePhrase: template.tags.join(", "),
    replacedWord: "curated pun hook",
    playerAtom: player.fullName,
    matchKind: "curated",
    score: template.mode === "explicit" ? 74 : 78,
    sourceType: "curated-template",
    isValidatedPun: true
  };
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
      keyword,
      sourceType: "keyword"
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
      keyword: keywordProfile.label,
      sourceType: "keyword"
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
      keyword: keywordProfile.label,
      sourceType: "custom-keyword"
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
      reason: `${template.reason} Sound hooks: ${summarizePunAtoms(getPlayerPunAtoms(player))}.`,
      ...curatedTemplateMetadata(player, template)
    }));
}

export function getPlayerPunAtoms(player: Player): PlayerPunAtom[] {
  const profile = playerPunProfiles[player.id];
  const initials = playerInitials(player);
  const baselineAtoms: PlayerPunAtom[] = [
    {
      part: "first",
      replacement: player.firstName,
      soundsLike: namePartSoundVariants(player.firstName),
      phraseHooks: [player.firstName]
    },
    {
      part: "last",
      replacement: player.lastName,
      soundsLike: namePartSoundVariants(player.lastName),
      phraseHooks: [player.lastName]
    },
    {
      part: "alias",
      replacement: initials,
      soundsLike: [initials],
      phraseHooks: [initials]
    },
    ...(player.aliases ?? []).map((alias): PlayerPunAtom => ({
      part: "alias",
      replacement: alias,
      soundsLike: namePartSoundVariants(alias),
      phraseHooks: [alias]
    }))
  ];

  return dedupePunAtoms([...baselineAtoms, ...(profile?.atoms ?? [])]);
}

function namePartSoundVariants(value: string): string[] {
  const normalizedValue = normalizeKeyword(value);
  const compactValue = normalizedValue.replace(/\s+/g, "");
  const parts = normalizedValue.split(" ").filter(Boolean);

  return [...new Set([value, normalizedValue, compactValue, ...parts].filter(Boolean))];
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
        .flatMap((atom) => referencePhraseVariantsForAtom(player, atom, phrase))
    );
}

function referencePhraseVariantsForAtom(
  player: Player,
  atom: PlayerPunAtom,
  phrase: ReferencePhrase
): GeneratedName[] {
  const baseReason = phrase.explain(player, atom);
  const match = matchPlayerAtomToTarget(atom, phrase.targetSound) ?? {
    matchKind: "curated" as const,
    score: 75,
    matchedSound: phrase.targetSound
  };
  const baseName: GeneratedName = {
    name: phrase.build(atom, player),
    source: player.fullName,
    mode: phrase.mode,
    reason: baseReason,
    referencePhrase: phrase.source,
    replacedWord: phrase.targetSound,
    playerAtom: atom.replacement,
    matchKind: match.matchKind,
    score: match.score,
    sourceType: "curated-reference",
    isValidatedPun: true
  };
  const variants = (phrase.variants ?? []).map((variant) => ({
    name: variant.build(atom, player),
    source: player.fullName,
    mode: phrase.mode,
    reason: variant.explain?.(player, atom) ?? `${baseReason} Variant source: ${variant.source}.`,
    referencePhrase: variant.source,
    replacedWord: phrase.targetSound,
    playerAtom: atom.replacement,
    matchKind: match.matchKind,
    score: Math.max(0, match.score - 3),
    sourceType: "curated-reference" as const,
    isValidatedPun: true
  }));

  return [baseName, ...variants];
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
      keyword: keywordProfile.label,
      sourceType: "custom-keyword"
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

function playerInitials(player: Player): string {
  return [player.firstName, player.lastName]
    .map((part) => part.replace(/[^a-zA-Z0-9]/g, "").charAt(0).toUpperCase())
    .join("");
}

function hasTrait(player: Player, trait: string): boolean {
  return playerTraits[player.id]?.includes(trait) ?? false;
}

function atomMatchesReferencePhrase(atom: PlayerPunAtom, phrase: ReferencePhrase): boolean {
  return atomMatchesTargetSound(atom, phrase.targetSound);
}

function atomMatchesTargetSound(atom: PlayerPunAtom, targetSound: string): boolean {
  return matchPlayerAtomToTarget(atom, targetSound) !== undefined;
}

export function matchPlayerAtomToTarget(atom: PlayerPunAtom, targetSound: string): PunMatch | undefined {
  const normalizedTarget = normalizeKeyword(targetSound);
  const normalizedReplacement = normalizeKeyword(atom.replacement);
  const normalizedSounds = atom.soundsLike.map((sound) => normalizeKeyword(sound)).filter(Boolean);
  const exactSound = normalizedSounds.find((sound) => sound === normalizedTarget);

  if (exactSound && normalizedReplacement === normalizedTarget) {
    return {
      matchKind: atom.part === "alias" ? "alias" : "exact",
      score: atom.part === "alias" ? 92 : 100,
      matchedSound: exactSound
    };
  }

  if (exactSound) {
    return {
      matchKind: atom.part === "alias" ? "alias" : "soundalike",
      score: atom.part === "alias" ? 90 : 88,
      matchedSound: exactSound
    };
  }

  const phoneticSound = normalizedSounds.find((sound) => isStrongPhoneticMatch(sound, normalizedTarget));

  if (phoneticSound) {
    return {
      matchKind: "phonetic",
      score: 72,
      matchedSound: phoneticSound
    };
  }

  const rhymeSound = normalizedSounds.find((sound) => isStrongRhymeMatch(sound, normalizedTarget));

  if (rhymeSound) {
    return {
      matchKind: "rhyme",
      score: 68,
      matchedSound: rhymeSound
    };
  }

  return undefined;
}

function targetSoundLabel(atom: PlayerPunAtom, targetSound: string): string {
  return atom.soundsLike.find((sound) => normalizeKeyword(sound) === normalizeKeyword(targetSound)) ?? targetSound;
}

function pluralizeAtom(atom: PlayerPunAtom): string {
  return atom.replacement.endsWith("s") ? atom.replacement : `${atom.replacement}s`;
}

function possessiveAtom(atom: PlayerPunAtom): string {
  return atom.replacement.endsWith("s") ? `${atom.replacement}'` : `${atom.replacement}'s`;
}

function isStrongPhoneticMatch(sound: string, target: string): boolean {
  if (sound.length < 4 || target.length < 4) {
    return false;
  }

  return soundex(sound) === soundex(target) && ending(sound, 2) === ending(target, 2);
}

function isStrongRhymeMatch(sound: string, target: string): boolean {
  if (sound.length < 5 || target.length < 5) {
    return false;
  }

  return ending(sound, 3) === ending(target, 3);
}

function ending(value: string, length: number): string {
  return value.replace(/\s+/g, "").slice(-length);
}

function soundex(value: string): string {
  const normalizedValue = normalizeKeyword(value).replace(/[^a-z]/g, "");

  if (!normalizedValue) {
    return "";
  }

  const [firstLetter, ...letters] = normalizedValue.toUpperCase().split("");
  const codes: Record<string, string> = {
    B: "1",
    F: "1",
    P: "1",
    V: "1",
    C: "2",
    G: "2",
    J: "2",
    K: "2",
    Q: "2",
    S: "2",
    X: "2",
    Z: "2",
    D: "3",
    T: "3",
    L: "4",
    M: "5",
    N: "5",
    R: "6"
  };
  let previousCode = codes[firstLetter] ?? "";
  const encoded = letters.flatMap((letter) => {
    const code = codes[letter] ?? "";

    if (!code) {
      previousCode = "";
      return [];
    }

    if (code === previousCode) {
      return [];
    }

    previousCode = code;
    return [code];
  });

  return `${firstLetter}${encoded.join("")}`.padEnd(4, "0").slice(0, 4);
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

function rankGeneratedNames(names: GeneratedName[]): GeneratedName[] {
  return [...names].sort((first, second) => {
    const firstValidated = first.isValidatedPun ? 1 : 0;
    const secondValidated = second.isValidatedPun ? 1 : 0;

    if (firstValidated !== secondValidated) {
      return secondValidated - firstValidated;
    }

    const scoreDelta = (second.score ?? 0) - (first.score ?? 0);

    if (scoreDelta !== 0) {
      return scoreDelta;
    }

    return first.name.localeCompare(second.name);
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
