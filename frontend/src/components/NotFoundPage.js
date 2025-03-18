import React from 'react';
import { useHistory } from 'react-router-dom';
import buttonStyles from '../styles/Button.module.css'; 
import styles from '../styles/NotFoundPage.module.css'; 

const NotFoundPage = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push('/'); 
  };

  return (
    <div className={` text-center ${styles.Container}`}>
      <div className={styles.Overlay}>
        <div className={`mb-3 ${styles.Text}`}>
          <h2 className={`display-4 ${styles.Heading}`}>Looks like you've wandered off the beaten path!</h2>
          <p>Not all who wander are lost... but you are right now.</p>
        </div>
        <button className={buttonStyles.Button} onClick={handleRedirect}>
          Get back on track
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
