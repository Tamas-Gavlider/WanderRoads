import { axiosReq } from "../api/axiosDefaults";

export const fetchProfile = async (profileId, setProfileData) => {
  try {
    const { data } = await axiosReq.get(`/profiles/${profileId}/`);
    setProfileData({
      pageProfile: { results: [data] },
    });
  } catch (err) {
    console.log(err);
  }
};