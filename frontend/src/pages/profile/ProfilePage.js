import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Profile from './Profile';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/logo.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import ProfileEditForm from "./ProfileEditForm";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileData, setProfileData] = useState({ pageProfile: { results: [] } });
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const profile = profileData.pageProfile.results[0];
  const currentUser = useCurrentUser();
  const { id } = useParams();
 

  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}`), 
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData({ pageProfile: { results: [pageProfile] } });
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]); 

 
  return (
    <Row>
      {is_owner && <ProfileEditForm />}
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          <Profile key={profile.id} profile={profile} />
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
      </Col>
    </Row>
  );
}

export default ProfilePage;