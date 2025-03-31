import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import {Card , Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from '../../styles/UserPosts.module.css'

const UserPosts = () => {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?owner__profile=${id}`);
        setUserPosts(data.results);
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    };

    fetchUserPosts();
  }, [id]);

  return (
    <Row className="g-4">
      {userPosts.length > 0 ? (
        userPosts.map((post) => (
            <Col xs={6} sm={6} md={4} lg={2} key={post.id}>
          <Card className={styles.Card}>
            <Card.Body className={styles.Card}>
              <Link to={`/posts/${post.id}`}>
                <Card.Img variant="top"  src={post.image} alt={post.title} />
              </Link>
            </Card.Body>
          </Card>
          </Col>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </Row>
  );
};

export default UserPosts;
