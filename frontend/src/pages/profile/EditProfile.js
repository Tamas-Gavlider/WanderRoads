import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";

export default function EditProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState({
    status: "",
    visited_countries: [],
    theme_song: null,
  });

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [errors, setErrors] = useState(null);

  // Fetch existing profile details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/profiles/${id}/`);
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

  // Fetch country list
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

  // Handle status change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle theme song upload
  const handleThemeSongUpload = (e) => {
    if (e.target.files.length) {
      setProfile({ ...profile, theme_song: e.target.files[0] });
    }
  };

  // Add country to visited list
  const handleAddCountry = () => {
    if (selectedCountry && !profile.visited_countries.includes(selectedCountry)) {
      setProfile({
        ...profile,
        visited_countries: [...profile.visited_countries, selectedCountry],
      });
    }
  };

  // Remove country from visited list
  const handleRemoveCountry = (countryToRemove) => {
    setProfile({
      ...profile,
      visited_countries: profile.visited_countries.filter((c) => c !== countryToRemove),
    });
  };

  // Save profile updates
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("status", profile.status);
    formData.append("visited_countries", JSON.stringify(profile.visited_countries));

    if (profile.theme_song) {
      formData.append("theme_song", profile.theme_song);
    }

    try {
      await axios.put(`/profiles/${id}`, formData)
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors("Failed to update profile. Please try again.");
    }
  };

  return (
    <Container>
      <h2>Edit Profile</h2>

      {errors && <Alert variant="danger">{errors}</Alert>}

     
      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          type="text"
          name="status"
          value={profile.status}
          onChange={handleChange}
          placeholder="Update your status..."
        />
      </Form.Group>

      <Form.Group controlId="countrySelect">
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

      <Button variant="primary" onClick={handleAddCountry} className="mt-2">
        Add Country
      </Button>

      
      <h4 className="mt-4">Visited Countries:</h4>
      <ul>
        {profile.visited_countries.map((country, index) => (
          <li key={index}>
            {country}{" "}
            <Button variant="danger" size="sm" onClick={() => handleRemoveCountry(country)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>

     
      <Form.Group controlId="themeSong">
        <Form.Label>Upload Theme Song</Form.Label>
        <Form.File
          accept="audio/*"
          onChange={handleThemeSongUpload}
        />
        {profile.theme_song && <p>Current song: {profile.theme_song.name}</p>}
      </Form.Group>

     
      <Button variant="success" onClick={handleSave} className="mt-3">
        Save Profile
      </Button>
    </Container>
  );
}
