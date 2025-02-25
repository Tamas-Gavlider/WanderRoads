import React, {useState, useRef} from "react";

export default function ThemeSong(props) {
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef(null);
    
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
    <div>
          <button onClick={toggleMute}>
            <i className={`fa-solid ${isMuted ? "fa-volume-xmark" : "fa-volume-high"}`}></i>
          </button>
          <audio ref={audioRef} src={props.theme_song} />
        </div>
  )
}
