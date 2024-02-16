import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [enteredPlayedName, setEnteredPlayerName] = useState(null);

  const handleClick = () => {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = ""; // Clear Input
  };

  return (
    <section id="player">
      <h2>
        Welcome {enteredPlayedName ? enteredPlayedName : "unknown entity"}
      </h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
