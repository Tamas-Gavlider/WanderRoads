import styles from './App.module.css';
/* import NavBar from "./components/NavBar"; */
import Container from "react-bootstrap/Container";
import {Route,Switch, useLocation} from 'react-router-dom';
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm'
import SignInForm from './pages/auth/SignInForm';
import NavBar from './components/NavBar'
import LandingPage from './components/LandingPage';
import Map from './pages/map/Map';

function App() {

  const location = useLocation(); 
  const isLandingPage = location.pathname === "/"; 

  return (
    <div className={`${styles.App} ${isLandingPage ? styles.LandingBackground : styles.NoBackground}`}>
      < NavBar />
     {
      <Container>
      <Switch>
      <Route exact path='/' render={()=>  <LandingPage/>}/>
      <Route exact path='/signin' render={()=> < SignInForm />}/>
      <Route exact path='/signup' render={()=> < SignUpForm/>}/>
      <Route exact path='/map' render={()=> <Map />}/>
      <Route exact path='/profile' render={()=> <h1>Profile Test</h1>}/>
      <Route exact path='/posts' render={()=> <h1>Posts</h1>}/>
      <Route exact path='/travel-buddies' render={()=> <h1>Travel Buddies</h1>}/>
      <Route exact path='/logout' render={()=> <h1>Logout</h1>}/>
      <Route render={()=> <p>Page not found!</p>}/>
      </Switch>
     </Container>
     }
    </div>
  );
}

export default App;