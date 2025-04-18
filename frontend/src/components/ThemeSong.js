import React, { useState, useRef } from "react";
import styles from "../styles/ThemeSong.module.css";

export default function ThemeSong(props) {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);
  
  // Toggle mute/unmute: if currently muted, play audio; otherwise, pause it
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={styles.Container}>
      <button onClick={toggleMute} className={styles.Button}>
        <i
          className={`fa-solid ${
            isMuted ? "fa-volume-xmark" : "fa-volume-high"
          }`}
        ></i>
        <p className={styles.Hidden}>hidden text</p>
      </button>
      <audio ref={audioRef} src={props.theme_song} />
    </div>
  );
}
