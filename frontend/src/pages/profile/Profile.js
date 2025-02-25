import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from '../../styles/Profile.module.css'

const Profile = () => {
  const { id } = useParams(); 
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

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

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

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
        <div>
          <button onClick={toggleMute}>
            <i className={`fa-solid ${isMuted ? "fa-volume-xmark" : "fa-volume-high"}`}></i>
          </button>
          <audio ref={audioRef} src={profile.theme_song} />
        </div>
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