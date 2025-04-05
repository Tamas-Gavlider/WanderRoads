import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styles from "../../styles/ChangeThemeSong.module.css";
import btnStyles from "../../styles/Button.module.css";

export default function ChangeThemeSong() {
  const { id } = useParams();
  const history = useHistory();
  const [themeSong, setThemeSong] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/profiles/${id}`);
        setThemeSong(data.theme_song || null);
      } catch (error) {
        // console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id]);
  // Handle file upload for the theme song (MP3 only)
  const handleThemeSongUpload = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      // Check if the uploaded file is an MP3
      if (file.type !== "audio/mpeg") {
        alert("Please upload an MP3 file."); // If not an MP3, show alert and return
        return;
      }
      setThemeSong(file);
    }
  };
  // Handle saving the uploaded theme song
  const handleSave = async () => {
    const formData = new FormData();
    // Append the theme song to the FormData object if it's a valid file
    if (themeSong instanceof File) {
      formData.append("theme_song", themeSong);
    }

    try {
      await axios.put(`/profiles/${id}`, formData);
      history.goBack();
    } catch (error) {
      // Silently ignore the error - keep comment to avoid parsing error
    }
  };

  return (
    // Container for the theme song section, using custom styles for layout
    <Container className={styles.ThemeSongContainer}>
      <h2 className={styles.Heading}>🎶 Change Your Theme Song</h2>

      <div className={styles.MoodDescription}>
        <p>
          Let others know your mood – add your favorite music theme song to your
          profile!
        </p>
      </div>

      <div>
        <Form.Group controlId="themeSong">
          <Form.Label className={styles.UploadLabel}>
            <i className="fa-solid fa-music"></i> Upload a New Theme Song
          </Form.Label>
          <Form.File accept="audio/mpeg" onChange={handleThemeSongUpload} />
          {/* Display the currently selected theme song, if available */}
          {themeSong && (
            <div>
              <p>
                <i className="fas fa-headphones"></i> Now Selected:{" "}
                {themeSong instanceof File
                  ? themeSong.name
                  : themeSong.slice(themeSong.lastIndexOf("/") + 1)}
              </p>
            </div>
          )}
        </Form.Group>
      </div>

      <Button
        variant="success"
        onClick={handleSave}
        className={`mt-3 ${btnStyles.Button}`}
      >
        <i className="fas fa-check"></i> Save Changes
      </Button>
    </Container>
  );
}
