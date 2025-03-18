import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";
import BtnStyle from '../../styles/Button.module.css';

export default function AddTravelPreference() {
  const currentUser = useCurrentUser();
  const history = useHistory();

  const [formData, setFormData] = useState({
    preferred_continent: "ANY",
    climate: "ANY",
    activity: "ANY",
    budget: "ANY",
    travel_style: "ANY",
    duration: "ANY",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preferenceExists, setPreferenceExists] = useState(false);

  useEffect(() => {
    if (currentUser) {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (preferenceExists) {
        alert("You already have travel preferences.");
        history.goBack();
        return;
      }

      await axios.post(`/travel-preference/`, formData);

        
      history.push(`/profiles/${currentUser?.profile_id}`);
     console.log(`Directing user back to profile ID: ${currentUser?.profile_id}`)

    } catch (error) {
      console.error("Error creating travel preference:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
console.log(` Current user: ${currentUser}`)
console.log(`ID ${currentUser.profile_id}`)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={isSubmitting} className={BtnStyle.Button}>
          Add your Travel Preferences
        </button>
      </form>
    </div>
  );
}
