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
});
