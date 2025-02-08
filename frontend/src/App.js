import styles from './App.module.css';
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import {Route,Switch} from 'react-router-dom'
import './api/axiosDefaults'

function App() {
  return (
    <div className={styles.App}>
     < NavBar />
     <Container>
      <Switch>
      <Route exact path='/' render={()=> <h1>Map</h1>}/>
      <Route exact path='/profile' render={()=> <h1>Profile</h1>}/>
      <Route exact path='/posts' render={()=> <h1>Posts</h1>}/>
      <Route exact path='/travel-buddies' render={()=> <h1>Travel Buddies</h1>}/>
      <Route exact path='/logout' render={()=> <h1>Logout</h1>}/>
      <Route render={()=> <p>Page not found!</p>}/>
      </Switch>
     </Container>
    </div>
  );
}

export default App;