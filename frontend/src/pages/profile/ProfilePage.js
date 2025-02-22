import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { fetchProfile } from "../../api/profileApi";
import { Spinner, Container } from "react-bootstrap";

const ProfilePage = () => {
  const { id } = useParams();
  const { pageProfile } = useProfileData();
  const setProfileData = useSetProfileData();

  useEffect(() => {
    fetchProfile(id, setProfileData);
  }, [id, setProfileData]);

  if (!pageProfile.results.length) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading profile...</span>
        </Spinner>
      </Container>
    );
  }

  const profile = pageProfile.results[0];

  return (
    <div>
      <h1>{profile.name || "Unnamed User"}</h1>
      <img src={profile.image} alt="Profile" width="150" />
      <p>Experience Level: {profile.experience}</p>
      <p>Status: {profile.status}</p>
      <p>Visited Countries: {profile.visited_countries?.length ? profile.visited_countries.join(", ") : "No countries visited yet"}</p>
      <audio controls>
        <source src={profile.theme_song} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
};

export default ProfilePage;
