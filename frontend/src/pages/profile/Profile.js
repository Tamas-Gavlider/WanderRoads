import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProfile } from "../../api/profileApi";

const Profile = () => {
  const { profileId } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchProfile(profileId, setProfileData);
    console.log(profileData)
  }, [profileId]);

  if (!profileData) return <p>Loading...</p>;

  const { id, image } = profileData.pageProfile.results[0];

  return (
    <div>
      <h2>Profile ID: {id}</h2>
      <img src={image} alt="Profile" width={150} height={150} />
    </div>
  );
};

export default Profile;