import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useParams, useHistory } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import EditStatus from "./EditStatus";
import AddCountry from "./AddCountry";
import ChangeThemeSong from "./ChangeThemeSong";

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
      
      <EditStatus status={profile.status} handleChange={handleChange} />
      <AddCountry
        countries={countries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        visitedCountries={profile.visited_countries}
        handleAddCountry={handleAddCountry}
        handleRemoveCountry={handleRemoveCountry}
      />
      <ChangeThemeSong
        themeSong={profile.theme_song}
        handleThemeSongUpload={handleThemeSongUpload}
      />

      <Button variant="success" onClick={handleSave} className={`mt-3 ${btnStyles.Button}`}>
        Save Profile
      </Button>
    </Container>
  );
}
