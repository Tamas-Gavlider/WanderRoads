import React from "react";
import styles from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <div className="position-relative w-100 overflow-hidden" style={{ height: "80px" }}>
      <i className={`fa-solid fa-plane ${styles.airplane}`}></i>
    </div>
  );
};

export default Loading;
