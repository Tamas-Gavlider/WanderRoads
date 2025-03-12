import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "../../styles/Map.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

// URL to the topojson file
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function Map() {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div>
      <ComposableMap
        projectionConfig={{
          center: [0, 3],
          scale: 200,
        }}
        className={styles.Map}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <OverlayTrigger
                    key={geo.rsmKey}
                    placement="top"
                    overlay={<Tooltip id={`tooltip-${geo.rsmKey}`}>{geo.properties.name}</Tooltip>}
                  >
                    <Geography
                      geography={geo}
                      onMouseEnter={() => setTooltipContent(geo.properties.name)}
                      onMouseLeave={() => setTooltipContent("")}
                      style={{
                        default: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: { fill: "#00BAE2", stroke: "#000", strokeWidth: 1 },
                        pressed: {
                          stroke: "#000",
                          strokeWidth: 1,
                        },
                      }}
                    />
                  </OverlayTrigger>
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
