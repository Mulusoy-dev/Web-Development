import React, { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello");

  function handleClick() {
    setHeadingText("Submitted");
  }

  const handleMouseEnter = (event) => {
    event.target.style.backgroundColor = "black";
  };

  const handleMouseLeave = (event) => {
    event.target.style.backgroundColor = "";
  };

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
