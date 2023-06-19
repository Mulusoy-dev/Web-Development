import React from "react";
import Login from "./Login";

var isLoggedIn = false;

const currentTime = new Date().getHours();
console.log(currentTime);

function App() {
  return (
    <div className="container">
      {/* {isLoggedIn === true ? <h1>Hello</h1> : <Login />} */}
      {currentTime > 8 && <h1>Why are you still sleeping?</h1>}
    </div>
  );
}

export default App;
