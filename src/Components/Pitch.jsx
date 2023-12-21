import React from "react";
import { makeBest442Team, dreamTeam, attribute, countryClub } from "./fifaData";
import { computed } from "@preact/signals-core";
import { useSignal, signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { useEffect } from "react";

const colourMap = {
  "#d53e4f": "white",
  "#f46d43": "black",
  "#fdae61": "black",
  "#fee08b": "black",
  "#ffffbf": "black",
  "#e6f598": "black",
  "#abdda4": "black",
  "#66c2a5": "black",
  "#3288bd": "white",
  "#5e4fa2": "white",
  "#9e0142": "white",
};

function prettyString(str) {
  function toPascalCase(str) {
    if (/^[a-z\d]+$/i.test(str)) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str
      .replace(
        /([a-z\d])([a-z\d]*)/gi,
        (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
      )
      .replace(/[^a-z\d]/gi, "");
  }

  return str.replace("_", " ").split(" ").map(toPascalCase).join(" ");
}
export const getColourBasedOnTeam = () => {
  const players = [
    dreamTeam.value.goalKeeper,
    ...dreamTeam.value.defenders,
    ...dreamTeam.value.midfielders,
    ...dreamTeam.value.attackers,
  ];

  const colours = [
    "#d53e4f",
    "#f46d43",
    "#fdae61",
    "#fee08b",
    "#ffffbf",
    "#e6f598",
    "#abdda4",
    "#66c2a5",
    "#3288bd",
    "#5e4fa2",
    "#9e0142",
  ];
  const teamColors = {};
  players.forEach((player) => {
    console.log(player?.club ?? "no club");
    if (!teamColors[player?.club ?? "no club"]) {
      teamColors[player?.club ?? "no club"] = colours[0];
      colours.shift();
    }
  });
  return teamColors;
};

export const getTeamColour = (club) => {
  console.log(club + "club");
  const colours = getColourBasedOnTeam();
  if (colours[club] != null) return colours[club];
  else return "red";
};

export const getColourBasedOnCountry = () => {
  const players = [
    dreamTeam.value.goalKeeper,
    ...dreamTeam.value.defenders,
    ...dreamTeam.value.midfielders,
    ...dreamTeam.value.attackers,
  ];

  const colours = [
    "#d53e4f",
    "#f46d43",
    "#fdae61",
    "#fee08b",
    "#ffffbf",
    "#e6f598",
    "#abdda4",
    "#66c2a5",
    "#3288bd",
    "#5e4fa2",
    "#9e0142",
  ];

  const teamColors = {};
  players.forEach((player) => {
    if (!teamColors[player?.country ?? "no country"]) {
      teamColors[player?.country ?? "no country"] = colours[0];
      colours.shift();
    }
  });
  return teamColors;
};

export const getCountryColour = (country) => {
  const colours = getColourBasedOnCountry();
  if (colours[country] != null) return colours[country];
  else return "red";
};

const Player = ({ player, x, y, minValue, maxValue }) => {
  const minSize = 2;
  const maxSize = 5;
  const valueToSize = (value) =>
    ((value - minValue) / (maxValue - minValue)) * (maxSize - minSize) +
    minSize;
  const size = valueToSize(player?.[attribute.value] ?? 0);

  const countryClubBool = countryClub.value;
  var colour = "red";
  if (countryClubBool) colour = getCountryColour(player?.country);
  else colour = getTeamColour(player?.club);
  console.log(player, size);
  useEffect(() => {
    console.log(countryClub.value);
  }, [countryClub.value]);
  return (
    <div
      title={attribute.value + ": " + player?.[attribute.value]}
      style={{
        position: "absolute",
        top: `${y}%`,
        left: `${x}%`,
        transform: "translate(-50%, -50%)",
        borderRadius: `50%`,
        backgroundColor: `${colour}`,
        color: colourMap[colour],
        whiteSpace: "wrap",
        fontSize: "0.75rem",
        fontWeight: "bold",
        aspectRatio: "1/1",
        boxShadow: "0.05rem 0.05rem 0.125rem 0.125rem rgba(0, 0, 0, 0.25)",
        width: `${size}rem`,
        height: `${size}rem`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.25rem",
      }}
    >
      <div>{player?.player.split(" ")[0]}</div>
      <div>{player?.player.split(" ").slice(1).join(" ")}</div>
    </div>
  );
};

const Pitch = ({}) => {
  const players = [
    dreamTeam.value.goalKeeper,
    ...dreamTeam.value.defenders,
    ...dreamTeam.value.midfielders,
    ...dreamTeam.value.attackers,
  ];
  const minValue = Math.min(...players.map((x) => x?.[attribute.value] ?? 1));
  const maxValue = Math.max(...players.map((x) => x?.[attribute.value] ?? 1));
  console.log(minValue, maxValue);
  console.log(minValue, maxValue);
  return (
    <div style={{ position: "relative" }}>
      <img
        src={"src/assets/pitch.png"}
        alt="Pitch"
        style={{ width: "100%", height: "auto" }}
      />
      <Player
        player={dreamTeam.value.goalKeeper}
        x={12.5}
        y={50}
        minValue={minValue}
        maxValue={maxValue}
      />
      <Player
        player={dreamTeam.value.defenders?.[0]}
        x={27.5}
        y={40}
        minValue={minValue}
        maxValue={maxValue}
      />
      <Player
        player={dreamTeam.value.defenders?.[1]}
        x={27.5}
        y={60}
        minValue={minValue}
        maxValue={maxValue}
      />
      <Player
        player={dreamTeam.value.defenders?.[2]}
        x={27.5}
        y={20}
        minValue={minValue}
        maxValue={maxValue}
      />
      <Player
        player={dreamTeam.value.defenders?.[3]}
        x={27.5}
        y={80}
        minValue={minValue}
        maxValue={maxValue}
      />
      <Player
        player={dreamTeam.value.midfielders?.[0]}
        x={50}
        y={20}
        minValue={minValue}
        maxValue={maxValue}
      />
      <Player
        player={dreamTeam.value.midfielders?.[1]}
        x={50}
        y={80}
        minValue={minValue}
        maxValue={maxValue}
      />
      <Player
        player={dreamTeam.value.midfielders?.[2]}
        x={50}
        y={40}
        minValue={minValue}
        maxValue={maxValue}
      />
      <Player
        player={dreamTeam.value.midfielders?.[3]}
        x={50}
        y={60}
        minValue={minValue}
        maxValue={maxValue}
      />
      <Player
        player={dreamTeam.value.attackers?.[0]}
        x={74}
        y={40}
        minValue={minValue}
        maxValue={maxValue}
      />
      <Player
        player={dreamTeam.value.attackers?.[1]}
        x={74}
        y={60}
        minValue={minValue}
        maxValue={maxValue}
      />
      <span
        style={{
          position: "absolute",
          top: 30,
          right: "6%",
          margin: 0,
          padding: 0,
          fontSize: "20px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        Highest {prettyString(attribute.value)} Team!
      </span>
    </div>
  );
};

export default Pitch;
