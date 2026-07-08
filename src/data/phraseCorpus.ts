import type { ContentMode } from "../lib/generator";

export type PhraseCategory =
  | "anime"
  | "brand"
  | "book"
  | "candy"
  | "celebrity"
  | "food"
  | "game"
  | "movie"
  | "music"
  | "phrase"
  | "science"
  | "slogan"
  | "song"
  | "sports"
  | "technology"
  | "tv";

export type PhraseCorpusTarget = {
  replacedWord: string;
  targetSound: string;
  template: string;
};

export type PhraseCorpusEntry = {
  id: string;
  text: string;
  category: PhraseCategory;
  source: string;
  popularityScore: number;
  mode: ContentMode;
  targets: PhraseCorpusTarget[];
};

export const phraseCorpus: PhraseCorpusEntry[] = [
  {
    id: "kelsey-grammer",
    text: "Kelsey Grammer",
    category: "celebrity",
    source: "curated seed",
    popularityScore: 88,
    mode: "clean",
    targets: [{ replacedWord: "Kelsey", targetSound: "kelsey", template: "{atom} Grammar" }]
  },
  {
    id: "chelsea-dagger",
    text: "Chelsea Dagger",
    category: "song",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "Chelsea", targetSound: "chelsea", template: "{atom} Dagger" }]
  },
  {
    id: "chelsea-morning",
    text: "Chelsea Morning",
    category: "song",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "Chelsea", targetSound: "chelsea", template: "{atom} Morning" }]
  },
  {
    id: "chelsea-hotel",
    text: "Chelsea Hotel",
    category: "song",
    source: "curated seed",
    popularityScore: 72,
    mode: "clean",
    targets: [{ replacedWord: "Chelsea", targetSound: "chelsea", template: "{atom} Hotel" }]
  },
  {
    id: "nothing-else-matters",
    text: "Nothing Else Matters",
    category: "song",
    source: "curated seed",
    popularityScore: 92,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "Nothing {atom} Matters" }]
  },
  {
    id: "something-else",
    text: "Something Else",
    category: "phrase",
    source: "curated seed",
    popularityScore: 79,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "Something {atom}" }]
  },
  {
    id: "someone-else",
    text: "Someone Else",
    category: "phrase",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "Someone {atom}" }]
  },
  {
    id: "no-one-else",
    text: "No One Else",
    category: "song",
    source: "curated seed",
    popularityScore: 80,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "No One {atom}" }]
  },
  {
    id: "nobody-else",
    text: "Nobody Else",
    category: "phrase",
    source: "curated seed",
    popularityScore: 74,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "Nobody {atom}" }]
  },
  {
    id: "anything-else",
    text: "Anything Else",
    category: "phrase",
    source: "curated seed",
    popularityScore: 73,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "Anything {atom}" }]
  },
  {
    id: "or-else",
    text: "Or Else",
    category: "phrase",
    source: "curated seed",
    popularityScore: 72,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "Or {atom}" }]
  },
  {
    id: "everyone-else",
    text: "Everyone Else",
    category: "phrase",
    source: "curated seed",
    popularityScore: 74,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "Everyone {atom}" }]
  },
  {
    id: "everybody-else",
    text: "Everybody Else",
    category: "phrase",
    source: "curated seed",
    popularityScore: 70,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "Everybody {atom}" }]
  },
  {
    id: "above-all-else",
    text: "Above All Else",
    category: "phrase",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "Above All {atom}" }]
  },
  {
    id: "when-all-else-fails",
    text: "When All Else Fails",
    category: "phrase",
    source: "curated seed",
    popularityScore: 80,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "When All {atom} Fails" }]
  },
  {
    id: "all-else-equal",
    text: "All Else Equal",
    category: "phrase",
    source: "curated seed",
    popularityScore: 70,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "All {atom} Equal" }]
  },
  {
    id: "everything-else",
    text: "Everything Else",
    category: "phrase",
    source: "curated seed",
    popularityScore: 72,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "Everything {atom}" }]
  },
  {
    id: "elseworlds",
    text: "Elseworlds",
    category: "book",
    source: "curated seed",
    popularityScore: 68,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "{atom}worlds" }]
  },
  {
    id: "reese-pieces",
    text: "Reese's Pieces",
    category: "candy",
    source: "curated seed",
    popularityScore: 95,
    mode: "clean",
    targets: [{ replacedWord: "Reese's", targetSound: "reese", template: "{atomPossessive} Pieces" }]
  },
  {
    id: "reese-cups",
    text: "Reese's Peanut Butter Cups",
    category: "candy",
    source: "curated seed",
    popularityScore: 94,
    mode: "clean",
    targets: [{ replacedWord: "Reese's", targetSound: "reese", template: "{atomPossessive} Cups" }]
  },
  {
    id: "reese-puffs",
    text: "Reese's Puffs",
    category: "candy",
    source: "curated seed",
    popularityScore: 84,
    mode: "clean",
    targets: [{ replacedWord: "Reese's", targetSound: "reese", template: "{atomPossessive} Puffs" }]
  },
  {
    id: "grease-lightning",
    text: "Grease Lightning",
    category: "movie",
    source: "curated seed",
    popularityScore: 92,
    mode: "clean",
    targets: [{ replacedWord: "Grease", targetSound: "grease", template: "{atom} Lightning" }]
  },
  {
    id: "grease-is-the-word",
    text: "Grease Is the Word",
    category: "song",
    source: "curated seed",
    popularityScore: 85,
    mode: "clean",
    targets: [{ replacedWord: "Grease", targetSound: "grease", template: "{atom} Is the Word" }]
  },
  {
    id: "summer-breeze",
    text: "Summer Breeze",
    category: "song",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "Breeze", targetSound: "breeze", template: "Summer {atom}" }]
  },
  {
    id: "easy-breezy",
    text: "Easy Breezy",
    category: "slogan",
    source: "curated seed",
    popularityScore: 80,
    mode: "clean",
    targets: [{ replacedWord: "Breezy", targetSound: "breezy", template: "Easy {atom}y" }]
  },
  {
    id: "beast-mode",
    text: "Beast Mode",
    category: "sports",
    source: "curated seed",
    popularityScore: 88,
    mode: "clean",
    targets: [{ replacedWord: "Beast", targetSound: "beast", template: "{atom} Mode" }]
  },
  {
    id: "hall-of-fame",
    text: "Hall of Fame",
    category: "slogan",
    source: "curated seed",
    popularityScore: 92,
    mode: "clean",
    targets: [{ replacedWord: "Hall", targetSound: "hall", template: "{atom} of Fame" }]
  },
  {
    id: "hall-pass",
    text: "Hall Pass",
    category: "phrase",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "Hall", targetSound: "hall", template: "{atom} Pass" }]
  },
  {
    id: "hall-monitor",
    text: "Hall Monitor",
    category: "phrase",
    source: "curated seed",
    popularityScore: 80,
    mode: "clean",
    targets: [{ replacedWord: "Hall", targetSound: "hall", template: "{atom} Monitor" }]
  },
  {
    id: "all-or-nothing",
    text: "All or Nothing",
    category: "slogan",
    source: "curated seed",
    popularityScore: 86,
    mode: "clean",
    targets: [{ replacedWord: "All", targetSound: "all", template: "{atom} or Nothing" }]
  },
  {
    id: "against-all-odds",
    text: "Against All Odds",
    category: "song",
    source: "curated seed",
    popularityScore: 88,
    mode: "clean",
    targets: [{ replacedWord: "All", targetSound: "all", template: "Against {atom} Odds" }]
  },
  {
    id: "all-the-small-things",
    text: "All the Small Things",
    category: "song",
    source: "curated seed",
    popularityScore: 90,
    mode: "clean",
    targets: [{ replacedWord: "All", targetSound: "all", template: "{atom} the Small Things" }]
  },
  {
    id: "insane-in-the-membrane",
    text: "Insane in the Membrane",
    category: "song",
    source: "curated seed",
    popularityScore: 92,
    mode: "clean",
    targets: [{ replacedWord: "Insane", targetSound: "insane", template: "{atom} in the Membrane" }]
  },
  {
    id: "crazy-rich-asians",
    text: "Crazy Rich Asians",
    category: "movie",
    source: "curated seed",
    popularityScore: 90,
    mode: "clean",
    targets: [{ replacedWord: "Asians", targetSound: "asians", template: "Crazy Rich {atomPlural}" }]
  },
  {
    id: "chain-reaction",
    text: "Chain Reaction",
    category: "science",
    source: "curated seed",
    popularityScore: 84,
    mode: "clean",
    targets: [{ replacedWord: "Chain", targetSound: "chain", template: "{atom} Reaction" }]
  },
  {
    id: "django-unchained",
    text: "Django Unchained",
    category: "movie",
    source: "curated seed",
    popularityScore: 90,
    mode: "clean",
    targets: [{ replacedWord: "Chained", targetSound: "chained", template: "Django {atom}d" }]
  },
  {
    id: "alice-in-chains",
    text: "Alice in Chains",
    category: "music",
    source: "curated seed",
    popularityScore: 88,
    mode: "clean",
    targets: [{ replacedWord: "Chains", targetSound: "chains", template: "Alice in {atomPlural}" }]
  },
  {
    id: "rage-against-the-machine",
    text: "Rage Against the Machine",
    category: "music",
    source: "curated seed",
    popularityScore: 90,
    mode: "clean",
    targets: [{ replacedWord: "Machine", targetSound: "machine", template: "Rage Against the {atom}" }]
  },
  {
    id: "train-left-the-station",
    text: "The Train Has Left the Station",
    category: "phrase",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "Train", targetSound: "train", template: "{atom} Has Left the Station" }]
  },
  {
    id: "divine-intervention",
    text: "Divine Intervention",
    category: "phrase",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "Divine", targetSound: "divine", template: "{atom} Intervention" }]
  },
  {
    id: "one-direction",
    text: "One Direction",
    category: "music",
    source: "curated seed",
    popularityScore: 92,
    mode: "clean",
    targets: [{ replacedWord: "Direction", targetSound: "direction", template: "One {atom}tion" }]
  },
  {
    id: "go-directly-to-jail",
    text: "Go Directly to Jail",
    category: "game",
    source: "curated seed",
    popularityScore: 86,
    mode: "clean",
    targets: [{ replacedWord: "Directly", targetSound: "directly", template: "Go {atom}ly to Jail" }]
  },
  {
    id: "anything-for-love",
    text: "I Would Do Anything for Love",
    category: "song",
    source: "curated seed",
    popularityScore: 88,
    mode: "clean",
    targets: [{ replacedWord: "Anything", targetSound: "anything", template: "I Would Do {atom}thing for Love" }]
  },
  {
    id: "fox-in-the-henhouse",
    text: "Fox in the Henhouse",
    category: "phrase",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "Henhouse", targetSound: "henhouse", template: "Fox in the {atom}house" }]
  },
  {
    id: "henry-danger",
    text: "Henry Danger",
    category: "tv",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "Henry", targetSound: "henry", template: "{atom} Danger" }]
  },
  {
    id: "king-henry-court",
    text: "King Henry's Court",
    category: "phrase",
    source: "curated seed",
    popularityScore: 75,
    mode: "clean",
    targets: [{ replacedWord: "Henry's", targetSound: "henry", template: "{atomPossessive} Court" }]
  },
  {
    id: "donkey-kong-country",
    text: "Donkey Kong Country",
    category: "game",
    source: "curated seed",
    popularityScore: 92,
    mode: "clean",
    targets: [{ replacedWord: "Donkey", targetSound: "donkey", template: "{atom} Kong Country" }]
  },
  {
    id: "donkey-kong",
    text: "Donkey Kong",
    category: "game",
    source: "curated seed",
    popularityScore: 94,
    mode: "clean",
    targets: [{ replacedWord: "Donkey", targetSound: "donkey", template: "{atom} Kong" }]
  },
  {
    id: "pin-tail-donkey",
    text: "Pin the Tail on the Donkey",
    category: "game",
    source: "curated seed",
    popularityScore: 84,
    mode: "clean",
    targets: [{ replacedWord: "Donkey", targetSound: "donkey", template: "Pin the Tail on the {atom}" }]
  },
  {
    id: "honky-tonk-blues",
    text: "Honky Tonk Blues",
    category: "song",
    source: "curated seed",
    popularityScore: 80,
    mode: "clean",
    targets: [{ replacedWord: "Honky", targetSound: "honky", template: "{atom} Tonk Blues" }]
  },
  {
    id: "gladiator",
    text: "Gladiator",
    category: "movie",
    source: "curated seed",
    popularityScore: 92,
    mode: "clean",
    targets: [{ replacedWord: "Gladiator", targetSound: "gladiator", template: "{atom}iator" }]
  },
  {
    id: "monkey-business",
    text: "Monkey Business",
    category: "phrase",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "Monkey", targetSound: "monkey", template: "{atom} Business" }]
  },
  {
    id: "baby-back-ribs",
    text: "Baby Back Ribs",
    category: "food",
    source: "curated seed",
    popularityScore: 86,
    mode: "clean",
    targets: [{ replacedWord: "Ribs", targetSound: "ribs", template: "Baby Back {atom}" }]
  },
  {
    id: "give-and-take",
    text: "Give and Take",
    category: "phrase",
    source: "curated seed",
    popularityScore: 80,
    mode: "clean",
    targets: [{ replacedWord: "Give", targetSound: "gives", template: "{atom} and Take" }]
  },
  {
    id: "cdc-guidelines",
    text: "CDC Guidelines",
    category: "slogan",
    source: "curated seed",
    popularityScore: 80,
    mode: "clean",
    targets: [{ replacedWord: "CDC", targetSound: "cdc", template: "{atom} Guidelines" }]
  },
  {
    id: "cd-rom",
    text: "CD-ROM",
    category: "technology",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "CD", targetSound: "cd", template: "{atom}-ROM" }]
  },
  {
    id: "cd-player",
    text: "CD Player",
    category: "technology",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "CD", targetSound: "cd", template: "{atom} Player" }]
  },
  {
    id: "man-in-the-mirror",
    text: "Man in the Mirror",
    category: "song",
    source: "curated seed",
    popularityScore: 90,
    mode: "clean",
    targets: [{ replacedWord: "Mirror", targetSound: "mirror", template: "The Man in the {atom}ror" }]
  },
  {
    id: "we-built-this-city",
    text: "We Built This City",
    category: "song",
    source: "curated seed",
    popularityScore: 88,
    mode: "clean",
    targets: [{ replacedWord: "City", targetSound: "city", template: "We Built This {atom}" }]
  },
  {
    id: "for-crying-out-loud",
    text: "For Crying Out Loud",
    category: "phrase",
    source: "curated seed",
    popularityScore: 84,
    mode: "clean",
    targets: [{ replacedWord: "Crying", targetSound: "crying", template: "For {atom} Out Loud" }]
  },
  {
    id: "love-actually",
    text: "Love Actually",
    category: "movie",
    source: "curated seed",
    popularityScore: 88,
    mode: "clean",
    targets: [{ replacedWord: "Love", targetSound: "love", template: "{atom} Actually" }]
  },
  {
    id: "too-many-cooks",
    text: "Too Many Cooks",
    category: "tv",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "Cooks", targetSound: "cook", template: "Too Many {atomPlural}" }]
  },
  {
    id: "rice-krispies",
    text: "Rice Krispies",
    category: "brand",
    source: "curated seed",
    popularityScore: 88,
    mode: "clean",
    targets: [{ replacedWord: "Rice", targetSound: "rice", template: "{atom} Krispies" }]
  },
  {
    id: "cut-to-the-chase",
    text: "Cut to the Chase",
    category: "phrase",
    source: "curated seed",
    popularityScore: 84,
    mode: "clean",
    targets: [{ replacedWord: "Chase", targetSound: "chase", template: "Cut to the {atom}" }]
  },
  {
    id: "taylor-swift",
    text: "Taylor Swift",
    category: "music",
    source: "curated seed",
    popularityScore: 96,
    mode: "clean",
    targets: [{ replacedWord: "Swift", targetSound: "swift", template: "Taylor {atom}" }]
  },
  {
    id: "hunter-x-hunter",
    text: "Hunter x Hunter",
    category: "anime",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "Hunter", targetSound: "hunter", template: "{atom} x {atom}" }]
  },
  {
    id: "bakers-dozen",
    text: "Baker's Dozen",
    category: "food",
    source: "curated seed",
    popularityScore: 80,
    mode: "clean",
    targets: [{ replacedWord: "Baker's", targetSound: "baker", template: "{atomPossessive} Dozen" }]
  },
  {
    id: "puka-shell",
    text: "Puka Shell",
    category: "phrase",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "Puka", targetSound: "puka", template: "{atom} Shells" }]
  },
  {
    id: "hakuna-matata",
    text: "Hakuna Matata",
    category: "movie",
    source: "curated seed",
    popularityScore: 94,
    mode: "clean",
    targets: [{ replacedWord: "Hakuna", targetSound: "hakuna", template: "{atom} Matata" }]
  },
  {
    id: "bark-at-the-moon",
    text: "Bark at the Moon",
    category: "song",
    source: "curated seed",
    popularityScore: 84,
    mode: "clean",
    targets: [{ replacedWord: "Bark", targetSound: "bark", template: "{atom} at the Moon" }]
  },
  {
    id: "king-of-the-hill",
    text: "King of the Hill",
    category: "tv",
    source: "curated seed",
    popularityScore: 92,
    mode: "clean",
    targets: [{ replacedWord: "Hill", targetSound: "hill", template: "King of the {atom}" }]
  },
  {
    id: "bed-bath-beyond",
    text: "Bed Bath & Beyond",
    category: "brand",
    source: "curated seed",
    popularityScore: 90,
    mode: "clean",
    targets: [{ replacedWord: "Beyond", targetSound: "beyond", template: "Bed, Bath, and {atom}" }]
  },
  {
    id: "dijon-mustard",
    text: "Dijon Mustard",
    category: "food",
    source: "curated seed",
    popularityScore: 84,
    mode: "clean",
    targets: [{ replacedWord: "Dijon", targetSound: "dijon", template: "{atom} Mustard" }]
  },
  {
    id: "grey-poupon",
    text: "Grey Poupon",
    category: "brand",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "Dijon", targetSound: "dijon", template: "{atom} Poupon" }]
  },
  {
    id: "honey-dijon",
    text: "Honey Dijon",
    category: "food",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "Dijon", targetSound: "dijon", template: "Honey {atom}" }]
  },
  {
    id: "dijon-vinaigrette",
    text: "Dijon Vinaigrette",
    category: "food",
    source: "curated seed",
    popularityScore: 70,
    mode: "clean",
    targets: [{ replacedWord: "Dijon", targetSound: "dijon", template: "{atom} Vinaigrette" }]
  },
  {
    id: "dijon-chicken",
    text: "Dijon Chicken",
    category: "food",
    source: "curated seed",
    popularityScore: 70,
    mode: "clean",
    targets: [{ replacedWord: "Dijon", targetSound: "dijon", template: "{atom} Chicken" }]
  },
  {
    id: "dijon-sauce",
    text: "Dijon Sauce",
    category: "food",
    source: "curated seed",
    popularityScore: 70,
    mode: "clean",
    targets: [{ replacedWord: "Dijon", targetSound: "dijon", template: "{atom} Sauce" }]
  },
  {
    id: "dijon-dressing",
    text: "Dijon Dressing",
    category: "food",
    source: "curated seed",
    popularityScore: 70,
    mode: "clean",
    targets: [{ replacedWord: "Dijon", targetSound: "dijon", template: "{atom} Dressing" }]
  },
  {
    id: "dijon-france",
    text: "Dijon, France",
    category: "phrase",
    source: "curated seed",
    popularityScore: 68,
    mode: "clean",
    targets: [{ replacedWord: "Dijon", targetSound: "dijon", template: "{atom}, France" }]
  },
  {
    id: "to-infinity-and-beyond",
    text: "To Infinity and Beyond",
    category: "movie",
    source: "curated seed",
    popularityScore: 92,
    mode: "clean",
    targets: [{ replacedWord: "Beyond", targetSound: "beyond", template: "To Infinity and {atom}" }]
  },
  {
    id: "beyond-belief",
    text: "Beyond Belief",
    category: "phrase",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "Beyond", targetSound: "beyond", template: "{atom} Belief" }]
  },
  {
    id: "beyond-the-sea",
    text: "Beyond the Sea",
    category: "song",
    source: "curated seed",
    popularityScore: 80,
    mode: "clean",
    targets: [{ replacedWord: "Beyond", targetSound: "beyond", template: "{atom} the Sea" }]
  },
  {
    id: "batman-beyond",
    text: "Batman Beyond",
    category: "tv",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "Beyond", targetSound: "beyond", template: "Batman {atom}" }]
  },
  {
    id: "beyond-good-and-evil",
    text: "Beyond Good and Evil",
    category: "game",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "Beyond", targetSound: "beyond", template: "{atom} Good and Evil" }]
  },
  {
    id: "beyond-the-pale",
    text: "Beyond the Pale",
    category: "phrase",
    source: "curated seed",
    popularityScore: 72,
    mode: "clean",
    targets: [{ replacedWord: "Beyond", targetSound: "beyond", template: "{atom} the Pale" }]
  },
  {
    id: "above-and-beyond",
    text: "Above and Beyond",
    category: "phrase",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "Beyond", targetSound: "beyond", template: "Above and {atom}" }]
  },
  {
    id: "mad-max-beyond-thunderdome",
    text: "Mad Max Beyond Thunderdome",
    category: "movie",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "Beyond", targetSound: "beyond", template: "Mad Max {atom} Thunderdome" }]
  },
  {
    id: "silence-of-the-lambs",
    text: "The Silence of the Lambs",
    category: "movie",
    source: "curated seed",
    popularityScore: 94,
    mode: "clean",
    targets: [{ replacedWord: "Lambs", targetSound: "lamb", template: "Silence of the {atom}" }]
  },
  {
    id: "lamb-of-god",
    text: "Lamb of God",
    category: "music",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "Lamb", targetSound: "lamb", template: "{atom} of God" }]
  },
  {
    id: "mary-little-lamb",
    text: "Mary Had a Little Lamb",
    category: "song",
    source: "curated seed",
    popularityScore: 86,
    mode: "clean",
    targets: [{ replacedWord: "Lamb", targetSound: "lamb", template: "{playerFirst} Had a Little {atom}" }]
  },
  {
    id: "lamb-chop",
    text: "Lamb Chop",
    category: "food",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "Lamb", targetSound: "lamb", template: "{atom} Chop" }]
  },
  {
    id: "lamb-to-slaughter",
    text: "Lamb to the Slaughter",
    category: "phrase",
    source: "curated seed",
    popularityScore: 80,
    mode: "clean",
    targets: [{ replacedWord: "Lamb", targetSound: "lamb", template: "{atom} to the Slaughter" }]
  },
  {
    id: "lamb-lies-down",
    text: "The Lamb Lies Down on Broadway",
    category: "music",
    source: "curated seed",
    popularityScore: 74,
    mode: "clean",
    targets: [{ replacedWord: "Lamb", targetSound: "lamb", template: "The {atom} Lies Down on Broadway" }]
  },
  {
    id: "counting-sheep",
    text: "Counting Sheep",
    category: "phrase",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "Sheep", targetSound: "lamb", template: "Counting {atomPlural}" }]
  },
  {
    id: "black-sheep",
    text: "Black Sheep",
    category: "phrase",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "Sheep", targetSound: "lamb", template: "Black {atom}" }]
  },
  {
    id: "chain-of-command",
    text: "Chain of Command",
    category: "phrase",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "Chain", targetSound: "chain", template: "{atom} of Command" }]
  },
  {
    id: "food-chain",
    text: "Food Chain",
    category: "phrase",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "Chain", targetSound: "chain", template: "Food {atom}" }]
  },
  {
    id: "chain-gang",
    text: "Chain Gang",
    category: "song",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "Chain", targetSound: "chain", template: "{atom} Gang" }]
  },
  {
    id: "ball-and-chain",
    text: "Ball and Chain",
    category: "phrase",
    source: "curated seed",
    popularityScore: 74,
    mode: "clean",
    targets: [{ replacedWord: "Chain", targetSound: "chain", template: "Ball and {atom}" }]
  },
  {
    id: "chain-letter",
    text: "Chain Letter",
    category: "phrase",
    source: "curated seed",
    popularityScore: 72,
    mode: "clean",
    targets: [{ replacedWord: "Chain", targetSound: "chain", template: "{atom} Letter" }]
  },
  {
    id: "short-ribs",
    text: "Short Ribs",
    category: "food",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "Ribs", targetSound: "ribs", template: "Short {atom}" }]
  },
  {
    id: "prime-rib",
    text: "Prime Rib",
    category: "food",
    source: "curated seed",
    popularityScore: 80,
    mode: "clean",
    targets: [{ replacedWord: "Rib", targetSound: "ribs", template: "Prime {atom}" }]
  },
  {
    id: "rib-tickler",
    text: "Rib Tickler",
    category: "phrase",
    source: "curated seed",
    popularityScore: 74,
    mode: "clean",
    targets: [{ replacedWord: "Rib", targetSound: "ribs", template: "{atom} Tickler" }]
  },
  {
    id: "rib-cage",
    text: "Rib Cage",
    category: "phrase",
    source: "curated seed",
    popularityScore: 72,
    mode: "clean",
    targets: [{ replacedWord: "Rib", targetSound: "ribs", template: "{atom} Cage" }]
  },
  {
    id: "stick-to-your-ribs",
    text: "Stick to Your Ribs",
    category: "phrase",
    source: "curated seed",
    popularityScore: 72,
    mode: "clean",
    targets: [{ replacedWord: "Ribs", targetSound: "ribs", template: "Stick to Your {atom}" }]
  },
  {
    id: "never-gonna-give-you-up",
    text: "Never Gonna Give You Up",
    category: "song",
    source: "curated seed",
    popularityScore: 94,
    mode: "clean",
    targets: [{ replacedWord: "Give", targetSound: "gives", template: "Never Gonna {atom} You Up" }]
  },
  {
    id: "give-peace-a-chance",
    text: "Give Peace a Chance",
    category: "song",
    source: "curated seed",
    popularityScore: 88,
    mode: "clean",
    targets: [{ replacedWord: "Give", targetSound: "gives", template: "{atom} Peace a Chance" }]
  },
  {
    id: "give-me-liberty",
    text: "Give Me Liberty",
    category: "slogan",
    source: "curated seed",
    popularityScore: 84,
    mode: "clean",
    targets: [{ replacedWord: "Give", targetSound: "gives", template: "{atom} Me Liberty" }]
  },
  {
    id: "give-it-away",
    text: "Give It Away",
    category: "song",
    source: "curated seed",
    popularityScore: 84,
    mode: "clean",
    targets: [{ replacedWord: "Give", targetSound: "gives", template: "{atom} It Away" }]
  },
  {
    id: "give-it-up",
    text: "Give It Up",
    category: "song",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "Give", targetSound: "gives", template: "{atom} It Up" }]
  },
  {
    id: "monkey-island",
    text: "Monkey Island",
    category: "game",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "Monkey", targetSound: "monkey", template: "{atom} Island" }]
  },
  {
    id: "twelve-monkeys",
    text: "12 Monkeys",
    category: "movie",
    source: "curated seed",
    popularityScore: 84,
    mode: "clean",
    targets: [{ replacedWord: "Monkeys", targetSound: "monkey", template: "12 {atomPlural}" }]
  },
  {
    id: "arctic-monkeys",
    text: "Arctic Monkeys",
    category: "music",
    source: "curated seed",
    popularityScore: 88,
    mode: "clean",
    targets: [{ replacedWord: "Monkeys", targetSound: "monkey", template: "Arctic {atomPlural}" }]
  },
  {
    id: "monkey-man",
    text: "Monkey Man",
    category: "movie",
    source: "curated seed",
    popularityScore: 80,
    mode: "clean",
    targets: [{ replacedWord: "Monkey", targetSound: "monkey", template: "{atom} Man" }]
  },
  {
    id: "brass-monkey",
    text: "Brass Monkey",
    category: "song",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "Monkey", targetSound: "monkey", template: "Brass {atom}" }]
  },
  {
    id: "key-and-peele",
    text: "Key & Peele",
    category: "tv",
    source: "curated seed",
    popularityScore: 88,
    mode: "clean",
    targets: [{ replacedWord: "Key", targetSound: "key", template: "{atom} & Peele" }]
  },
  {
    id: "key-largo",
    text: "Key Largo",
    category: "movie",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "Key", targetSound: "key", template: "{atom} Largo" }]
  },
  {
    id: "key-to-the-city",
    text: "Key to the City",
    category: "phrase",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "Key", targetSound: "key", template: "{atom} to the City" }]
  },
  {
    id: "what-else-is-new",
    text: "What Else Is New",
    category: "phrase",
    source: "curated seed",
    popularityScore: 74,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "What {atom} Is New" }]
  },
  {
    id: "if-nothing-else",
    text: "If Nothing Else",
    category: "phrase",
    source: "curated seed",
    popularityScore: 72,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "If Nothing {atom}" }]
  },
  {
    id: "elsewhere",
    text: "Elsewhere",
    category: "phrase",
    source: "curated seed",
    popularityScore: 70,
    mode: "clean",
    targets: [{ replacedWord: "Else", targetSound: "else", template: "{atom}where" }]
  },
  {
    id: "calf-raises",
    text: "Calf Raises",
    category: "sports",
    source: "curated seed",
    popularityScore: 74,
    mode: "clean",
    targets: [{ replacedWord: "Calf", targetSound: "calf", template: "{atom} Raises" }]
  },
  {
    id: "calf-strain",
    text: "Calf Strain",
    category: "sports",
    source: "curated seed",
    popularityScore: 72,
    mode: "clean",
    targets: [{ replacedWord: "Calf", targetSound: "calf", template: "{atom} Strain" }]
  },
  {
    id: "calf-muscle",
    text: "Calf Muscle",
    category: "sports",
    source: "curated seed",
    popularityScore: 70,
    mode: "clean",
    targets: [{ replacedWord: "Calf", targetSound: "calf", template: "{atom} Muscle" }]
  },
  {
    id: "run-dmc-its-tricky",
    text: "Run-DMC: It's Tricky",
    category: "song",
    source: "curated seed",
    popularityScore: 86,
    mode: "clean",
    targets: [{ replacedWord: "DMC", targetSound: "run dmc", template: "It's Tricky {atom}" }]
  },
  {
    id: "run-dmc-walk-this-way",
    text: "Run-DMC: Walk This Way",
    category: "song",
    source: "curated seed",
    popularityScore: 88,
    mode: "clean",
    targets: [{ replacedWord: "DMC", targetSound: "run dmc", template: "{atom} This Way" }]
  },
  {
    id: "run-dmc-king-of-rock",
    text: "Run-DMC: King of Rock",
    category: "song",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "DMC", targetSound: "run dmc", template: "King of {atom}" }]
  },
  {
    id: "run-dmc-raising-hell",
    text: "Run-DMC: Raising Hell",
    category: "song",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "DMC", targetSound: "run dmc", template: "{atom} Raising Hell" }]
  },
  {
    id: "mccafe-latte",
    text: "McCafe Latte",
    category: "brand",
    source: "curated seed",
    popularityScore: 72,
    mode: "clean",
    targets: [{ replacedWord: "McCafe", targetSound: "mccafe", template: "{atom} Latte" }]
  },
  {
    id: "mccafe-mocha",
    text: "McCafe Mocha",
    category: "brand",
    source: "curated seed",
    popularityScore: 70,
    mode: "clean",
    targets: [{ replacedWord: "McCafe", targetSound: "mccafe", template: "{atom} Mocha" }]
  },
  {
    id: "run-dmc-my-adidas",
    text: "Run-DMC: My Adidas",
    category: "song",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "DMC", targetSound: "run dmc", template: "My {atom}idas" }]
  },
  {
    id: "run-dmc-down-with-the-king",
    text: "Run-DMC: Down with the King",
    category: "song",
    source: "curated seed",
    popularityScore: 80,
    mode: "clean",
    targets: [{ replacedWord: "DMC", targetSound: "run dmc", template: "Down with the {atom}" }]
  },
  {
    id: "run-dmc-peter-piper",
    text: "Run-DMC: Peter Piper",
    category: "song",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "DMC", targetSound: "run dmc", template: "{atom} Piper" }]
  },
  {
    id: "run-dmc-rock-box",
    text: "Run-DMC: Rock Box",
    category: "song",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "DMC", targetSound: "run dmc", template: "{atom} Box" }]
  },
  {
    id: "run-dmc-its-like-that",
    text: "Run-DMC: It's Like That",
    category: "song",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "DMC", targetSound: "run dmc", template: "{atom} Like That" }]
  },
  {
    id: "run-dmc-christmas-in-hollis",
    text: "Run-DMC: Christmas in Hollis",
    category: "song",
    source: "curated seed",
    popularityScore: 76,
    mode: "clean",
    targets: [{ replacedWord: "DMC", targetSound: "run dmc", template: "{atom} in Hollis" }]
  },
  {
    id: "run-dmc-beats-to-the-rhyme",
    text: "Run-DMC: Beats to the Rhyme",
    category: "song",
    source: "curated seed",
    popularityScore: 74,
    mode: "clean",
    targets: [{ replacedWord: "DMC", targetSound: "run dmc", template: "{atom} to the Rhyme" }]
  },
  {
    id: "run-dmc-hard-times",
    text: "Run-DMC: Hard Times",
    category: "song",
    source: "curated seed",
    popularityScore: 74,
    mode: "clean",
    targets: [{ replacedWord: "DMC", targetSound: "run dmc", template: "{atom} Hard Times" }]
  },
  {
    id: "chelsea-handler",
    text: "Chelsea Handler",
    category: "celebrity",
    source: "curated seed",
    popularityScore: 78,
    mode: "clean",
    targets: [{ replacedWord: "Chelsea", targetSound: "chelsea", template: "{atom} Handler" }]
  },
  {
    id: "chelsea-boots",
    text: "Chelsea Boots",
    category: "brand",
    source: "curated seed",
    popularityScore: 74,
    mode: "clean",
    targets: [{ replacedWord: "Chelsea", targetSound: "chelsea", template: "{atom} Boots" }]
  },
  {
    id: "made-in-chelsea",
    text: "Made in Chelsea",
    category: "tv",
    source: "curated seed",
    popularityScore: 72,
    mode: "clean",
    targets: [{ replacedWord: "Chelsea", targetSound: "chelsea", template: "Made in {atom}" }]
  },
  {
    id: "chelsea-smile",
    text: "Chelsea Smile",
    category: "song",
    source: "curated seed",
    popularityScore: 70,
    mode: "clean",
    targets: [{ replacedWord: "Chelsea", targetSound: "chelsea", template: "{atom} Smile" }]
  },
  {
    id: "just-in-time",
    text: "Just in Time",
    category: "phrase",
    source: "curated seed",
    popularityScore: 84,
    mode: "clean",
    targets: [{ replacedWord: "Just in", targetSound: "just in", template: "{atom} Time" }]
  },
  {
    id: "just-in-case",
    text: "Just in Case",
    category: "phrase",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "Just in", targetSound: "just in", template: "{atom} Case" }]
  },
  {
    id: "justice-league",
    text: "Justice League",
    category: "movie",
    source: "curated seed",
    popularityScore: 90,
    mode: "clean",
    targets: [{ replacedWord: "Justice", targetSound: "justice", template: "{atom} League" }]
  },
  {
    id: "just-dance",
    text: "Just Dance",
    category: "song",
    source: "curated seed",
    popularityScore: 86,
    mode: "clean",
    targets: [{ replacedWord: "Just", targetSound: "just", template: "{atom} Dance" }]
  },
  {
    id: "just-the-two-of-us",
    text: "Just the Two of Us",
    category: "song",
    source: "curated seed",
    popularityScore: 84,
    mode: "clean",
    targets: [{ replacedWord: "Just", targetSound: "just", template: "{atom} the Two of Us" }]
  },
  {
    id: "just-what-i-needed",
    text: "Just What I Needed",
    category: "song",
    source: "curated seed",
    popularityScore: 82,
    mode: "clean",
    targets: [{ replacedWord: "Just", targetSound: "just", template: "{atom} What I Needed" }]
  },
  {
    id: "the-jetsons",
    text: "The Jetsons",
    category: "tv",
    source: "curated seed",
    popularityScore: 84,
    mode: "clean",
    targets: [{ replacedWord: "Jetsons", targetSound: "jetsons", template: "The {atom}s" }]
  },
  {
    id: "jefferson-airplane",
    text: "Jefferson Airplane",
    category: "music",
    source: "curated seed",
    popularityScore: 84,
    mode: "clean",
    targets: [{ replacedWord: "Jefferson", targetSound: "jefferson", template: "{atom} Airplane" }]
  }
];
