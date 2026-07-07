import { describe, expect, it } from "vitest";
import { activePlayers } from "../data/players";
import { generateNames, isAllowedForMode, isCleanSafeName } from "./generator";

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
