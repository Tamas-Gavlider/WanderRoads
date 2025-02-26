import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

export default function TravelPreferences() {
  const currentUser = useCurrentUser();
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      axios
        .get("/travel-preference/") // No ID needed
        .then((response) => {
          if (response.data.length > 0) {
            setPreferences(response.data[0]); // Only one preference exists
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching travel preferences:", error);
          setLoading(false);
        });
    }
  }, [currentUser]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {preferences ? (
        <div>
          <p>Travel Preferences</p>
          <p><strong>Continent:</strong> {preferences.preferred_continent}</p>
          <p><strong>Climate:</strong> {preferences.climate}</p>
          <p><strong>Activity:</strong> {preferences.activity}</p>
          <p><strong>Budget:</strong> {preferences.budget}</p>
          <p><strong>Travel Style:</strong> {preferences.travel_style}</p>
          <p><strong>Duration:</strong> {preferences.duration}</p>
          <Link to={`/travel-preference/${preferences.id}/edit`}>
            Edit Preferences
          </Link>
        </div>
      ) : (
        <div>
          <p>You have not set your travel preferences yet.</p>
          <Link to="/travel-preference/create">
            Add Travel Preferences
          </Link>
        </div>
      )}
    </div>
  );
}