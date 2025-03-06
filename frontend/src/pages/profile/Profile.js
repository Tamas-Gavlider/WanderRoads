import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from '../../styles/Profile.module.css'
import ThemeSong from "../../components/ThemeSong";
import TravelPreferences from "../travel_preference/TravelPreferences";
import Asset from '../../components/Asset'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import BtnStyles from '../../styles/Button.module.css'
import TravelRecommendation from "../travel_recommendation/TravelRecommendation";
import { ProfileEditDropdown } from "../../components/MoreDropdown";


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
    return <Asset />;
  }



  const isOwner = currentUser?.username === profile.owner;

  const profileOwner = <>
  {profile.image && profile.theme_song && (
    <Row>
      <ThemeSong theme_song={profile.theme_song} />
      <ProfileEditDropdown id={profile?.id}/>
      <Col xs={6} md={4}>
        <Image 
          src={profile.image} 
          alt={`${profile.owner}'s profile`} 
          className={styles.ProfileImage}
          thumbnail
        />
        </Col>
        <Link to='/trip/' className={styles.Link}>Check your upcoming trips!</Link>
       </Row>
      )}
      <p>{profile.status || "No status set"}</p>
      <p><strong>Username:</strong> {profile.owner}</p>
      <p><strong>Experience:</strong> {profile.experience}</p>
      <p><strong>Visited Countries:</strong> {profile.visited_countries.length}</p>
      <p><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
      < TravelPreferences />
      < TravelRecommendation />
     
  </>

  const visitor = <>
  <h1>Profile of {profile.owner}</h1>
  <span>{profile.status}</span>
  <p><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
  </>

  return (
    <div className={styles.Profile}>
      {isOwner ? profileOwner : visitor }
    </div>
  );
};

export default Profile;