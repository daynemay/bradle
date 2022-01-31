import "./App.css";
import { maxGuesses, seed, TargetPool } from "./util";
import Game from "./Game";
import { useEffect, useState } from "react";
import { About } from "./About";

function useSetting<T>(
  key: string,
  initial: T
): [T, (value: T | ((t: T) => T)) => void] {
  const [current, setCurrent] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch (e) {
      return initial;
    }
  });
  const setSetting = (value: T | ((t: T) => T)) => {
    try {
      const v = value instanceof Function ? value(current) : value;
      setCurrent(v);
      window.localStorage.setItem(key, JSON.stringify(v));
    } catch (e) {}
  };
  return [current, setSetting];
}

function App() {
  type Page = "game" | "about" | "settings";
  const [page, setPage] = useState<Page>("game");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [dark, setDark] = useSetting<boolean>("dark", prefersDark);
  const [mode, setMode] = useSetting<number>("mode", 0);
  const [targetPool, setTargetPool] = useSetting<number>("targetPool", 0);

  const changeTargetPool = (pool: TargetPool): void => {
    setTargetPool(pool);
    abandonGame();
  }

  const abandonGame = () => {
    document.location = '?seed=random';
  }

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
    setTimeout(() => {
      // Avoid transition on page load
      document.body.style.transition = "0.3s background-color ease-out";
    }, 1);
  }, [dark]);

  const link = (emoji: string, label: string, page: Page) => (
    <a
      className="emoji-link"
      href="#"
      onClick={() => setPage(page)}
      title={label}
      aria-label={label}
    >
      {emoji}
    </a>
  );

  return (
    <div className="App-container">
      <h1>Bradlē</h1>
      <div className="top-right">
        {page !== "game" ? (
          link("❌", "Close", "game")
        ) : (
          <>
            {link("❓", "About", "about")}
            {link("⚙️", "Settings", "settings")}
          </>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 5,
          top: 5,
          visibility: page === "game" ? "visible" : "hidden",
        }}
      >
        <a
          href="#"
          onClick={() =>
            (document.location = seed
              ? "?"
              : "?seed=" +
                new Date().toISOString().replace(/-/g, "").slice(0, 8))
          }
        >
          {seed ? "random" : "today"}
        </a>
      </div>
      {page === "about" && <About />}
      {page === "settings" && (
        <div className="Settings">
          <div className="Settings-setting">
            <input
              id="dark-setting"
              type="checkbox"
              checked={dark}
              onChange={() => setDark((x: boolean) => !x)}
            />
            <label htmlFor="dark-setting">Dark theme</label>
          </div>

          <div className="Settings-setting">
            <input
              id="mode-setting"
              type="range"
              min="0"
              max="1"
              value={mode}
              onChange={(e) => setMode(+e.target.value)}
            />
            <div className="Settings-description">
              <div>
                <label htmlFor="mode-setting">Mode:</label>
                &nbsp;
                <strong>{["Regular", "Hard"][mode]}</strong>
              </div>
              <div
                style={{
                  fontSize: 14,
                  height: 40,
                  marginLeft: 8,
                  marginTop: 8,
                }}
              >
                {
                  [
                    `Regular mode.`,
                    `Wordle's "Hard Mode".
                    Any revealed hints must be used in subsequent guesses. Green letters must stay fixed, yellow letters must be reused.`,
                  ][mode]
                }
              </div>
            </div>
          </div>

          <div className="Settings-setting">
            <input
              id="target-pool-setting"
              type="range"
              min="0"
              max="1"
              value={targetPool}
              onChange={(e) => changeTargetPool(+e.target.value)}
            />
            <div className="Settings-description">
              <div>
                <label htmlFor="target-pool-setting">Targets:</label>
                &nbsp;
                <strong>{["ROBOT", "ABUSE"][targetPool]}</strong>
              </div>
              <div
                style={{
                  fontSize: 14,
                  height: 40,
                  marginLeft: 8,
                  marginTop: 8,
                }}
              >
                {
                  [
                    `Answers are always the word ROBOT.`,
                    `Answers are... kinda mean.`,
                  ][targetPool]
                }
                <p><em><strong>WARNING!</strong> Changing this setting will <strong>abandon</strong> the current game and start a new one with a random target word.</em></p>

              </div>
            </div>
          </div>
        </div>
      )}
      <Game
        maxGuesses={maxGuesses}
        hidden={page !== "game"}
        targetPool={targetPool}
        mode={mode}
      />
    </div>
  );
}

export default App;
