import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Col, Row, Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostPage.module.css";
import Post from "./Post";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularDestinations from "../../components/PopularDestinations";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}/`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        // Silently ignore the error - keep comment to avoid parsing error 
      }
    };

    handleMount();
  }, [id]);
  return (
    <Row className={`h-100 ${styles.Row}`}>
      {/* Left column: main post and comments */}
      <Col className={`py-2 p-0 p-lg-2 ${styles.Post}`} lg={8}>
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            /> 
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {/* If there are comments, render them with infinite scroll */}
          {comments.results.length ? (
            <InfiniteScroll
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            >
              {comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments}
                />
              ))}
            </InfiniteScroll>
          ) : currentUser ? (
            <span className={styles.Comment}>
              No comments yet, be the first to comment!
            </span>
          ) : (
            <span className={styles.Comment}>No comments... yet</span>
          )}
        </Container>
      </Col>
       {/* Right column: popular destinations sidebar */}
      <Col className={styles.Destination}>
        <PopularDestinations />
      </Col>
    </Row>
  );
}

export default PostPage;
