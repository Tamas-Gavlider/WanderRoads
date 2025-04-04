import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styles from "../../styles/EditProfile.module.css";
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
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id]);

  const handleThemeSongUpload = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      if (file.type !== "audio/mpeg") {
        alert("Please upload an MP3 file.");
        return;
      }
      setThemeSong(file);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    if (themeSong instanceof File) {
      formData.append("theme_song", themeSong);
    }

    try {
      await axios.put(`/profiles/${id}`, formData);
      history.goBack();
    } catch (error) {
      console.error("Error updating theme song:", error);
    }
  };

  return (
    <Container className={styles.ThemeSongContainer}>
      <h2 className={styles.Heading}>🎶 Change Your Theme Song</h2>

      <div className={styles.MoodDescription}>
        <p>
          Let others know your mood – add your favorite music theme song to your
          profile!
        </p>
      </div>

      <div className={styles.SongCard}>
        <Form.Group controlId="themeSong" className={styles.UploadSection}>
          <Form.Label className={styles.UploadLabel}>
            <i className="fa-solid fa-music"></i> Upload a New Theme Song
          </Form.Label>
          <Form.File
            accept="audio/mpeg"
            onChange={handleThemeSongUpload}
            className={styles.UploadButton}
          />

          {themeSong && (
            <div className={styles.SongPreview}>
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
        className={`mt-3 ${btnStyles.Button} ${styles.SaveButton}`}
      >
        <i className="fas fa-check"></i> Save Changes
      </Button>
    </Container>
  );
}
