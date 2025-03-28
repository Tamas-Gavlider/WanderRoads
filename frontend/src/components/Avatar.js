import React, { useState } from "react";
import styles from "../styles/Avatar.module.css";
import { Spinner } from "react-bootstrap"; // Import the Spinner component

const Avatar = ({ src, height = 45, text }) => {
  const [loading, setLoading] = useState(true); // State to manage loading status

  const handleImageLoad = () => {
    setLoading(false); // Set loading to false once the image is loaded
  };

  return (
    <span>
      {loading && <Spinner animation="border" variant="danger" />} 
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="avatar"
        onLoad={handleImageLoad}
        style={loading ? { visibility: "hidden" } : {}}
      />
      {text}
    </span>
  );
};

export default Avatar;
