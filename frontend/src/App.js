import styles from './App.module.css';
/* import NavBar from "./components/NavBar"; */
import Container from "react-bootstrap/Container";
import {Route,Switch} from 'react-router-dom';
import axios from 'axios'
import { createContext, useEffect, useState } from "react";
import Home from './components/Home';
import SignUpForm from './pages/auth/SignUpForm'
import SignInForm from './pages/auth/SignInForm';
import NavBar from './components/NavBar'

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
 
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
    <div className={styles.App}>
     {
      <Container>
      <Switch>
      <Route exact path='/' render={()=> <Home />}/>
      <Route exact path='/signin' render={()=> < SignInForm />}/>
      <Route exact path='/signup' render={()=> < SignUpForm/>}/>
      <Route exact path='/map' render={()=> <h1>Map</h1>}/>
      <Route exact path='/profile' render={()=> <h1>Profile</h1>}/>
      <Route exact path='/posts' render={()=> <h1>Posts</h1>}/>
      <Route exact path='/travel-buddies' render={()=> <h1>Travel Buddies</h1>}/>
      <Route exact path='/logout' render={()=> <h1>Logout</h1>}/>
      <Route render={()=> <p>Page not found!</p>}/>
      </Switch>
     </Container>
     }
     {currentUser && <NavBar />}
    </div>
    </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;