import { describe, expect, it } from "vitest";
import { activePlayers } from "../data/players";
import { searchPlayers } from "./players";

describe("searchPlayers", () => {
  it("finds players by first name", () => {
    const results = searchPlayers(activePlayers, "cee");

    expect(results[0]?.fullName).toBe("CeeDee Lamb");
  });

  it("finds players by alias", () => {
    const results = searchPlayers(activePlayers, "cmc");

    expect(results[0]?.fullName).toBe("Christian McCaffrey");
  });

  it("includes popular players beyond the initial seed list", () => {
    expect(searchPlayers(activePlayers, "jahmyr")[0]?.fullName).toBe("Jahmyr Gibbs");
    expect(searchPlayers(activePlayers, "aaron rodgers")[0]?.fullName).toBe("Aaron Rodgers");
  });

  it("finds common fantasy abbreviations and alternate spellings", () => {
    expect(searchPlayers(activePlayers, "jamar")[0]?.fullName).toBe("Ja'Marr Chase");
    expect(searchPlayers(activePlayers, "mhj")[0]?.fullName).toBe("Marvin Harrison Jr.");
    expect(searchPlayers(activePlayers, "btj")[0]?.fullName).toBe("Brian Thomas Jr.");
  });

  it("has enough player coverage for realistic autocomplete", () => {
    expect(activePlayers.length).toBeGreaterThanOrEqual(90);
  });
});
