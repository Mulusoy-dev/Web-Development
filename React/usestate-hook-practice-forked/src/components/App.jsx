import React, { useState } from "react";

function App() {
  const now = new Date().toLocaleTimeString();
  const [currentTime, setTime] = useState(now); // Initial state

  function update() {
    setTime(new Date().toLocaleTimeString());
  }

  function secondUpdate() {
    setInterval(update, 1000);
  }

  return (
    <div className="container">
      <h1>{currentTime}</h1>
      <button onClick={secondUpdate}>Get Time</button>
    </div>
  );
}

export default App;
