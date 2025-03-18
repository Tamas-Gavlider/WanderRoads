import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function Confirmation() {
  const currentUser = useCurrentUser(); 
  return (
    <div className="text-center">
      <h2>Preferences successfully created!</h2>
      <p>Your travel preferences have been saved successfully.</p>
      <Link to={`/profiles/${currentUser.profile_id}`} className="btn btn-primary">
        Go back to your profile
      </Link>
    </div>
  );
}

export default Confirmation;
