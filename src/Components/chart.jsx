import React, { PureComponent } from "react";
import { rawData, dreamTeam } from "./fifaData";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Chart = () => {
  const data = [
    {
      name: dreamTeam.value.goalKeeper?.player ?? "No Player",
      Overall_Score: dreamTeam.value.goalKeeper?.ovr_score ?? 0,
      Position_Score: dreamTeam.value.goalKeeper?.score ?? 0,
      Value_in_Millions: dreamTeam.value.goalKeeper?.value / 1000000 ?? 0,
    },
    {
      name: dreamTeam.value.defenders[0]?.player ?? "No Player",
      Overall_Score: dreamTeam.value.defenders[0]?.ovr_score ?? 0,
      Position_Score: dreamTeam.value.defenders[0]?.score ?? 0,
      Value_in_Millions: dreamTeam.value.defenders[0]?.value / 1000000 ?? 0,
    },
    {
      name: dreamTeam.value.defenders[1]?.player ?? "No Player",
      Overall_Score: dreamTeam.value.defenders[1]?.ovr_score ?? 0,
      Position_Score: dreamTeam.value.defenders[1]?.score ?? 0,
      Value_in_Millions: dreamTeam.value.defenders[1]?.value / 1000000 ?? 0,
    },
    {
      name: dreamTeam.value.defenders[2]?.player ?? "No Player",
      Overall_Score: dreamTeam.value.defenders[2]?.ovr_score ?? 0,
      Position_Score: dreamTeam.value.defenders[2]?.score ?? 0,
      Value_in_Millions: dreamTeam.value.defenders[2]?.value / 1000000 ?? 0,
    },
    {
      name: dreamTeam.value.defenders[3]?.player ?? "No Player",
      Overall_Score: dreamTeam.value.defenders[3]?.ovr_score ?? 0,
      Position_Score: dreamTeam.value.defenders[3]?.score ?? 0,
      Value_in_Millions: dreamTeam.value.defenders[3]?.value / 1000000 ?? 0,
    },
    {
      name: dreamTeam.value.midfielders[0]?.player ?? "No Player",
      Overall_Score: dreamTeam.value.midfielders[0]?.ovr_score ?? 0,
      Position_Score: dreamTeam.value.midfielders[0]?.score ?? 0,
      Value_in_Millions: dreamTeam.value.midfielders[0]?.value / 1000000 ?? 0,
    },
    {
      name: dreamTeam.value.midfielders[1]?.player ?? "No Player",
      Overall_Score: dreamTeam.value.midfielders[1]?.ovr_score ?? 0,
      Position_Score: dreamTeam.value.midfielders[1]?.score ?? 0,
      Value_in_Millions: dreamTeam.value.midfielders[1]?.value / 1000000 ?? 0,
    },
    {
      name: dreamTeam.value.midfielders[2]?.player ?? "No Player",
      Overall_Score: dreamTeam.value.midfielders[2]?.ovr_score ?? 0,
      Position_Score: dreamTeam.value.midfielders[2]?.score ?? 0,
      Value_in_Millions: dreamTeam.value.midfielders[2]?.value / 1000000 ?? 0,
    },
    {
      name: dreamTeam.value.midfielders[3]?.player ?? "No Player",
      Overall_Score: dreamTeam.value.midfielders[3]?.ovr_score ?? 0,
      Position_Score: dreamTeam.value.midfielders[3]?.score ?? 0,
      Value_in_Millions: dreamTeam.value.midfielders[3]?.value / 1000000 ?? 0,
    },
    {
      name: dreamTeam.value.attackers[0]?.player ?? "No Player",
      Overall_Score: dreamTeam.value.attackers[0]?.ovr_score ?? 0,
      Position_Score: dreamTeam.value.attackers[0]?.score ?? 0,
      Value_in_Millions: dreamTeam.value.attackers[0]?.value / 1000000 ?? 0,
    },
    {
      name: dreamTeam.value.attackers[1]?.player ?? "No Player",
      Overall_Score: dreamTeam.value.attackers[1]?.ovr_score ?? 0,
      Position_Score: dreamTeam.value.attackers[1]?.score ?? 0,
      Value_in_Millions: dreamTeam.value.attackers[1]?.value / 1000000 ?? 0,
    },
  ];

  return (
    <div style={{ width: 450, height: 350 }}>
      <ResponsiveContainer>
        <ComposedChart width={500} height={500} data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="name"
            angle={15}
            fontSize={12}
            tick={false}
            label="Gk&nbsp;&nbsp;&nbsp;Def&nbsp;&nbsp;Def&nbsp;&nbsp;Def&nbsp;&nbsp;Def&nbsp;&nbsp;Mid&nbsp;&nbsp;Mid&nbsp;&nbsp;Mid&nbsp;&nbsp;Mid&nbsp;&nbsp;Att&nbsp;&nbsp;Att"
          />
          <YAxis
            label={{
              value: "Score Values",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend align="right" />
          <Area
            type="monotone"
            dataKey="Value_in_Millions"
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Bar dataKey="Position_Score" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="Overall_Score" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;
