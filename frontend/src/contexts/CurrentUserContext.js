import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get("/dj-rest-auth/user/");
      setCurrentUser(data.user);
      console.log(currentUser)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);
  
  useEffect(() => {
    console.log("Current user updated:", currentUser);
  }, [currentUser]);

  useMemo(() => {

  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};