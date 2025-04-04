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
  const [sortBy, setSortBy] = useState("owner"); // Default sorting by 'owner'
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Fetch profiles from the API, applying sorting and search filters
        const { data } = await axiosReq.get(
          `/profiles/?ordering=${sortBy}&search=${query}`
        );
        setProfiles(data.results);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };
    // Debounce the API call by 500ms to avoid excessive requests
    const timer = setTimeout(() => {
      fetchProfiles();
    }, 500);

    return () => clearTimeout(timer); // Cleanup on component unmount or when dependencies change
  }, [sortBy, query]); // Effect runs when sortBy or query changes

  return (
    <div className={styles.Users}>
      {/* Search Bar for searching users */}
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
      {/* Dropdown menu to select sorting method */}
      <Dropdown onSelect={(eventKey) => setSortBy(eventKey)}>
        <Dropdown.Toggle id="dropdown-basic" className={btnStyles.Button}>
          Sort By: {sortBy === "owner" ? "Username" : "Posts Count"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="owner">Username</Dropdown.Item>
          <Dropdown.Item eventKey="posts_count">Posts Count</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* Conditionally render profiles or loading spinner */}
      {profiles.length === 0 ? (
        <Loading />
      ) : (
        <Row className="g-4">
          {/* Loop through the profiles and display each one */}
          {profiles.map((user) => (
            <Col xs={6} sm={4} md={4} lg={3} key={user.id}>
              <Card className={`h-100 ${styles.UserCard}`}>
                <Link to={`/profiles/${user.id}`} className={styles.User}>
                  {/* Profile image linking to user profile page */}
                  <Card.Img
                    variant="top"
                    src={user.image}
                    alt={`${user.owner}'s profile picture`}
                    loading="lazy"
                  />
                </Link>
                <Card.Body>
                  {/* Display user details */}
                  <Card.Title className="d-flex align-items-center gap-2">
                    <span>{user.owner}</span>
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
