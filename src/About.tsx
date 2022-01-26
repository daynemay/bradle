import { Clue } from "./clue";
import { Row, RowState } from "./Row";
import { maxGuesses } from "./util";

export function About() {
  return (
    <div className="App-about">
      <p>
        <i>Bradlē</i> is a remake of the word game{" "}
        <a href="https://www.powerlanguage.co.uk/wordle/">
          <i>Wordle</i>
        </a>{" "}
        by <a href="https://twitter.com/powerlanguish">powerlanguage</a>. It was forked from <a href="https://github.com/lynn/hello-wordl">hello wordl</a>.
      </p>
      <p>
        You get {maxGuesses} tries to guess a target word.
        <br />
        After each guess, you get Mastermind-style feedback.
      </p>
      <hr />
      <Row
        rowState={RowState.LockedIn}
        wordLength={5}
        cluedLetters={[
          { clue: Clue.Absent, letter: "h" },
          { clue: Clue.Absent, letter: "u" },
          { clue: Clue.Absent, letter: "m" },
          { clue: Clue.Absent, letter: "a" },
          { clue: Clue.Absent, letter: "n" },
        ]}
      />
      <p>
        <b>H</b>, <b>U</b>, <b>M</b>, <b>A</b>, and <b>N</b> aren't in the target word at all.
      </p>
      <hr/>
      <Row
        rowState={RowState.LockedIn}
        wordLength={5}
        cluedLetters={[
          { clue: Clue.Absent, letter: "w" },
          { clue: Clue.Correct, letter: "o" },
          { clue: Clue.Elsewhere, letter: "r" },
          { clue: Clue.Absent, letter: "s" },
          { clue: Clue.Correct, letter: "t" },
        ]}
        />

      <p>
        <b className="green-bg">O</b> and <b className="green-bg">T</b> are correct!<br/>
        The second letter is {" "} <b className="green-bg">O</b> and the fifth letter is {" "} <b className="green-bg">T</b>.
        <br />
        <strong>(There may still be a second O in the word.)</strong>
      </p>
      <p>
        <b className="yellow-bg">R</b> occurs <em>elsewhere</em> in the target
        word.
        <br />
        <strong>(Perhaps more than once. 🤔)</strong>
      </p>
      <hr />
      <p>
        Let's move the <b>R</b> and guess a couple of new letters:
      </p>
      <Row
        rowState={RowState.LockedIn}
        wordLength={5}
        cluedLetters={[
          { clue: Clue.Correct, letter: "r" },
          { clue: Clue.Correct, letter: "o" },
          { clue: Clue.Correct, letter: "b" },
          { clue: Clue.Correct, letter: "o" },
          { clue: Clue.Correct, letter: "t" },
        ]}
        annotation={"Got it!"}
      />
      <p>
        Report issues{" "}
        <a href="https://github.com/daynemay/bradle/issues">here</a>, and thanks {" "}
        <a href="https://twitter.com/chordbug">@chordbug</a>!
      </p>
      <p>
        This game will be free and ad-free forever, or as long as it exists.
        <br />
        <em>I</em> don't deserve it but I'm
        sure <a href="https://twitter.com/chordbug">@chordbug</a> would <a href="https://ko-fi.com/chordbug">love a coffee</a>.
      </p>
    </div>
  );
}
