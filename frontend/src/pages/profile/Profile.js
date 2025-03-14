import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Container, Row, Col, Image, Nav, Tab } from "react-bootstrap";
import styles from "../../styles/Profile.module.css";
import ThemeSong from "../../components/ThemeSong";
import TravelPreferences from "../travel_preference/TravelPreferences";
import TravelRecommendation from "../travel_recommendation/TravelRecommendation";
import UserPosts from "../posts/UserPosts";
import Asset from "../../components/Asset";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import backgroundImage from "../../assets/background.webp";

const Profile = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`/profiles/${id}`)
      .then((response) => setProfile(response.data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, [id]);

  if (!profile) {
    return <Asset />;
  }

  const isOwner = currentUser?.username === profile.owner;

  return (
    <Container className={styles.ProfileContainer}>
      <div className={styles.HeroSection} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className={styles.Overlay}></div>
        <div className={styles.ProfileContent}>
          <Image src={profile.image} alt={profile.owner} className={styles.ProfileImage} roundedCircle />
          <div className={styles.ProfileText}>
            <h2>{profile.owner}</h2>
            <p className={styles.Status}>{profile.status || "No status set"}</p>
            <ThemeSong theme_song={profile.theme_song} className={styles.ThemeSong} />  
          </div>
          {isOwner && <ProfileEditDropdown id={profile.id} />}
        </div>
      </div>

      <Tab.Container defaultActiveKey="posts">
        <Nav variant="tabs" className={styles.ProfileNav}>
          <Nav.Item>
            <Nav.Link eventKey="posts">Posts</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="preferences">Travel Preferences</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="recommendations">Recommendations</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className={styles.TabContent}>
          <Tab.Pane eventKey="posts">
            <UserPosts />
          </Tab.Pane>
          <Tab.Pane eventKey="preferences">
            <TravelPreferences profileOwnerId={profile.id} />
          </Tab.Pane>
          <Tab.Pane eventKey="recommendations">
            <TravelRecommendation />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Profile;
