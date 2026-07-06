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
});
