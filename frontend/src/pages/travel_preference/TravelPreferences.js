import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Asset from '../../components/Asset'

export default function TravelPreferences() {
  const currentUser = useCurrentUser();
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      axios
        .get("/travel-preference/") 
        .then((response) => {
          if (response.data) {
            setPreferences(response.data); 
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching travel preferences:", error);
          setLoading(false);
        });
    }
  }, [currentUser]);

  if (loading) return <Asset />

  return (
    <div>
      {preferences ? (
        <div>
          <h3>Your Travel Preferences</h3>
          <p><strong>Continent:</strong> {preferences.preferred_continent}</p>
          <p><strong>Climate:</strong> {preferences.climate}</p>
          <p><strong>Activity:</strong> {preferences.activity}</p>
          <p><strong>Budget:</strong> {preferences.budget}</p>
          <p><strong>Travel Style:</strong> {preferences.travel_style}</p>
          <p><strong>Duration:</strong> {preferences.duration}</p>
          <Link to={`/travel-preference/edit`}>Edit Preferences</Link>
        </div>
      ) : (
        <div>
          <p>You have not set your travel preferences yet.</p>
          <Link to="/travel-preference/create">Add Travel Preferences</Link>
        </div>
      )}
    </div>
  );
}
