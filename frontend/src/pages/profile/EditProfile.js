import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useParams, useHistory } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/EditProfile.module.css";

export default function EditProfile() {
  const { id } = useParams();
  const history = useHistory();
  const [profile, setProfile] = useState({
    status: "",
    visited_countries: [],
    theme_song: null,
  });

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/profiles/${id}`);
        setProfile({
          status: data.status || "",
          visited_countries: data.visited_countries || [],
          theme_song: data.theme_song || null,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get("/countries/");
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleThemeSongUpload = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      if (file.type !== "audio/mpeg") {
        alert("Please upload an MP3 file.");
        return;
      }
      setProfile({ ...profile, theme_song: file });
    }
  };

  const handleAddCountry = () => {
    if (
      selectedCountry &&
      !profile.visited_countries.includes(selectedCountry)
    ) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        visited_countries: [...prevProfile.visited_countries, selectedCountry],
      }));
    }
  };

  const handleRemoveCountry = (countryToRemove) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      visited_countries: prevProfile.visited_countries.filter(
        (c) => c !== countryToRemove
      ),
    }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("status", profile.status);
    profile.visited_countries.forEach((country) => {
      formData.append("visited_countries", country);
    });

    if (profile.theme_song instanceof File) {
      formData.append("theme_song", profile.theme_song);
    }

    try {
      await axios.put(`/profiles/${id}`, formData);
      history.goBack();
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors("Failed to update profile. Please try again.");
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center">
      <h2>Edit Profile</h2>

      {errors && <Alert variant="danger">{errors}</Alert>}

      <Form.Group controlId="status" className={styles.Status}>
        <Form.Label>Status</Form.Label>
        <Form.Control
          type="text"
          name="status"
          value={profile.status}
          onChange={handleChange}
          placeholder="Update your status..."
        />
      </Form.Group>

      <Form.Group controlId="countrySelect" className={styles.Border}>
        <Form.Label>Select a Country</Form.Label>
        <Form.Control
          as="select"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Choose a country</option>
          {countries.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button
        variant="primary"
        onClick={handleAddCountry}
        className={`mt-2 ${btnStyles.Button}`}
      >
        Add Country
      </Button>

      <h4 className="mt-4">Visited Countries:</h4>
      <div className="row">
        {profile.visited_countries.map((country, index) => (
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={index}>
            <div className={styles.Country}>
            <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveCountry(country)}
                className={styles.Delete}
              >
                Remove
              </Button>
              <span> </span>
              {country}{" "}
            </div>
          </div>
        ))}
      </div>

      <Form.Group controlId="themeSong" className={styles.Border}>
        <span>Change theme song</span>
        <Form.Label className={styles.Audio}><i class="fa-solid fa-music"></i></Form.Label>
        <Form.File accept="audio/*" onChange={handleThemeSongUpload}/>
        {profile.theme_song && (
          <p>
            Current song:{" "}
            {profile.theme_song instanceof File
              ? profile.theme_song.name
              : profile.theme_song.slice(
                  profile.theme_song.lastIndexOf("/") + 1
                )}
          </p>
        )}
      </Form.Group>

      <Button
        variant="success"
        onClick={handleSave}
        className={`mt-3 ${btnStyles.Button}`}
      >
        Save Profile
      </Button>
    </Container>
  );
}
