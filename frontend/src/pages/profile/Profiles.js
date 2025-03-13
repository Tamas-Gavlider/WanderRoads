import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";
import { Row, Col, Card, Dropdown } from "react-bootstrap";
import ThemeSong from "../../components/ThemeSong";
import styles from "../../styles/Profiles.module.css";
import btnStyles from "../../styles/Button.module.css";

const UserList = () => {
  const [profiles, setProfiles] = useState([]);
  const [sortBy, setSortBy] = useState("owner");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/?ordering=${sortBy}`);
        setProfiles(data.results);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };

    fetchProfiles();
  }, [sortBy]);

  return (
    <div className={styles.Users}>
      <Dropdown onSelect={(eventKey) => setSortBy(eventKey)}>
        <Dropdown.Toggle id="dropdown-basic" className={btnStyles.Button}>
          Sort By: {sortBy === "owner" ? "Username" : "Posts Count"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="owner">Username</Dropdown.Item>
          <Dropdown.Item eventKey="posts_count">Posts Count</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Row className="g-4">
        {profiles.map((user) => (
          <Col xs={12} sm={6} md={4} lg={3} key={user.id}>
            <Card className={`h-100 ${styles.UserCard}`}>
              <Card.Img variant="top" src={user.image} />
              <Card.Body>
                <Card.Title className="d-flex align-items-center gap-2">
                  <Link to={`/profiles/${user.id}`} className={styles.User}>
                    {user.owner}'s vibe: 
                  </Link>
                    <ThemeSong theme_song={user.theme_song} />
                </Card.Title>
                <Card.Text>
                  <p className={styles.Status}>{user.status}</p>
                  <p>Visited countries: {user.visited_countries.length}</p>
                  <p>Total posts: {user.posts_count}</p>
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
