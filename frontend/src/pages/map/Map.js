import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";


// url to a valid topojson file
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function Map() {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: "#ECEFF1", stroke: "#607D8B", strokeWidth: 0.5 },
                    hover: { fill: "#FF5722", stroke: "#000", strokeWidth: 1 },
                    pressed: { fill: "#3F51B5", stroke: "#000", strokeWidth: 1 },
                  }}
                />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}
