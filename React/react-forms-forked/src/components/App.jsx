import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [headingText, setHeading] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleClick(event) {
    setHeading(name);

    event.preventDefault();
  }

  const handleMouseEnter = (event) => {
    event.target.style.backgroundColor = "black";
  };

  const handleMouseLeave = (event) => {
    event.target.style.backgroundColor = "";
  };

  return (
    <div className="container">
      <h1>Hello {headingText}</h1>
      <form onSubmit={handleClick}>
        <input
          type="text"
          placeholder="What's your name?"
          onChange={handleChange}
          value={name}
        />
        <button
          type="submit"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
