import { describe, expect, it } from "vitest";
import { activePlayers } from "../data/players";
import { generateNames, getPlayerPunAtoms, isAllowedForMode, isCleanSafeName } from "./generator";

describe("generateNames", () => {
  it("filters explicit names out of clean mode", () => {
    const ceedee = activePlayers.find((player) => player.id === "ceedee-lamb")!;

    const cleanNames = generateNames([ceedee], [], "clean").map((result) => result.name);

    expect(cleanNames).toContain("Silence of the Lamb");
    expect(cleanNames).not.toContain("CeeDeez Nuts");
  });

  it("includes explicit names in explicit mode", () => {
    const ceedee = activePlayers.find((player) => player.id === "ceedee-lamb")!;

    const explicitNames = generateNames([ceedee], [], "explicit").map((result) => result.name);

    expect(explicitNames).toContain("CeeDeez Nuts");
  });

  it("keeps adult keyword humor out of clean mode", () => {
    const cleanNames = generateNames([], ["losers"], "clean").map((result) => result.name);
    const explicitNames = generateNames([], ["losers"], "explicit").map((result) => result.name);

    expect(cleanNames).not.toContain("Sacks and the City");
    expect(explicitNames).toContain("Sacks and the City");
  });

  it("blocks adult terms in clean mode even if a result is mistagged", () => {
    expect(isCleanSafeName("CeeDeez Nuts")).toBe(false);
    expect(
      isAllowedForMode(
        {
          name: "CeeDeez Nuts",
          source: "CeeDee Lamb",
          mode: "clean",
          reason: "This should still fail the clean safety gate."
        },
        "clean"
      )
    ).toBe(false);
  });

  it("uses matching keyword templates", () => {
    const names = generateNames([], ["Game of Thrones"], "clean").map((result) => result.name);

    expect(names).toContain("Game of Throws");
  });

  it("returns a deep suggestion set for normal roster and keyword inputs", () => {
    const ceedee = activePlayers.find((player) => player.id === "ceedee-lamb")!;
    const pitts = activePlayers.find((player) => player.id === "kyle-pitts")!;

    const names = generateNames([ceedee, pitts], ["Game of Thrones", "49ers"], "clean");
    const nameText = names.map((result) => result.name);

    expect(names.length).toBeGreaterThanOrEqual(25);
    expect(names.length).toBeLessThanOrEqual(50);
    expect(nameText).toContain("The Lamb King");
    expect(nameText).toContain("Pitts and Giggles");
  });

  it("rejects weak movie substitutions that do not make a real pun", () => {
    const ceedee = activePlayers.find((player) => player.id === "ceedee-lamb")!;

    const names = generateNames([ceedee], [], "clean").map((result) => result.name);

    expect(names).not.toContain("The Fast and the Lamb");
    expect(names).not.toContain("Lamb Fiction");
  });

  it("adds sensible theme containers for arbitrary custom keywords", () => {
    const names = generateNames([], ["pizza"], "clean").map((result) => result.name);

    expect(names).toContain("Pizza League");
    expect(names).toContain("Pizza Playbook");
    expect(names).not.toContain("Pizza and Chill");
    expect(names).not.toContain("Straight Outta Pizza");
    expect(names).not.toContain("Pizza Things");
  });

  it("uses player pun profiles for high-confidence soundalike names", () => {
    const gibbs = activePlayers.find((player) => player.id === "jahmyr-gibbs")!;
    const maye = activePlayers.find((player) => player.id === "drake-maye")!;
    const mcconkey = activePlayers.find((player) => player.id === "ladd-mcconkey")!;

    const names = generateNames([gibbs, maye, mcconkey], [], "clean").map((result) => result.name);

    expect(names).toContain("Baby Back Gibbs");
    expect(names).toContain("Mayehem");
    expect(names).toContain("McConkey Kong");
    expect(names).toContain("Pin the Tail on the McConkey");
    expect(names).toContain("McConkey Kong Country");
    expect(names).toContain("McConkey Tonk Blues");
    expect(names).toContain("Laddiator");
  });

  it("creates first-name and last-name pun atoms for every active player", () => {
    for (const player of activePlayers) {
      const atoms = getPlayerPunAtoms(player);

      expect(atoms).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ part: "first", replacement: player.firstName }),
          expect.objectContaining({ part: "last", replacement: player.lastName })
        ])
      );
    }
  });

  it("adds curated Ladd McConkey atoms for reference-phrase matching", () => {
    const mcconkey = activePlayers.find((player) => player.id === "ladd-mcconkey")!;
    const atoms = getPlayerPunAtoms(mcconkey);
    const sounds = atoms.flatMap((atom) => atom.soundsLike);
    const hooks = atoms.flatMap((atom) => atom.phraseHooks);

    expect(sounds).toEqual(expect.arrayContaining(["lad", "gladiator", "monkey", "donkey", "honky", "key"]));
    expect(hooks).toEqual(
      expect.arrayContaining(["Pin the Tail on the Donkey", "Donkey Kong Country", "Honky Tonk Blues", "Gladiator"])
    );
  });

  it("generates names from reference phrases matched to player pun atoms", () => {
    const mccaffrey = activePlayers.find((player) => player.id === "christian-mccaffrey")!;
    const bijan = activePlayers.find((player) => player.id === "bijan-robinson")!;

    const names = generateNames([mccaffrey, bijan], [], "clean").map((result) => result.name);

    expect(names).toContain("I Think I Pulled McCaff");
    expect(names).toContain("Bed, Bath, and Bijan");
  });

  it("uses soundalike and association atoms instead of hard-coded final names", () => {
    const players = [
      "breece-hall",
      "ceedee-lamb",
      "jahmyr-gibbs",
      "justin-jefferson",
      "kyren-williams"
    ].map((id) => activePlayers.find((player) => player.id === id)!);

    const names = generateNames(players, [], "clean").map((result) => result.name);

    expect(names).toEqual(
      expect.arrayContaining([
        "Breece's Pieces",
        "CeeDeeCee Guidelines",
        "The Man in the Jahmyrror",
        "We Built This Griddy",
        "For Kyren Out Loud"
      ])
    );
  });

  it("generates a deep set from phrase families for a single player", () => {
    const breece = activePlayers.find((player) => player.id === "breece-hall")!;

    const names = generateNames([breece], [], "clean").map((result) => result.name);

    expect(names.length).toBeGreaterThanOrEqual(18);
    expect(names).toEqual(
      expect.arrayContaining([
        "Breece's Pieces",
        "Breece's Cups",
        "Breece Lightning",
        "Breece Is the Word",
        "Easy Breecey",
        "Breece Mode",
        "Breece Hall of Fame",
        "Breece Hall Pass",
        "Breece Hall Monitor",
        "Hall or Nothing",
        "Against Hall Odds",
        "Hall the Small Things"
      ])
    );
  });

  it("generates a deep Achane set from reusable sound families", () => {
    const achane = activePlayers.find((player) => player.id === "de-von-achane")!;

    const names = generateNames([achane], [], "clean").map((result) => result.name);

    expect(names.length).toBeGreaterThanOrEqual(12);
    expect(names).toEqual(
      expect.arrayContaining([
        "Achane in the Membrane",
        "Crazy Rich Achanes",
        "Achane Reaction",
        "Django Achaned",
        "De'Von Intervention",
        "Alice in Achanes",
        "Achane Has Left the Station",
        "Rage Against the Achane"
      ])
    );
  });

  it("keeps rich phrase-family coverage across covered fantasy stars", () => {
    const coveredStarIds = [
      "amon-ra-st-brown",
      "breece-hall",
      "bijan-robinson",
      "ceedee-lamb",
      "christian-mccaffrey",
      "de-von-achane",
      "james-cook",
      "jahmyr-gibbs",
      "justin-jefferson",
      "kyren-williams",
      "ladd-mcconkey",
      "malik-nabers",
      "puka-nacua",
      "saquon-barkley",
      "derrick-henry",
      "travis-kelce",
      "tyreek-hill"
    ];

    const underCoveredPlayers = coveredStarIds.flatMap((playerId) => {
      const player = activePlayers.find((candidate) => candidate.id === playerId)!;
      const names = generateNames([player], [], "clean");

      return names.length >= 24 ? [] : [`${player.fullName}: ${names.length}`];
    });

    expect(underCoveredPlayers).toEqual([]);
  });

  it("generates supplemental ideas for stars beyond cached phrase hits", () => {
    const kelce = activePlayers.find((player) => player.id === "travis-kelce")!;
    const henry = activePlayers.find((player) => player.id === "derrick-henry")!;

    const kelceNames = generateNames([kelce], [], "clean").map((result) => result.name);
    const henryNames = generateNames([henry], [], "clean").map((result) => result.name);

    expect(kelceNames.length).toBeGreaterThanOrEqual(24);
    expect(henryNames.length).toBeGreaterThanOrEqual(24);
    expect(kelceNames).toEqual(
      expect.arrayContaining(["Kelce Kingdom", "Kelce Mismatch", "TK Takeover", "Travis's Seam Team"])
    );
    expect(henryNames).toEqual(
      expect.arrayContaining(["Henry Havoc", "Henry Ground Game", "DH Takeover", "King Henry Mode"])
    );
  });

  it("does not add broad waiver-wire filler to every skill player", () => {
    const breece = activePlayers.find((player) => player.id === "breece-hall")!;
    const ceedee = activePlayers.find((player) => player.id === "ceedee-lamb")!;

    const names = generateNames([breece, ceedee], [], "clean").map((result) => result.name);

    expect(names).not.toContain("Hall on the Waiver Wire");
    expect(names).not.toContain("Lamb on the Waiver Wire");
    expect(names).not.toContain("Breece Zone");
    expect(names).not.toContain("CeeDee's Route 66");
  });

  it("uses shared reference phrases for players without custom pun profiles", () => {
    const players = [
      "jordan-love",
      "james-cook",
      "zay-flowers",
      "drake-london",
      "xavier-worthy",
      "rashee-rice",
      "a-j-brown",
      "ja-marr-chase",
      "d-andre-swift",
      "breece-hall",
      "baker-mayfield",
      "travis-hunter"
    ].map((id) => activePlayers.find((player) => player.id === id)!);

    const names = generateNames(players, [], "clean").map((result) => result.name);

    expect(names).toEqual(
      expect.arrayContaining([
        "Love Actually",
        "Too Many Cooks",
        "I Can Buy Myself Flowers",
        "London Calling",
        "We're Not Worthy",
        "Rice Krispies",
        "Brown Eyed Squad",
        "Cut to the Chase",
        "Taylor Swift",
        "Hall of Fame",
        "Baker's Dozen",
        "Hunter x Hunter"
      ])
    );
  });

  it("combines selected players with arbitrary custom keywords using safe theme formats", () => {
    const ceedee = activePlayers.find((player) => player.id === "ceedee-lamb")!;

    const results = generateNames([ceedee], ["pizza"], "clean");
    const themedResult = results.find((result) => result.name === "Lamb's Pizza Club");

    expect(themedResult).toMatchObject({
      source: "CeeDee Lamb + Pizza",
      keyword: "Pizza"
    });
  });

  it("combines selected players with recognized keyword themes", () => {
    const ceedee = activePlayers.find((player) => player.id === "ceedee-lamb")!;

    const results = generateNames([ceedee], ["Marvel"], "clean");
    const themedResult = results.find((result) => result.name === "Captain Lamb");

    expect(themedResult).toMatchObject({
      source: "CeeDee Lamb + Marvel",
      keyword: "Marvel"
    });
  });

  it("uses keyword aliases for theme-aware generation", () => {
    const pitts = activePlayers.find((player) => player.id === "kyle-pitts")!;

    const names = generateNames([pitts], ["niners"], "clean").map((result) => result.name);

    expect(names).toContain("Gold Rush Pitts");
  });

  it("caps generated names at 50", () => {
    const names = generateNames(activePlayers, ["Game of Thrones", "Marvel", "49ers", "PNW"], "explicit");

    expect(names).toHaveLength(50);
  });
});
