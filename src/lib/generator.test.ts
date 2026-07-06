import { describe, expect, it } from "vitest";
import { activePlayers } from "../data/players";
import { generateNames } from "./generator";

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

  it("uses matching keyword templates", () => {
    const names = generateNames([], ["Game of Thrones"], "clean").map((result) => result.name);

    expect(names).toContain("Game of Throws");
  });

  it("returns a deep suggestion set for normal roster and keyword inputs", () => {
    const ceedee = activePlayers.find((player) => player.id === "ceedee-lamb")!;
    const pitts = activePlayers.find((player) => player.id === "kyle-pitts")!;

    const names = generateNames([ceedee, pitts], ["Game of Thrones", "49ers"], "clean");

    expect(names.length).toBeGreaterThanOrEqual(25);
    expect(names.length).toBeLessThanOrEqual(50);
    expect(names.map((result) => result.name)).toContain("Lamb Fiction");
    expect(names.map((result) => result.name)).toContain("Pitts Fiction");
  });

  it("adds fallback pop-culture keyword ideas for custom keywords", () => {
    const names = generateNames([], ["PNW"], "clean").map((result) => result.name);

    expect(names).toContain("PNW League");
    expect(names).toContain("Straight Outta PNW");
  });

  it("caps generated names at 50", () => {
    const names = generateNames(activePlayers, ["Game of Thrones", "Marvel", "49ers", "PNW"], "explicit");

    expect(names).toHaveLength(50);
  });
});
