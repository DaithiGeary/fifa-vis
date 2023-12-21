import React from "react";
import { rawData, dreamTeam } from "./fifaData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

const Barchart = () => {
  const data = [
    {
      name: dreamTeam.value.goalKeeper?.player ?? "No Player",
      "GK Score": dreamTeam.value.goalKeeper?.gk_score ?? 0,
      "Def Score": dreamTeam.value.goalKeeper?.def_score ?? 0,
      "Mid Score": dreamTeam.value.goalKeeper?.mid_score ?? 0,
      "Att Score": dreamTeam.value.goalKeeper?.att_score ?? 0,
    },
    {
      name: dreamTeam.value.defenders[0]?.player ?? "No Player",
      "GK Score": dreamTeam.value.defenders[0]?.gk_score ?? 0,
      "Def Score": dreamTeam.value.defenders[0]?.def_score ?? 0,
      "Mid Score": dreamTeam.value.defenders[0]?.mid_score ?? 0,
      "Att Score": dreamTeam.value.defenders[0]?.att_score ?? 0,
    },
    {
      name: dreamTeam.value.defenders[1]?.player ?? "No Player",
      "GK Score": dreamTeam.value.defenders[1]?.gk_score ?? 0,
      "Def Score": dreamTeam.value.defenders[1]?.def_score ?? 0,
      "Mid Score": dreamTeam.value.defenders[1]?.mid_score ?? 0,
      "Att Score": dreamTeam.value.defenders[1]?.att_score ?? 0,
    },
    {
      name: dreamTeam.value.defenders[2]?.player ?? "No Player",
      "GK Score": dreamTeam.value.defenders[2]?.gk_score ?? 0,
      "Def Score": dreamTeam.value.defenders[2]?.def_score ?? 0,
      "Mid Score": dreamTeam.value.defenders[2]?.mid_score ?? 0,
      "Att Score": dreamTeam.value.defenders[2]?.att_score ?? 0,
    },
    {
      name: dreamTeam.value.defenders[3]?.player ?? "No Player",
      "GK Score": dreamTeam.value.defenders[3]?.gk_score ?? 0,
      "Def Score": dreamTeam.value.defenders[3]?.def_score ?? 0,
      "Mid Score": dreamTeam.value.defenders[3]?.mid_score ?? 0,
      "Att Score": dreamTeam.value.defenders[3]?.att_score ?? 0,
    },
    {
      name: dreamTeam.value.midfielders[0]?.player ?? "No Player",
      "GK Score": dreamTeam.value.midfielders[0]?.gk_score ?? 0,
      "Def Score": dreamTeam.value.midfielders[0]?.def_score ?? 0,
      "Mid Score": dreamTeam.value.midfielders[0]?.mid_score ?? 0,
      "Att Score": dreamTeam.value.midfielders[0]?.att_score ?? 0,
    },
    {
      name: dreamTeam.value.midfielders[1]?.player ?? "No Player",
      "GK Score": dreamTeam.value.midfielders[1]?.gk_score ?? 0,
      "Def Score": dreamTeam.value.midfielders[1]?.def_score ?? 0,
      "Mid Score": dreamTeam.value.midfielders[1]?.mid_score ?? 0,
      "Att Score": dreamTeam.value.midfielders[1]?.att_score ?? 0,
    },
    {
      name: dreamTeam.value.midfielders[2]?.player ?? "No Player",
      "GK Score": dreamTeam.value.midfielders[2]?.gk_score ?? 0,
      "Def Score": dreamTeam.value.midfielders[2]?.def_score ?? 0,
      "Mid Score": dreamTeam.value.midfielders[2]?.mid_score ?? 0,
      "Att Score": dreamTeam.value.midfielders[2]?.att_score ?? 0,
    },
    {
      name: dreamTeam.value.midfielders[3]?.player ?? "No Player",
      "GK Score": dreamTeam.value.midfielders[3]?.gk_score ?? 0,
      "Def Score": dreamTeam.value.midfielders[3]?.def_score ?? 0,
      "Mid Score": dreamTeam.value.midfielders[3]?.mid_score ?? 0,
      "Att Score": dreamTeam.value.midfielders[3]?.att_score ?? 0,
    },
    {
      name: dreamTeam.value.attackers[0]?.player ?? "No Player",
      "GK Score": dreamTeam.value.attackers[0]?.gk_score ?? 0,
      "Def Score": dreamTeam.value.attackers[0]?.def_score ?? 0,
      "Mid Score": dreamTeam.value.attackers[0]?.mid_score ?? 0,
      "Att Score": dreamTeam.value.attackers[0]?.att_score ?? 0,
    },
    {
      name: dreamTeam.value.attackers[1]?.player ?? "No Player",
      "GK Score": dreamTeam.value.attackers[1]?.gk_score ?? 0,
      "Def Score": dreamTeam.value.attackers[1]?.def_score ?? 0,
      "Mid Score": dreamTeam.value.attackers[1]?.mid_score ?? 0,
      "Att Score": dreamTeam.value.attackers[1]?.att_score ?? 0,
    },
  ];

  return (
    <BarChart width={450} height={500} data={data}>
      <CartesianGrid />
      <XAxis
        dataKey="name"
        tick={false}
        angle={-90}
        label="Gk&nbsp;&nbsp;&nbsp;Def&nbsp;&nbsp;Def&nbsp;&nbsp;Def&nbsp;&nbsp;Def&nbsp;&nbsp;Mid&nbsp;&nbsp;Mid&nbsp;&nbsp;Mid&nbsp;&nbsp;Mid&nbsp;&nbsp;Att&nbsp;&nbsp;Att"
      />
      <YAxis
        label={{ value: "Score Values", angle: -90, position: "insideLeft" }}
      />
      <Tooltip />
      <Legend />
      <Bar dataKey="GK Score" stackId="a" fill="#d7191c" />
      <Bar dataKey="Def Score" stackId="a" fill="#fdae61" />
      <Bar dataKey="Mid Score" stackId="a" fill="#abdda4" />
      <Bar dataKey="Att Score" stackId="a" fill="#2b83ba" />
    </BarChart>
  );
};

export default Barchart;
