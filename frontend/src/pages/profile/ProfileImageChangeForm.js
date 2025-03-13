import React, {useState, useRef, useEffect} from 'react'
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import btnStyles from '../../styles/Button.module.css'
import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router";
import Alert from "react-bootstrap/Alert";

export default function ProfileImageChangeForm() {

    const [errors, setErrors] = useState({});
    const [profile, setProfile] = useState({
        image: ""
    })

    const history = useHistory();
    const {image} = profile;
    const imageInput = useRef(null)
    const { id } = useParams();


     useEffect(() => {
        const handleMount = async () => {
          try {
            const { data } = await axiosReq.get(`/profiles/${id}`);
            const { image, is_owner  } = data;
    
            is_owner
              ? setProfile({ image })
              : history.push("/");
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
            console.log("New image URL:", URL.createObjectURL(event.target.files[0]));
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
        console.log("Image URL:", image);
  return (
    <div>
        <h1>test</h1>
        <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} btn`}
                  htmlFor="image-upload"
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
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Button className={btnStyles.Button} onClick={() => history.goBack()}>
        cancel
      </Button>
      <Button className={btnStyles.Button} type="submit" onClick={handleSubmit}>
        save
      </Button>
    </div>
  )
}
