#!/usr/bin/env node

const [, , url, ...players] = process.argv;

if (!url || players.length === 0) {
  console.error("Usage: node scripts/audit-competitor-patterns.mjs <url> <player name> [player name...]");
  process.exit(1);
}

const response = await fetch(url, {
  headers: {
    "User-Agent": "fantasy-football-name-generator-pattern-audit/0.1"
  }
});

if (!response.ok) {
  throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
}

const html = await response.text();
const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

function countOccurrences(haystack, needle) {
  const escapedNeedle = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return haystack.match(new RegExp(escapedNeedle, "gi"))?.length ?? 0;
}

function detectPatterns(pageText) {
  const checks = [
    ["movie title replacement", /\b(movie|film|cinema|title)\b/i],
    ["song title replacement", /\b(song|album|lyrics|music|band)\b/i],
    ["tv title replacement", /\b(tv|show|series|sitcom)\b/i],
    ["brand or slogan replacement", /\b(brand|slogan|commercial|ad)\b/i],
    ["food phrase replacement", /\b(food|restaurant|candy|snack)\b/i],
    ["explicit/adult bucket", /\b(explicit|dirty|adult|inappropriate)\b/i]
  ];

  return checks.flatMap(([label, pattern]) => (pattern.test(pageText) ? [label] : []));
}

const audit = {
  competitorUrl: url,
  auditedAt: new Date().toISOString(),
  players: players.map((player) => ({
    player,
    mentionCount: countOccurrences(text, player)
  })),
  categoryPatternsObserved: detectPatterns(text),
  note:
    "This audit intentionally records counts and broad pattern categories only. Do not store or import exact competitor team names."
};

console.log(JSON.stringify(audit, null, 2));
