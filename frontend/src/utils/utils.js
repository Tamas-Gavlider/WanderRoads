import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const travelBuddyHelper = (profile, clickedProfile, travel_buddies_initiated_id) => {
  return profile.id === clickedProfile.id
    ? // This is the profile I clicked on,
      // update its travel buddy count and set its travel buddy id
      {
        ...profile,
        travel_buddies_received_count: profile.travel_buddies_received_count + 1,
        travel_buddies_initiated_id,
      }
    : profile.is_owner
    ? // This is the profile of the logged in user
      // update its travel buddy count
      { ...profile, travel_buddies_initiated_count: profile.travel_buddies_initiated_count + 1 }
    : // this is not the profile the user clicked on or the profile
      // the user owns, so just return it unchanged
      profile;
};

export const unFriendHelper = (profile, clickedProfile) => {
  return {
    ...profile,
    travel_buddies_initiated_id: profile.travel_buddies_initiated_id.filter(
      (id) => id !== clickedProfile.id
    ),
    travel_buddies_received_id: profile.travel_buddies_received_id.filter(
      (id) => id !== clickedProfile.id
    ),
  };
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.access).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};