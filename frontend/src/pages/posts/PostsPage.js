import React, { useEffect, useState } from "react";
import Form  from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import  {Link}  from "react-router-dom";
import Post from "./Post";
import navStyle from '../../styles/NavBar.module.css' 
import styles from '../../styles/PostsPage.module.css'
import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Loading from "../../components/Loading";
import video from '../../assets/bg-video.mp4';

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className="h-100">
     <div className={styles.CreatePost}>
     <video autoPlay muted loop>
  <source src={video} type="video/mp4" />
  Your browser does not support the video tag.
</video>
  
  <Col className="py-2 p-0 p-lg-2" lg={8}>
    <span className={styles.ShareText}> Share your journey! </span>
    <Link
      className={navStyle.NavLink}
      activeClassName={navStyle.Active}
      to="/posts/create"
    >
      <i className={`fa-solid fa-plane-departure ${styles.ShareIcon}`}></i>
    </Link>
  </Col>
</div>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      <i className={`fas fa-search ${styles.SearchIcon}`}></i>
        <Form
        className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
              children={posts.results.map((post) => (

                <Post key={post.id} {...post} setPosts={setPosts} />

              ))}

              dataLength={posts.results.length}

              loader={<Loading />}

              hasMore={!!posts.next}

              next={() => fetchMoreData(posts, setPosts)}

            />
            ) : (
              <Container className={appStyles.Content}>
              <p>{message} </p>
            </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Loading />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default PostsPage;