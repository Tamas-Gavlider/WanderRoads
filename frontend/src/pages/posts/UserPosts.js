import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/UserPosts.module.css";

// UserPosts component to display posts of a specific user
const UserPosts = () => {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  // Fetch posts for the user on component mount or when 'id' changes
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // Make API request to fetch posts by the user (owner profile)
        const { data } = await axiosReq.get(`/posts/?owner__profile=${id}`);
        setUserPosts(data.results);
      } catch (err) {
        // Silently ignore the error - keep comment to avoid parsing error
      }
    };

    fetchUserPosts();
  }, [id]);

  return (
    <Row className="g-4">
      {/* Check if there are posts to display */}
      {userPosts.length > 0 ? (
        // Map over the posts and display them in a grid
        userPosts.map((post) => (
          <Col xs={6} sm={6} md={4} lg={2} key={post.id}>
            <Card className={styles.Card}>
              <Card.Body className={styles.Card}>
                <Link to={`/posts/${post.id}`}>
                  <Card.Img variant="top" src={post.image} alt={post.title} />
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        // Display message if no posts are available
        <p>No posts available.</p>
      )}
    </Row>
  );
};

export default UserPosts;
