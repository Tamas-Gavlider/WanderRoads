import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";
import { Row, Col, Card, Dropdown, Form } from "react-bootstrap";
import styles from "../../styles/Profiles.module.css";
import btnStyles from "../../styles/Button.module.css";
import searchStyles from "../../styles/PostsPage.module.css";
import Loading from "../../components/Loading";

const UserList = () => {
  const [profiles, setProfiles] = useState([]);
  const [sortBy, setSortBy] = useState("owner");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get(
          `/profiles/?ordering=${sortBy}&search=${query}`
        );
        setProfiles(data.results);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };
    const timer = setTimeout(() => {
      fetchProfiles();
    }, 500);

    return () => clearTimeout(timer);
  }, [sortBy, query]);

  return (
    <div className={styles.Users}>
      <Col lg={4} md={6} sm={6} xs={6}>
        <i className={`fas fa-search ${searchStyles.SearchIcon}`} />
        <Form
          className={searchStyles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="serach users"
          />
        </Form>
      </Col>
      <Dropdown onSelect={(eventKey) => setSortBy(eventKey)}>
        <Dropdown.Toggle id="dropdown-basic" className={btnStyles.Button}>
          Sort By: {sortBy === "owner" ? "Username" : "Posts Count"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="owner">Username</Dropdown.Item>
          <Dropdown.Item eventKey="posts_count">Posts Count</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {profiles.length === 0 ? (
        <Loading />
      ) : (
        <Row className="g-4">
          {profiles.map((user) => (
            <Col xs={6} sm={4} md={4} lg={3} key={user.id}>
              <Card className={`h-100 ${styles.UserCard}`}>
                <Card.Img
                  variant="top"
                  src={user.image}
                  alt={`${user.owner}'s profile picture`}
                  loading="lazy"
                />
                <Card.Body>
                  <Card.Title className="d-flex align-items-center gap-2">
                    <Link to={`/profiles/${user.id}`} className={styles.User}>
                      <span>{user.owner}</span>
                    </Link>
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
      )}
    </div>
  );
};

export default UserList;
