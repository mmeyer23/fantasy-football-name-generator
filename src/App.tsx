import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Copy, ImagePlus, Sparkles, Trash2 } from "lucide-react";
import { activePlayers, type Player } from "./data/players";
import { generateNames, type ContentMode } from "./lib/generator";
import { searchPlayers } from "./lib/players";

export function App() {
  const [playerQuery, setPlayerQuery] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([
    activePlayers.find((player) => player.id === "ceedee-lamb")!,
    activePlayers.find((player) => player.id === "kyle-pitts")!
  ]);
  const [keywordInput, setKeywordInput] = useState("Game of Thrones, 49ers");
  const [contentMode, setContentMode] = useState<ContentMode>("clean");
  const [playerFeedback, setPlayerFeedback] = useState("");

  const suggestions = useMemo(() => {
    const selectedIds = new Set(selectedPlayers.map((player) => player.id));
    return searchPlayers(activePlayers, playerQuery).filter((player) => !selectedIds.has(player.id));
  }, [playerQuery, selectedPlayers]);

  const keywords = useMemo(
    () =>
      keywordInput
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    [keywordInput]
  );

  const generatedNames = useMemo(
    () => generateNames(selectedPlayers, keywords, contentMode),
    [contentMode, keywords, selectedPlayers]
  );
  const validatedPunCount = generatedNames.filter((generatedName) => generatedName.isValidatedPun).length;

  function addPlayer(player: Player) {
    if (selectedPlayers.some((selectedPlayer) => selectedPlayer.id === player.id)) {
      setPlayerFeedback(`${player.fullName} is already on your roster.`);
      return;
    }

    setSelectedPlayers((currentPlayers) => [...currentPlayers, player]);
    setPlayerQuery("");
    setPlayerFeedback(`${player.fullName} added.`);
  }

  function removePlayer(playerId: string) {
    setSelectedPlayers((currentPlayers) => currentPlayers.filter((player) => player.id !== playerId));
    setPlayerFeedback("");
  }

  function handlePlayerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = playerQuery.trim();

    if (!trimmedQuery) {
      setPlayerFeedback("Enter a player name to add.");
      return;
    }

    const [firstMatch] = searchPlayers(activePlayers, trimmedQuery, 1);
    const [firstSuggestion] = suggestions;

    if (firstMatch && selectedPlayers.some((player) => player.id === firstMatch.id)) {
      setPlayerFeedback(`${firstMatch.fullName} is already on your roster.`);
      return;
    }

    if (firstSuggestion) {
      addPlayer(firstSuggestion);
      return;
    }

    setPlayerFeedback("No matching active player found.");
  }

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeywordInput(event.target.value);
  }

  return (
    <main className="app-shell">
      <section className="workspace" aria-labelledby="app-title">
        <div className="workspace-header">
          <div>
            <p className="eyebrow">Fantasy Football Name Generator</p>
            <h1 id="app-title">Build a roster joke that lands.</h1>
          </div>
          <div className="field-mark" aria-hidden="true">
            <span>50</span>
          </div>
        </div>

        <div className="tool-grid">
          <section className="panel input-panel" aria-label="Roster and keywords">
            <div className="panel-heading">
              <h2>Roster Inputs</h2>
              <button className="icon-button" type="button" title="Screenshot upload coming soon">
                <ImagePlus size={18} />
              </button>
            </div>

            <form className="player-search" onSubmit={handlePlayerSubmit}>
              <label htmlFor="player-search">Player names</label>
              <div className="search-row">
                <input
                  id="player-search"
                  value={playerQuery}
                  onChange={(event) => setPlayerQuery(event.target.value)}
                  placeholder="Try CeeDee, Pitts, Mahomes..."
                  autoComplete="off"
                />
                <button type="submit">Add</button>
              </div>
              {suggestions.length > 0 && (
                <div className="suggestions" role="listbox" aria-label="Player suggestions">
                  {suggestions.map((player) => (
                    <button key={player.id} type="button" onClick={() => addPlayer(player)}>
                      <span>{player.fullName}</span>
                      <small>
                        {player.team} · {player.position}
                      </small>
                    </button>
                  ))}
                </div>
              )}
              {playerFeedback && (
                <p className="field-feedback" aria-live="polite">
                  {playerFeedback}
                </p>
              )}
            </form>

            <div className="chip-list" aria-label="Selected players">
              {selectedPlayers.map((player) => (
                <span className="chip" key={player.id}>
                  {player.fullName}
                  <button type="button" onClick={() => removePlayer(player.id)} aria-label={`Remove ${player.fullName}`}>
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>

            <label className="keyword-field" htmlFor="keywords">
              Keywords
              <input id="keywords" value={keywordInput} onChange={handleKeywordChange} placeholder="Marvel, PNW, losers" />
            </label>

            <fieldset className="mode-toggle">
              <legend>Content mode</legend>
              <label>
                <input
                  type="radio"
                  name="content-mode"
                  value="clean"
                  checked={contentMode === "clean"}
                  onChange={() => setContentMode("clean")}
                />
                Clean
              </label>
              <label>
                <input
                  type="radio"
                  name="content-mode"
                  value="explicit"
                  checked={contentMode === "explicit"}
                  onChange={() => setContentMode("explicit")}
                />
                Explicit
              </label>
            </fieldset>
          </section>

          <section className="panel results-panel" aria-label="Generated names">
            <div className="panel-heading">
              <h2>Name Ideas</h2>
              <div className="results-summary">
                <span>{validatedPunCount} validated puns</span>
                <Sparkles size={20} aria-hidden="true" />
              </div>
            </div>

            <div className="results-list">
              {generatedNames.map((generatedName) => (
                <article className="result-card" key={generatedName.name}>
                  <div>
                    <h3>{generatedName.name}</h3>
                    <p>{generatedName.reason}</p>
                    <span>
                      Source: {generatedName.source} · {generatedName.mode}
                      {generatedName.keyword ? ` · Keyword: ${generatedName.keyword}` : ""}
                    </span>
                  </div>
                  <button
                    className="icon-button"
                    type="button"
                    title={`Copy ${generatedName.name}`}
                    onClick={() => void navigator.clipboard?.writeText(generatedName.name)}
                  >
                    <Copy size={18} />
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
