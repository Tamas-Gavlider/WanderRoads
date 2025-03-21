import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Col } from "react-bootstrap";
import Media from "react-bootstrap/Media";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import iconStyles from "../../styles/MoreDropdown.module.css";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    country_name,
    title,
    content,
    image,
    created_at,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Col xs={10} sm={8} md={7} lg={8}>
      <Card className={styles.Post}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`} className={styles.Profile}>
              <Avatar src={profile_image} height={55} />
              <span className={styles.User}>{owner}</span>
            </Link>
            <div className="d-flex align-items-center">
              {is_owner && postPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
              <span>
                {created_at} - {country_name}
              </span>
            </div>
          </Media>
        </Card.Body>
        <Link to={`/posts/${id}/`}>
          <Card.Img src={image} alt={title} loading="lazy" />
        </Link>
        <Card.Body>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
          {content && <Card.Text><p className={styles.Content}>{content}</p></Card.Text>}
          <Link to={`/posts/${id}/`}>
            <i className={`far fa-comments ${iconStyles.Icon}`} />
            <p className={styles.Hidden}>hidden text</p>
          </Link>
          {comments_count}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Post;
