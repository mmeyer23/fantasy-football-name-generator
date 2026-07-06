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
  }
];
