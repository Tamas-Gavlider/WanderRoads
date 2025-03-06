import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

export default function TravelRecommendation() {
  const currentUser = useCurrentUser();
  const [recommendation, setRecommendation] = useState();
  useEffect(() => {
    if (currentUser) {
      axios
        .get("/travel-recommendation/")
        .then((response) => {
          setRecommendation(response.data);
        })
        .catch((error) => {
          console.error("Error fetching travel preferences:", error);
        });
    }
  }, [currentUser]);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

  return (
    <div>
        <h4>Places you may enjoy</h4>
        {recommendation && recommendation.results.length > 0 ? (
            <ul>
                {recommendation.results[0].recommended_destination.map((destination, index) => (
                    <li key={index}>{capitalize(destination)}</li>
                ))}
            </ul>
        ) : (
            <p>No recommendations available.</p>
        )}
    </div>
);
}