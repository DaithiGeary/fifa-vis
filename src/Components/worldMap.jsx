import React, { useState, useEffect } from "react";
import { json, geoEquirectangular, geoPath } from "d3";
import { rawData } from "./fifaData";
import { feature } from "topojson-client";

const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
const w = 823;
const h = 450;

export const Map = () => {
  const [data, setData] = useState(null);

  let maxFrequency = 0;
  const countryFrequency = rawData.value.data.reduce((acc, player) => {
    if (acc[player.country]) {
      acc[player.country]++;
    } else {
      acc[player.country] = 1;
    }
    if (acc[player.country] > maxFrequency) {
      maxFrequency = acc[player.country];
    }
    return acc;
  }, {});
  const lerp = (t, min, max, a, b) => {
    return ((b - a) * (t - min)) / (max - min) + a;
  };
  const countryColour = Object.keys(countryFrequency).reduce((acc, country) => {
    acc[country] = `hsl(0, 100%,${
      100 - lerp(countryFrequency[country], 0, maxFrequency, 5, 75)
    }%)`;
    return acc;
  }, {});

  useEffect(() => {
    json(jsonUrl).then((topology) => {
      const { countries } = topology.objects;
      setData(feature(topology, countries));
    });
  }, []);

  const projection = geoEquirectangular().fitSize([w, h], data);
  const path = geoPath(projection);

  return (
    <div style={{ width: `${w}px`, height: `${h}px`, position: "relative" }}>
      <span
        style={{
          position: "absolute",
          top: -10,
          left: "50%",
          transform: "translateX(-50%)",
          margin: 0,
          padding: 0,
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Number of Players per Country
      </span>
      <svg width={w} height={h}>
        <g>
          {data?.features.map((feature) => (
            <path
              fill={countryColour[feature.properties.name] ?? "#eee"}
              d={path(feature)}
              key={feature.properties.name}
              stroke="#000"
              strokeWidth={0.5}
            >
              <title>
                {feature.properties.name}:{" "}
                {countryFrequency[feature.properties.name] ?? 0} players
              </title>
            </path>
          ))}
        </g>
      </svg>
    </div>
  );
};
