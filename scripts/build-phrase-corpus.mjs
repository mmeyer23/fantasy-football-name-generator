#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const [, , inputPath = "data/phrase-corpus.seed.json", outputPath = "src/data/phraseCorpus.generated.json"] =
  process.argv;

const requiredFields = ["text", "category", "source", "popularityScore", "mode", "targets"];

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeEntry(rawEntry, index) {
  for (const field of requiredFields) {
    if (!(field in rawEntry)) {
      throw new Error(`Entry ${index} is missing required field "${field}".`);
    }
  }

  if (!Array.isArray(rawEntry.targets) || rawEntry.targets.length === 0) {
    throw new Error(`Entry ${index} must include at least one replaceable target.`);
  }

  return {
    id: rawEntry.id ?? slugify(rawEntry.text),
    text: rawEntry.text,
    category: rawEntry.category,
    source: rawEntry.source,
    popularityScore: Number(rawEntry.popularityScore),
    mode: rawEntry.mode,
    targets: rawEntry.targets.map((target, targetIndex) => {
      for (const field of ["replacedWord", "targetSound", "template"]) {
        if (!(field in target)) {
          throw new Error(`Entry ${index} target ${targetIndex} is missing "${field}".`);
        }
      }

      return {
        replacedWord: target.replacedWord,
        targetSound: target.targetSound,
        template: target.template
      };
    })
  };
}

const resolvedInput = resolve(inputPath);
const resolvedOutput = resolve(outputPath);
const seed = JSON.parse(await readFile(resolvedInput, "utf8"));

if (!Array.isArray(seed)) {
  throw new Error("Phrase corpus input must be a JSON array.");
}

const entries = seed.map(normalizeEntry).sort((first, second) => {
  const scoreDelta = second.popularityScore - first.popularityScore;
  return scoreDelta || first.text.localeCompare(second.text);
});

await mkdir(dirname(resolvedOutput), { recursive: true });
await writeFile(resolvedOutput, `${JSON.stringify(entries, null, 2)}\n`);

console.log(`Wrote ${entries.length} phrase corpus entries to ${resolvedOutput}`);
