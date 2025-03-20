import React, { useEffect, useState, lazy } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Container, Nav, Tab } from "react-bootstrap";
import styles from "../../styles/Profile.module.css";
import ThemeSong from "../../components/ThemeSong";
import TravelPreferences from "../travel_preference/TravelPreferences";
import TravelRecommendation from "../travel_recommendation/TravelRecommendation";
import UserPosts from "../posts/UserPosts";
import Asset from "../../components/Asset";
import backgroundImage from "../../assets/background.webp";
import { Link } from "react-router-dom";


const LazyImage = lazy(() => import("react-bootstrap/Image"));

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
      <div
        className={styles.HeroSection}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={styles.Overlay}></div>
        <div className={styles.ProfileContent}>
          <React.Suspense fallback={<div>Loading image...</div>}>
            <LazyImage
              src={profile.image}
              alt={profile.owner}
              className={styles.ProfileImage}
              roundedCircle
              loading="lazy" 
            />
          </React.Suspense>
          <div className={styles.ProfileText}>
            <h2>
              {profile.experience} {profile.owner}
            </h2>
            <p className={styles.Status}>{profile.status || "No status set"}</p>
            <ThemeSong
              theme_song={profile.theme_song}
              className={styles.ThemeSong}
            />
          </div>
        </div>
      </div>

      <Tab.Container defaultActiveKey="posts">
        <Nav variant="tabs" className={styles.ProfileNav}>
          <Nav.Item>
            <Nav.Link eventKey="posts" className={styles.NavLink}>Posts</Nav.Link>
          </Nav.Item>
          {isOwner && 
          <>
           <Nav.Item>
            <Nav.Link eventKey="edit_profile" className={styles.NavLink}>Edit profile</Nav.Link>
          </Nav.Item>
          </>}
          <Nav.Item>
            <Nav.Link eventKey="visited_countries" className={styles.NavLink}>Visited countries</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="preferences" className={styles.NavLink}>Travel Preferences</Nav.Link>
          </Nav.Item>
          {isOwner &&
          <>
          <Nav.Item>
            <Nav.Link eventKey="recommendations" className={styles.NavLink}>Recommendations</Nav.Link>
          </Nav.Item>
         </>
         }
        </Nav>

        <Tab.Content className={styles.TabContent}>
          <Tab.Pane eventKey="posts">
            <UserPosts />
          </Tab.Pane>
          <Tab.Pane eventKey="preferences">
            <TravelPreferences profileOwner={profile.owner} />
          </Tab.Pane>
          <Tab.Pane eventKey="visited_countries">
            <ul className="d-flex flex-wrap gap-2 list-unstyled">
              {profile.visited_countries.map((c, index) => (
                <li key={index} className={`bg-light px-3 py-1 rounded ${styles.Countries}`}>
                  {c}
                </li>
              ))}
            </ul>
          </Tab.Pane>
          {isOwner && (<>
            <Tab.Pane eventKey="recommendations">
            <TravelRecommendation />
          </Tab.Pane>
            <Tab.Pane eventKey="edit_profile">
            <ul className="list-group">
              <li className="list-group-item">
                <Link to={`/profiles/${profile.id}/change-image`}>
                  <i className={`fa-solid fa-camera ${styles.EditIcon}`}> Change Image</i>
                </Link>
              </li>
              <li className="list-group-item">
                <Link to={`/profiles/${profile.id}/edit/username`}>
                  <i className={`far fa-id-card ${styles.EditIcon}`}> Change Username</i>
                </Link>
              </li>
              <li className="list-group-item">
                <Link to={`/profiles/${profile.id}/edit/password`}>
                  <i className={`fas fa-key ${styles.EditIcon}`}> Change Password</i>
                </Link>
              </li>
              <li className="list-group-item">
                <Link to={`/profiles/${profile.id}/edit/status`}>
                  <i className={`fas fa-comment ${styles.EditIcon}`}> Edit Status</i>
                </Link>
              </li>
              <li className="list-group-item">
                <Link to={`/profiles/${profile.id}/edit/countries`}>
                  <i className={`fas fa-globe ${styles.EditIcon}`}> Edit Visited Countries</i>
                </Link>
              </li>
              <li className="list-group-item">
                <Link to={`/profiles/${profile.id}/edit/theme-song`}>
                  <i className={`fas fa-music ${styles.EditIcon}`}> Change Theme Song</i>
                </Link>
              </li>
            </ul>
          </Tab.Pane>
          </>)}
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Profile;
