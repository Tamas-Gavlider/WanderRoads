import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { travelBuddyHelper, unFriendHelper } from "../utils/utils";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    allProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();

  const handleFriendRequest = async (clickedProfile) => {
    if (clickedProfile.travel_buddies_initiated_id) {
      console.log("Already a travel buddy.");
      return;
    }

    try {
      const { data } = await axiosRes.post("/travel-buddy/", {
        travel_buddy: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        allProfiles: {
          results: prevState.allProfiles.results.map((profile) =>
            travelBuddyHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnFriend = async (clickedProfile) => {
    if (!clickedProfile.travel_buddies_initiated_id) {
      console.log("Not a travel buddy.");
      return;
    }

    try {
      await axiosRes.delete(`/travel-buddy/${clickedProfile.travel_buddies_initiated_id}/`);

      setProfileData((prevState) => ({
        ...prevState,
        allProfiles: {
          results: prevState.allProfiles.results.map((profile) =>
            unFriendHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/");
        setProfileData((prevState) => ({
          ...prevState,
          allProfiles: data,
        }));
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFriendRequest, handleUnFriend }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
