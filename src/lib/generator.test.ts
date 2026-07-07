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
