import { useEffect } from "react";
import { useState } from "react";
import Die from "./components/Die";
import Confetti from "react-confetti";
import ConfettiExplosion from "react-confetti-explosion";

function App() {
  const [dice, setDice] = useState(randomNumberArray());

  const [Tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);
    const firstValue = dice[0].value;
    const allValue = dice.every((die) => firstValue === die.value);
    if (allHeld && allValue) {
      setTenzies(true);
    }
  }, [dice]);

  function randomNumberArray() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(randomNumber(i));
    }
    return newArray;
  }

  function randomNumber(id) {
    return {
      value: Math.floor(Math.random() * 10) + 1,
      isHeld: false,
      id: id,
    };
  }

  function rollDice() {
    if (!Tenzies) {
      setDice((preDice) =>
        preDice.map((die) => {
          return die.isHeld ? die : randomNumber(die.id);
        })
      );
    } else {
      setTenzies(false);
      setDice(randomNumberArray());
    }
  }

  function holdDice(id) {
    setDice((preDice) =>
      preDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const dieElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  return (
    <>
      <main>
        {Tenzies && <Confetti className="confetti"/>}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll untill all dice are the same. Click each dieto freeze it at its
          current value between rools.
        </p>
        {Tenzies && <ConfettiExplosion />}

        <div className="dice-container">{dieElements}</div>

        <button className="roll-dice" onClick={rollDice}>
          {Tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  );
}

export default App;
