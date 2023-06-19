import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0); // Initial state

  // const [red, green, blue] = [41, 128, 185]; // Destructuring Example

  function increase() {
    setCount(count + 1);
  }

  function decrease() {
    setCount(count - 1);
  }

  return (
    <div className="container">
      <h1>{count}</h1>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

export default App;
