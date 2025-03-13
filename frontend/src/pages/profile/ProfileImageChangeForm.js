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
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";


export default function ProfileImageChangeForm() {
  const [errors, setErrors] = useState({});
  const [profile, setProfile] = useState({
    image: "",
  });

  const history = useHistory();
  const { image } = profile;
  const imageInput = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        const { image, is_owner } = data;

        is_owner ? setProfile({ image }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
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
      await axiosReq.put(`/profiles/${id}`, formData);
      history.push(`/profiles/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const buttons = (
    <>
      <Col className="py-2 mx-auto text-center" xs={12} sm={12} md={12} lg={12}>
        <Button className={`${btnStyles.Button} ${btnStyles.Wide} btn`} type="submit">
          Save
        </Button>
      </Col>
      <Col className="py-2 mx-auto text-center" xs={12} sm={12} md={12} lg={12}>
        <Button className={`${btnStyles.Button} ${btnStyles.Wide} btn`} onClick={() => history.goBack()}>
          Cancel
        </Button>
      </Col>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="justify-content-center">
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} d-flex flex-column justify-content-center align-items-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Wide} btn`}
                  htmlFor="image-upload"
                  xs={12} sm={6} md={6} lg={8}
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
              {buttons}
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            
          </Container>
        </Col>
      </Row>
    </Form>
  );
}
