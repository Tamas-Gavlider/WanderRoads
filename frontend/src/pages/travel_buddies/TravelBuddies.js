import ThemeSong from "../../components/ThemeSong";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom/cjs/react-router-dom";
import btnStyles from '../../styles/Button.module.css';
import { Row, Col } from 'react-bootstrap';
import styles from '../../styles/TravelBuddy.module.css'

const UserList = () => {
  const { allProfiles } = useProfileData();
  const { handleFriendRequest, handleUnFriend } = useSetProfileData();

  return (
    <div className={styles.Users}>
      <Row className="g-4">
        {allProfiles?.results?.map((user) => (
          <Col xs={12} sm={6} md={4} lg={3} key={user.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={user.image} />
              <Card.Body>
                <Card.Title>
                  <Link to={`/profiles/${user.id}`}>{user.owner}</Link>
                  <ThemeSong theme_song={user.theme_song} />
                </Card.Title>
                <Card.Text>
                  <p>Visite countries: {user.visited_countries.length}</p>
                  {user.status}
                </Card.Text>
                {user.travel_buddies_initiated_id ? (
                  <Button
                    onClick={() => handleUnFriend(user)}
                    className={btnStyles.Button}
                  >
                    Unfriend
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleFriendRequest(user)}
                    className={btnStyles.Button}
                  >
                    Add Travel Buddy
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UserList;
