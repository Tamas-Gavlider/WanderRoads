import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import React from 'react';

const UserList = () => {
  const { allProfiles } = useProfileData();
  const { handleFriendRequest, handleUnFriend } = useSetProfileData();

  return (
    <div>
      <h2>All Users</h2>
      {allProfiles?.results?.map((user) => (
        <div key={user.id}>
          <p>{user.username}</p>
          {user.travel_buddies_initiated_id ? (
            <button onClick={() => handleUnFriend(user)}>Unfriend</button>
          ) : (
            <button onClick={() => handleFriendRequest(user)}>Add Travel Buddy</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserList;
