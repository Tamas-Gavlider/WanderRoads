import React, { useState, useRef, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

export default function ProfileImageChangeForm() {
  const [errors, setErrors] = useState({});
  const [profile, setProfile] = useState({ image: "" });
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const { id } = useParams();
  const imageInput = useRef(null);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        if (data.is_owner) {
          setProfile({ image: data.image });
        } else {
          history.push("/");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(profile.image);
      setProfile({
        ...profile,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      setLoading(true);
      await axiosReq.put(`/profiles/${id}`, formData);
      history.push(`/profiles/${id}`);
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data || {});
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {loading ? (
        <div className="text-center mt-5">
          <Asset spinner />
        </div>
      ) : (
        <Row className="justify-content-center">
          <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
            <Container
              className={`${appStyles.Content} d-flex flex-column justify-content-center align-items-center`}
            >
              <Form.Group className="text-center">
                <figure>
                  <Image
                    className={appStyles.Image}
                    src={profile.image}
                    rounded
                    alt="Profile"
                  />
                </figure>
                <div>
                  <Form.Label
                    className={`${btnStyles.Button} ${btnStyles.Wide} btn`}
                    htmlFor="image-upload"
                  >
                    Change the image
                  </Form.Label>
                </div>

                <Form.Control
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={imageInput}
                />

                <Col className="py-2 mx-auto text-center">
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.Wide} btn`}
                    type="submit"
                  >
                    Save
                  </Button>
                </Col>
                <Col className="py-2 mx-auto text-center">
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.Wide} btn`}
                    onClick={() => history.goBack()}
                  >
                    Cancel
                  </Button>
                </Col>
              </Form.Group>

              {errors.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Container>
          </Col>
        </Row>
      )}
    </Form>
  );
}
