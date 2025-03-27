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

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

export default function Map() {
  const [countryPosts, setCountryPosts] = useState({});

  useEffect(() => {
    const fetchPostCounts = async () => {
      try {
        const { data } = await axiosReq.get("/posts/");
        const postCounts = data.country_post_counts || {};
        setCountryPosts(postCounts);
      } catch (err) {
        console.error("Error fetching post counts:", err);
      }
    };
    fetchPostCounts();
  }, []);

  return (
    <div>
      <ComposableMap
        projectionConfig={{
          center: [0, 0],
          scale: 150,
        }}
      >
        <ZoomableGroup minZoom={0.5} maxZoom={3} enablePan={true} >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const postCount = countryPosts[countryName] || 0;

                return (
                  <OverlayTrigger
                    key={geo.rsmKey}
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-${geo.rsmKey}`}>
                        {countryName} - {postCount} {postCount < 2 ? 'post' : 'posts'}
                      </Tooltip>
                    }
                  >
                    <Geography
                      geography={geo}
                      style={{
                        default: {
                          fill: postCount > 0 ? "#00BAE2" : "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: { fill: "#00BAE2", stroke: "#000", strokeWidth: 1 },
                        pressed: { stroke: "#000", strokeWidth: 1 },
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
