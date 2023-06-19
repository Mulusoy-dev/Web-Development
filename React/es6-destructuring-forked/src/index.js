// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import cars from "./practice";

const [tesla, honda] = cars;

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{tesla["speedStats"]["topSpeed"]}</td>
      <td>{tesla["coloursByPopularity"][0]}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{honda["speedStats"]["topSpeed"]}</td>
      <td>{honda["coloursByPopularity"][0]}</td>
    </tr>
  </table>,
  document.getElementById("root")
);
