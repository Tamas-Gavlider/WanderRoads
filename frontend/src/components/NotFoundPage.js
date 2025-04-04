import React from "react";
import { useHistory } from "react-router-dom";
import buttonStyles from "../styles/Button.module.css";
import styles from "../styles/NotFoundPage.module.css";

const NotFoundPage = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push("/");
  };

  return (
    <div className={` text-center ${styles.Container}`}>
      <div>
        <h1 className={`${styles.NotFound}`}>404</h1>
        <div className={`mb-3 ${styles.Text}`}>
          <h2 className="display-4">
            Looks like you&apos;ve wandered off the beaten path!
          </h2>
          <p className={styles.SubText}>
            Not all who wander are lost... but you are right now.
          </p>
        </div>
        <button className={buttonStyles.Button} onClick={handleRedirect}>
          Get back on track
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
