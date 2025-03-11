import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import ThemeSong from "../../components/ThemeSong";
import styles from "../../styles/Profiles.module.css";

const UserList = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/");
        setProfiles(data.results);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className={styles.Users}>
      <Row className="g-4">
        {profiles.map((user) => (
          <Col xs={12} sm={6} md={4} lg={3} key={user.id}>
            <Card className={`h-100 ${styles.UserCard}`}>
              <Card.Img variant="top" src={user.image} />
              <Card.Body>
                <Card.Title>
                  <Link to={`/profiles/${user.id}`}>{user.owner}</Link>
                  <ThemeSong theme_song={user.theme_song} />
                </Card.Title>
                <Card.Text>
                  <p>Visited countries: {user.visited_countries.length}</p>
                  {user.status}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UserList;
