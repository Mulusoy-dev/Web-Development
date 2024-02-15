import { useState } from "react";

export default function Player() {
  const [enteredPlayedName, setEnteredPlayerName] = useState("");

  const handleChange = (e) => {
    setEnteredPlayerName(e.target.value);
  };

  console.log(enteredPlayedName);

  return (
    <section id="player">
      <h2>"Welcome unknown entity"</h2>
      <p>
        <input type="text" onChange={handleChange} />
        <button>Set Name</button>
      </p>
    </section>
  );
}
