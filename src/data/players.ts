export type Player = {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  team: string;
  position: "QB" | "RB" | "WR" | "TE" | "K" | "DST";
  aliases?: string[];
};

export const activePlayers: Player[] = [
  {
    id: "ceedee-lamb",
    fullName: "CeeDee Lamb",
    firstName: "CeeDee",
    lastName: "Lamb",
    team: "DAL",
    position: "WR",
    aliases: ["CD Lamb", "C.D. Lamb"]
  },
  {
    id: "kyle-pitts",
    fullName: "Kyle Pitts",
    firstName: "Kyle",
    lastName: "Pitts",
    team: "ATL",
    position: "TE"
  },
  {
    id: "jalen-hurts",
    fullName: "Jalen Hurts",
    firstName: "Jalen",
    lastName: "Hurts",
    team: "PHI",
    position: "QB"
  },
  {
    id: "justin-jefferson",
    fullName: "Justin Jefferson",
    firstName: "Justin",
    lastName: "Jefferson",
    team: "MIN",
    position: "WR",
    aliases: ["Jets"]
  },
  {
    id: "bijan-robinson",
    fullName: "Bijan Robinson",
    firstName: "Bijan",
    lastName: "Robinson",
    team: "ATL",
    position: "RB"
  },
  {
    id: "amon-ra-st-brown",
    fullName: "Amon-Ra St. Brown",
    firstName: "Amon-Ra",
    lastName: "St. Brown",
    team: "DET",
    position: "WR",
    aliases: ["Sun God", "Amon Ra"]
  },
  {
    id: "christian-mccaffrey",
    fullName: "Christian McCaffrey",
    firstName: "Christian",
    lastName: "McCaffrey",
    team: "SF",
    position: "RB",
    aliases: ["CMC"]
  },
  {
    id: "patrick-mahomes",
    fullName: "Patrick Mahomes",
    firstName: "Patrick",
    lastName: "Mahomes",
    team: "KC",
    position: "QB"
  },
  {
    id: "josh-allen",
    fullName: "Josh Allen",
    firstName: "Josh",
    lastName: "Allen",
    team: "BUF",
    position: "QB"
  },
  {
    id: "tyreek-hill",
    fullName: "Tyreek Hill",
    firstName: "Tyreek",
    lastName: "Hill",
    team: "MIA",
    position: "WR"
  },
  {
    id: "travis-kelce",
    fullName: "Travis Kelce",
    firstName: "Travis",
    lastName: "Kelce",
    team: "KC",
    position: "TE"
  },
  {
    id: "saquon-barkley",
    fullName: "Saquon Barkley",
    firstName: "Saquon",
    lastName: "Barkley",
    team: "PHI",
    position: "RB"
  },
  {
    id: "jahmyr-gibbs",
    fullName: "Jahmyr Gibbs",
    firstName: "Jahmyr",
    lastName: "Gibbs",
    team: "DET",
    position: "RB",
    aliases: ["Jamyr Gibbs", "Jahmir Gibbs"]
  },
  {
    id: "aaron-rodgers",
    fullName: "Aaron Rodgers",
    firstName: "Aaron",
    lastName: "Rodgers",
    team: "PIT",
    position: "QB",
    aliases: ["A Rod", "A-Rod"]
  },
  {
    id: "joe-burrow",
    fullName: "Joe Burrow",
    firstName: "Joe",
    lastName: "Burrow",
    team: "CIN",
    position: "QB",
    aliases: ["Joey B", "Joe Brrr"]
  },
  {
    id: "lamar-jackson",
    fullName: "Lamar Jackson",
    firstName: "Lamar",
    lastName: "Jackson",
    team: "BAL",
    position: "QB"
  },
  {
    id: "jayden-daniels",
    fullName: "Jayden Daniels",
    firstName: "Jayden",
    lastName: "Daniels",
    team: "WAS",
    position: "QB"
  },
  {
    id: "caleb-williams",
    fullName: "Caleb Williams",
    firstName: "Caleb",
    lastName: "Williams",
    team: "CHI",
    position: "QB"
  },
  {
    id: "drake-maye",
    fullName: "Drake Maye",
    firstName: "Drake",
    lastName: "Maye",
    team: "NE",
    position: "QB"
  },
  {
    id: "brock-purdy",
    fullName: "Brock Purdy",
    firstName: "Brock",
    lastName: "Purdy",
    team: "SF",
    position: "QB"
  },
  {
    id: "justin-herbert",
    fullName: "Justin Herbert",
    firstName: "Justin",
    lastName: "Herbert",
    team: "LAC",
    position: "QB"
  },
  {
    id: "c-j-stroud",
    fullName: "C.J. Stroud",
    firstName: "C.J.",
    lastName: "Stroud",
    team: "HOU",
    position: "QB",
    aliases: ["CJ Stroud"]
  },
  {
    id: "jordan-love",
    fullName: "Jordan Love",
    firstName: "Jordan",
    lastName: "Love",
    team: "GB",
    position: "QB"
  },
  {
    id: "dak-prescott",
    fullName: "Dak Prescott",
    firstName: "Dak",
    lastName: "Prescott",
    team: "DAL",
    position: "QB"
  },
  {
    id: "baker-mayfield",
    fullName: "Baker Mayfield",
    firstName: "Baker",
    lastName: "Mayfield",
    team: "TB",
    position: "QB"
  },
  {
    id: "kyler-murray",
    fullName: "Kyler Murray",
    firstName: "Kyler",
    lastName: "Murray",
    team: "ARI",
    position: "QB"
  },
  {
    id: "bo-nix",
    fullName: "Bo Nix",
    firstName: "Bo",
    lastName: "Nix",
    team: "DEN",
    position: "QB"
  },
  {
    id: "j-j-mccarthy",
    fullName: "J.J. McCarthy",
    firstName: "J.J.",
    lastName: "McCarthy",
    team: "MIN",
    position: "QB",
    aliases: ["JJ McCarthy"]
  },
  {
    id: "tua-tagovailoa",
    fullName: "Tua Tagovailoa",
    firstName: "Tua",
    lastName: "Tagovailoa",
    team: "MIA",
    position: "QB"
  },
  {
    id: "anthony-richardson",
    fullName: "Anthony Richardson",
    firstName: "Anthony",
    lastName: "Richardson",
    team: "IND",
    position: "QB",
    aliases: ["AR", "ARich"]
  },
  {
    id: "trevor-lawrence",
    fullName: "Trevor Lawrence",
    firstName: "Trevor",
    lastName: "Lawrence",
    team: "JAX",
    position: "QB"
  },
  {
    id: "michael-penix",
    fullName: "Michael Penix",
    firstName: "Michael",
    lastName: "Penix",
    team: "ATL",
    position: "QB"
  },
  {
    id: "cam-ward",
    fullName: "Cam Ward",
    firstName: "Cam",
    lastName: "Ward",
    team: "TEN",
    position: "QB"
  },
  {
    id: "jared-goff",
    fullName: "Jared Goff",
    firstName: "Jared",
    lastName: "Goff",
    team: "DET",
    position: "QB"
  },
  {
    id: "jonathan-taylor",
    fullName: "Jonathan Taylor",
    firstName: "Jonathan",
    lastName: "Taylor",
    team: "IND",
    position: "RB",
    aliases: ["JT"]
  },
  {
    id: "breece-hall",
    fullName: "Breece Hall",
    firstName: "Breece",
    lastName: "Hall",
    team: "NYJ",
    position: "RB"
  },
  {
    id: "de-von-achane",
    fullName: "De'Von Achane",
    firstName: "De'Von",
    lastName: "Achane",
    team: "MIA",
    position: "RB",
    aliases: ["Devon Achane"]
  },
  {
    id: "ashton-jeanty",
    fullName: "Ashton Jeanty",
    firstName: "Ashton",
    lastName: "Jeanty",
    team: "LV",
    position: "RB"
  },
  {
    id: "derrick-henry",
    fullName: "Derrick Henry",
    firstName: "Derrick",
    lastName: "Henry",
    team: "BAL",
    position: "RB",
    aliases: ["King Henry"]
  },
  {
    id: "josh-jacobs",
    fullName: "Josh Jacobs",
    firstName: "Josh",
    lastName: "Jacobs",
    team: "GB",
    position: "RB"
  },
  {
    id: "kyren-williams",
    fullName: "Kyren Williams",
    firstName: "Kyren",
    lastName: "Williams",
    team: "LAR",
    position: "RB"
  },
  {
    id: "james-cook",
    fullName: "James Cook",
    firstName: "James",
    lastName: "Cook",
    team: "BUF",
    position: "RB"
  },
  {
    id: "alvin-kamara",
    fullName: "Alvin Kamara",
    firstName: "Alvin",
    lastName: "Kamara",
    team: "NO",
    position: "RB"
  },
  {
    id: "kenneth-walker",
    fullName: "Kenneth Walker III",
    firstName: "Kenneth",
    lastName: "Walker",
    team: "SEA",
    position: "RB",
    aliases: ["Kenneth Walker", "KW3"]
  },
  {
    id: "chase-brown",
    fullName: "Chase Brown",
    firstName: "Chase",
    lastName: "Brown",
    team: "CIN",
    position: "RB"
  },
  {
    id: "bucky-irving",
    fullName: "Bucky Irving",
    firstName: "Bucky",
    lastName: "Irving",
    team: "TB",
    position: "RB"
  },
  {
    id: "omarion-hampton",
    fullName: "Omarion Hampton",
    firstName: "Omarion",
    lastName: "Hampton",
    team: "LAC",
    position: "RB"
  },
  {
    id: "treveyon-henderson",
    fullName: "TreVeyon Henderson",
    firstName: "TreVeyon",
    lastName: "Henderson",
    team: "NE",
    position: "RB"
  },
  {
    id: "rj-harvey",
    fullName: "RJ Harvey",
    firstName: "RJ",
    lastName: "Harvey",
    team: "DEN",
    position: "RB"
  },
  {
    id: "quinshon-judkins",
    fullName: "Quinshon Judkins",
    firstName: "Quinshon",
    lastName: "Judkins",
    team: "CLE",
    position: "RB"
  },
  {
    id: "chuba-hubbard",
    fullName: "Chuba Hubbard",
    firstName: "Chuba",
    lastName: "Hubbard",
    team: "CAR",
    position: "RB"
  },
  {
    id: "tony-pollard",
    fullName: "Tony Pollard",
    firstName: "Tony",
    lastName: "Pollard",
    team: "TEN",
    position: "RB"
  },
  {
    id: "isiah-pacheco",
    fullName: "Isiah Pacheco",
    firstName: "Isiah",
    lastName: "Pacheco",
    team: "KC",
    position: "RB"
  },
  {
    id: "d-andre-swift",
    fullName: "D'Andre Swift",
    firstName: "D'Andre",
    lastName: "Swift",
    team: "CHI",
    position: "RB",
    aliases: ["Dandre Swift"]
  },
  {
    id: "ja-marr-chase",
    fullName: "Ja'Marr Chase",
    firstName: "Ja'Marr",
    lastName: "Chase",
    team: "CIN",
    position: "WR",
    aliases: ["Jamar Chase", "JaMarr Chase"]
  },
  {
    id: "puka-nacua",
    fullName: "Puka Nacua",
    firstName: "Puka",
    lastName: "Nacua",
    team: "LAR",
    position: "WR"
  },
  {
    id: "malik-nabers",
    fullName: "Malik Nabers",
    firstName: "Malik",
    lastName: "Nabers",
    team: "NYG",
    position: "WR"
  },
  {
    id: "brian-thomas-jr",
    fullName: "Brian Thomas Jr.",
    firstName: "Brian",
    lastName: "Thomas",
    team: "JAX",
    position: "WR",
    aliases: ["Brian Thomas", "BTJ"]
  },
  {
    id: "nico-collins",
    fullName: "Nico Collins",
    firstName: "Nico",
    lastName: "Collins",
    team: "HOU",
    position: "WR"
  },
  {
    id: "a-j-brown",
    fullName: "A.J. Brown",
    firstName: "A.J.",
    lastName: "Brown",
    team: "PHI",
    position: "WR",
    aliases: ["AJ Brown"]
  },
  {
    id: "drake-london",
    fullName: "Drake London",
    firstName: "Drake",
    lastName: "London",
    team: "ATL",
    position: "WR"
  },
  {
    id: "tee-higgins",
    fullName: "Tee Higgins",
    firstName: "Tee",
    lastName: "Higgins",
    team: "CIN",
    position: "WR"
  },
  {
    id: "ladd-mcconkey",
    fullName: "Ladd McConkey",
    firstName: "Ladd",
    lastName: "McConkey",
    team: "LAC",
    position: "WR"
  },
  {
    id: "marvin-harrison-jr",
    fullName: "Marvin Harrison Jr.",
    firstName: "Marvin",
    lastName: "Harrison",
    team: "ARI",
    position: "WR",
    aliases: ["Marvin Harrison", "MHJ"]
  },
  {
    id: "garrett-wilson",
    fullName: "Garrett Wilson",
    firstName: "Garrett",
    lastName: "Wilson",
    team: "NYJ",
    position: "WR"
  },
  {
    id: "mike-evans",
    fullName: "Mike Evans",
    firstName: "Mike",
    lastName: "Evans",
    team: "TB",
    position: "WR"
  },
  {
    id: "terry-mclaurin",
    fullName: "Terry McLaurin",
    firstName: "Terry",
    lastName: "McLaurin",
    team: "WAS",
    position: "WR"
  },
  {
    id: "dk-metcalf",
    fullName: "DK Metcalf",
    firstName: "DK",
    lastName: "Metcalf",
    team: "PIT",
    position: "WR",
    aliases: ["D.K. Metcalf"]
  },
  {
    id: "davante-adams",
    fullName: "Davante Adams",
    firstName: "Davante",
    lastName: "Adams",
    team: "LAR",
    position: "WR"
  },
  {
    id: "rashee-rice",
    fullName: "Rashee Rice",
    firstName: "Rashee",
    lastName: "Rice",
    team: "KC",
    position: "WR"
  },
  {
    id: "xavier-worthy",
    fullName: "Xavier Worthy",
    firstName: "Xavier",
    lastName: "Worthy",
    team: "KC",
    position: "WR"
  },
  {
    id: "devonta-smith",
    fullName: "DeVonta Smith",
    firstName: "DeVonta",
    lastName: "Smith",
    team: "PHI",
    position: "WR"
  },
  {
    id: "zay-flowers",
    fullName: "Zay Flowers",
    firstName: "Zay",
    lastName: "Flowers",
    team: "BAL",
    position: "WR"
  },
  {
    id: "jaxon-smith-njigba",
    fullName: "Jaxon Smith-Njigba",
    firstName: "Jaxon",
    lastName: "Smith-Njigba",
    team: "SEA",
    position: "WR",
    aliases: ["JSN"]
  },
  {
    id: "rome-odunze",
    fullName: "Rome Odunze",
    firstName: "Rome",
    lastName: "Odunze",
    team: "CHI",
    position: "WR"
  },
  {
    id: "tetairoa-mcmillan",
    fullName: "Tetairoa McMillan",
    firstName: "Tetairoa",
    lastName: "McMillan",
    team: "CAR",
    position: "WR",
    aliases: ["TMac", "T-Mac"]
  },
  {
    id: "travis-hunter",
    fullName: "Travis Hunter",
    firstName: "Travis",
    lastName: "Hunter",
    team: "JAX",
    position: "WR"
  },
  {
    id: "emeka-egbuka",
    fullName: "Emeka Egbuka",
    firstName: "Emeka",
    lastName: "Egbuka",
    team: "TB",
    position: "WR"
  },
  {
    id: "jaylen-waddle",
    fullName: "Jaylen Waddle",
    firstName: "Jaylen",
    lastName: "Waddle",
    team: "MIA",
    position: "WR"
  },
  {
    id: "george-pickens",
    fullName: "George Pickens",
    firstName: "George",
    lastName: "Pickens",
    team: "DAL",
    position: "WR"
  },
  {
    id: "courtland-sutton",
    fullName: "Courtland Sutton",
    firstName: "Courtland",
    lastName: "Sutton",
    team: "DEN",
    position: "WR"
  },
  {
    id: "chris-olave",
    fullName: "Chris Olave",
    firstName: "Chris",
    lastName: "Olave",
    team: "NO",
    position: "WR"
  },
  {
    id: "brock-bowers",
    fullName: "Brock Bowers",
    firstName: "Brock",
    lastName: "Bowers",
    team: "LV",
    position: "TE"
  },
  {
    id: "trey-mcbride",
    fullName: "Trey McBride",
    firstName: "Trey",
    lastName: "McBride",
    team: "ARI",
    position: "TE"
  },
  {
    id: "george-kittle",
    fullName: "George Kittle",
    firstName: "George",
    lastName: "Kittle",
    team: "SF",
    position: "TE"
  },
  {
    id: "sam-laporta",
    fullName: "Sam LaPorta",
    firstName: "Sam",
    lastName: "LaPorta",
    team: "DET",
    position: "TE"
  },
  {
    id: "t-j-hockenson",
    fullName: "T.J. Hockenson",
    firstName: "T.J.",
    lastName: "Hockenson",
    team: "MIN",
    position: "TE",
    aliases: ["TJ Hockenson"]
  },
  {
    id: "mark-andrews",
    fullName: "Mark Andrews",
    firstName: "Mark",
    lastName: "Andrews",
    team: "BAL",
    position: "TE"
  },
  {
    id: "evan-engram",
    fullName: "Evan Engram",
    firstName: "Evan",
    lastName: "Engram",
    team: "DEN",
    position: "TE"
  },
  {
    id: "david-njoku",
    fullName: "David Njoku",
    firstName: "David",
    lastName: "Njoku",
    team: "CLE",
    position: "TE"
  },
  {
    id: "jake-ferguson",
    fullName: "Jake Ferguson",
    firstName: "Jake",
    lastName: "Ferguson",
    team: "DAL",
    position: "TE"
  },
  {
    id: "dallas-goedert",
    fullName: "Dallas Goedert",
    firstName: "Dallas",
    lastName: "Goedert",
    team: "PHI",
    position: "TE"
  },
  {
    id: "tyler-warren",
    fullName: "Tyler Warren",
    firstName: "Tyler",
    lastName: "Warren",
    team: "IND",
    position: "TE"
  },
  {
    id: "colston-loveland",
    fullName: "Colston Loveland",
    firstName: "Colston",
    lastName: "Loveland",
    team: "CHI",
    position: "TE"
  },
  {
    id: "tucker-kraft",
    fullName: "Tucker Kraft",
    firstName: "Tucker",
    lastName: "Kraft",
    team: "GB",
    position: "TE"
  },
  {
    id: "dalton-kincaid",
    fullName: "Dalton Kincaid",
    firstName: "Dalton",
    lastName: "Kincaid",
    team: "BUF",
    position: "TE"
  },
  {
    id: "brandon-aubrey",
    fullName: "Brandon Aubrey",
    firstName: "Brandon",
    lastName: "Aubrey",
    team: "DAL",
    position: "K"
  },
  {
    id: "jake-bates",
    fullName: "Jake Bates",
    firstName: "Jake",
    lastName: "Bates",
    team: "DET",
    position: "K"
  },
  {
    id: "harrison-butker",
    fullName: "Harrison Butker",
    firstName: "Harrison",
    lastName: "Butker",
    team: "KC",
    position: "K"
  },
  {
    id: "cameron-dicker",
    fullName: "Cameron Dicker",
    firstName: "Cameron",
    lastName: "Dicker",
    team: "LAC",
    position: "K"
  },
  {
    id: "ka-imi-fairbairn",
    fullName: "Ka'imi Fairbairn",
    firstName: "Ka'imi",
    lastName: "Fairbairn",
    team: "HOU",
    position: "K",
    aliases: ["Kaimi Fairbairn"]
  }
];
