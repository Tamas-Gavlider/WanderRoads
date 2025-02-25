import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Profile = () => {
  const { id } = useParams(); 
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`/profiles/${id}`)
      .then((response) => {
        console.log("Profile Data:", response.data);
        setProfile(response.data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [id]);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  const isOwner = currentUser?.username === profile.owner;

  const profileOwner = <>
  {profile.image && (
        <img 
          src={profile.image} 
          alt={`${profile.owner}'s profile`} 
          style={{ width: "150px", borderRadius: "50%" }} 
        /> 
      )}
      <span>{profile.status || "No status set"}</span>
      <p><strong>Username:</strong> {profile.owner}</p>
      <p><strong>Name:</strong> {profile.name || "N/A"}</p>
      <p><strong>Experience:</strong> {profile.experience}</p>
      <p><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
      {profile.theme_song && (
        <audio controls>
          <source src={profile.theme_song} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      )}
  </>

  const visitor = <>
  <h1>Profile of {profile.owner}</h1>
  <span>{profile.status}</span>
  <p><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
  </>

  return (
    <div>
      {isOwner ? profileOwner : visitor }
    </div>
  );
};

export default Profile;