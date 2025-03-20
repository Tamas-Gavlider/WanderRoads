import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";
import BtnStyle from '../../styles/Button.module.css';

export default function AddTravelPreference() {
  const currentUser = useCurrentUser();
  const history = useHistory();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preferenceExists, setPreferenceExists] = useState(false);

  const [formData] = useState({
    preferred_continent: "ANY",
    climate: "ANY",
    activity: "ANY",
    budget: "ANY",
    travel_style: "ANY",
    duration: "ANY",
  });

  useEffect(() => {
    if (currentUser?.pk) {
      axios
        .get(`/travel-preference/`)
        .then((response) => {
          if (response.data) {
            setPreferenceExists(true);
          }
        })
        .catch((error) => {
          console.error("Error checking travel preferences:", error);
        });
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      console.error("No current user found. Redirecting to login.");
      history.push("/signin");
      return;
    }

    setIsSubmitting(true);

    try {
      if (preferenceExists) {
        alert("You already have travel preferences.");
        return;
      }

      // Post the default "ANY" preferences for the user
      await axios.post(`/travel-preference/`, formData);
      history.push("/confirmation");
    } catch (error) {
      console.error("Error creating travel preference:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-center">
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={isSubmitting} className={BtnStyle.Button}>
          Add your Travel Preferences
        </button>
      </form>
    </div>
  );
}
