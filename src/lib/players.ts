import type { Player } from "../data/players";

export function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function searchPlayers(players: Player[], query: string, limit = 6): Player[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return [];
  }

  return players
    .map((player) => ({
      player,
      score: scorePlayer(player, normalizedQuery)
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.player.fullName.localeCompare(b.player.fullName))
    .slice(0, limit)
    .map((result) => result.player);
}

function scorePlayer(player: Player, normalizedQuery: string): number {
  const searchableValues = [
    player.fullName,
    player.firstName,
    player.lastName,
    player.team,
    player.position,
    ...(player.aliases ?? [])
  ].map(normalizeSearchText);

  let bestScore = 0;

  for (const value of searchableValues) {
    if (value === normalizedQuery) {
      bestScore = Math.max(bestScore, 100);
    } else if (value.startsWith(normalizedQuery)) {
      bestScore = Math.max(bestScore, 80);
    } else if (value.includes(normalizedQuery)) {
      bestScore = Math.max(bestScore, 55);
    }
  }

  return bestScore;
}
