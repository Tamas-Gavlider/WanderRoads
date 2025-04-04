import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/Map.module.css";

// GeoJSON URL for world map data
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

export default function Map() {
  // State to store the count of posts per country
  const [countryPosts, setCountryPosts] = useState({});

  useEffect(() => {
    const fetchPostCounts = async () => {
      try {
        // Make an API request to fetch the post counts per country
        const { data } = await axiosReq.get("/posts/");
        const postCounts = data.country_post_counts || {}; // Retrieve post counts from response
        setCountryPosts(postCounts);
      } catch (err) {
        // Silently ignore the error - keep comment to avoid parsing error
      }
    };
    fetchPostCounts();
  }, []);

  return (
    <div className={styles.MapContainer}>
      <h3 className={styles.Header}>See Where Users Are Posting From</h3>
      <ComposableMap
        tabIndex={-1}
        projectionConfig={{
          center: [0, 0],
          scale: 150,
        }}
        className={styles.Map}
      >
        <ZoomableGroup minZoom={0.5} maxZoom={3} enablePan={true}>
          {/* Render the countries on the map */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // Map over all the countries in the GeoJSON data
                const countryName = geo.properties.name;
                const postCount = countryPosts[countryName] || 0;

                return (
                  // OverlayTooltip: Shows the country name and post count when hovered
                  <OverlayTrigger
                    key={geo.rsmKey}
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-${geo.rsmKey}`}>
                        {countryName} - {postCount}{" "}
                        {postCount < 2 ? "post" : "posts"}
                      </Tooltip>
                    }
                  >
                    {/* Render each country with different styles based on post count */}
                    <Geography
                      geography={geo}
                      focusable={false}
                      style={{
                        default: {
                          fill: postCount > 0 ? "#00BAE2" : "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: "#00BAE2",
                          stroke: "#000",
                          strokeWidth: 1,
                        },
                        pressed: {
                          stroke: "#000",
                          strokeWidth: 0,
                          outline: "none",
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
