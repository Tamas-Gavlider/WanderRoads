import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Confirmation.module.css";

function Confirmation() {
  const currentUser = useCurrentUser();
  return (
    <div className={`text-center ${styles.Container}`}>
      <h2 className={styles.Header}>Preferences successfully created!</h2>
      <p>Your travel preferences have been saved successfully.</p>
      <Link
        to={`/profiles/${currentUser.profile_id}`}
        className={`btn ${btnStyles.Button}`}
      >
        Go back to your profile
      </Link>
    </div>
  );
}

export default Confirmation;
