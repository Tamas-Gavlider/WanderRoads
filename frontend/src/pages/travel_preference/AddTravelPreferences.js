import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useHistory, useParams } from "react-router-dom";
import BtnStyle from "../../styles/Button.module.css";

export default function AddTravelPreferences() {
  const currentUser = useCurrentUser();
  const history = useHistory();
  // State for form submission status (to handle loading state)
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State to track if the user already has travel preferences
  const [preferenceExists, setPreferenceExists] = useState(false);

  const [formData] = useState({
    preferred_continent: "ANY",
    climate: "ANY",
    activity: "ANY",
    budget: "ANY",
    travel_style: "ANY",
    duration: "ANY",
  });

  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  // Fetch profile data based on the user ID from the URL params
  useEffect(() => {
    axios
      .get(`/profiles/${id}`)
      .then((response) => setProfile(response.data))
      .catch(() => {/*Silently ignore the error or handle it silently */} );
  }, [id]);
  /**
   * Check if the current user is the owner of the profile.
   * This ensures that only the profile owner can add travel preferences.
   */
  const isOwner = useMemo(
    () => currentUser?.username === profile?.owner,
    [currentUser, profile?.owner]
  );
  // Check if the current user already has travel preferences
  useEffect(() => {
    if (currentUser?.pk) {
      axios
        .get(`/travel-preference/`)
        .then((response) => {
          if (response.data) {
            setPreferenceExists(true); // Mark that preferences exist
          }
        })
        .catch(() => {
         // eslint-disable-next-line no-empty
        });
    }
  }, [currentUser]);

  /**
   * Handles form submission by posting the default preferences for the user.
   * If the user already has travel preferences, an alert is shown.
   * Redirects to a confirmation page after successfully creating preferences.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      // console.error("No current user found. Redirecting to login.");
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
    } catch  {
      // Silently ignore the error or handle it silently
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };
  // Render the form only if the current user is the owner of the profile
  return (
    <div className="text-center">
      {isOwner ? (
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={BtnStyle.Button}
          >
            Add your Travel Preferences
          </button>
        </form>
      ) : (
        <></> // Render nothing if the user is not the owner
      )}
    </div>
  );
}
