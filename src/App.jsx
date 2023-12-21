import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import pitch from "./assets/pitch.png";
import "./App.css";
import Barchart from "./Components/barchart";
import Chart from "./Components/chart";
import { readCsv } from "./Components/dataLoader";
import { loadData, rawData, playerNames } from "./Components/fifaData";
import Pitch from "./Components/Pitch";
import { attribute, countryClub } from "./Components/fifaData";
import { signal } from "@preact/signals-react";
import { Map } from "./Components/worldMap";

export const count = signal(0);
setInterval(() => count.value++, 1000);

const attributes = [
  "ball_control",
  "dribbling",
  "slide_tackle",
  "stand_tackle",
  "aggression",
  "reactions",
  "att_position",
  "interceptions",
  "vision",
  "composure",
  "crossing",
  "short_pass",
  "long_pass",
  "acceleration",
  "stamina",
  "strength",
  "balance",
  "sprint_speed",
  "agility",
  "jumping",
  "heading",
  "shot_power",
  "finishing",
  "long_shots",
  "curve",
  "fk_acc",
  "penalties",
  "volleys",
  "gk_positioning",
  "gk_diving",
  "gk_handling",
  "gk_kicking",
  "gk_reflexes",
  "value",
];
const App = () => {
  const [data, setData] = useState([]);
  const [attr, setAttribute] = useState("ball_control");
  const [isCountry, setIsCountry] = useState(true);
  const load = () => {
    loadData().then(setData);
  };
  const setCountry = () => {
    countryClub.value = !countryClub.value;
    load();
  };
  useEffect(() => {
    attribute.value = attr;
    load();
  }, [attr]);
  return (
    <>
      {/* <Barchart data={rawData.value.height} dataKey="height" />
      <Chart data={rawData.value.height} dataKey="height" />
      <Map /> */}
      <h1></h1>
      <h1></h1>
      <h1></h1>
      <div class="parent">
        <div class="div1">
          {" "}
          <Pitch attribute={attr} />
        </div>
        <div class="div2">
          {" "}
          <Barchart data={rawData.value.height} dataKey="height" />
        </div>
        <div class="div3">
          {" "}
          <Chart data={rawData.value.height} dataKey="height" />
        </div>
        <div class="div4">
          {" "}
          <Map />
        </div>
      </div>

      {/* <Pitch attribute={attr} /> */}
      <select
        onChange={(e) => setAttribute(e.target.value)}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {attributes.map((attribute) => (
          <option value={attribute}>{attribute}</option>
        ))}
      </select>
      <button onClick={setCountry}>
        Display {countryClub.value ? "Club" : "Country"} Teammates
      </button>
    </>
  );
};

export default App;
