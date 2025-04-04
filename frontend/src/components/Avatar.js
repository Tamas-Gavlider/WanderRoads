import React, { useState } from "react";
import styles from "../styles/Avatar.module.css";
import Asset from "./Asset";

const Avatar = ({ src, height = 45, text }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <span className={styles.AvatarContainer}>
      {loading && <Asset spinner message="Loading..." />}
      {text}
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="avatar"
        onLoad={handleImageLoad}
        style={loading ? { visibility: "hidden" } : {}}
      />
    </span>
  );
};

export default Avatar;
