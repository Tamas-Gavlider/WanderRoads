import React from 'react'
import styles from './App.module.css';
/* import NavBar from "./components/NavBar"; */
import Container from "react-bootstrap/Container";
import {Route,Switch, useLocation} from 'react-router-dom';
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm'
import SignInForm from './pages/auth/SignInForm';
import NavBar from './components/NavBar'
import LandingPageText from './components/LandingPageText';
import Map from './pages/map/Map';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import PostEditForm from './pages/posts/PostEditForm';
import Profile from './pages/profile/Profile';
import TravelPreferenceEditForm from './pages/travel_preference/TravelPreferenceEditForm';
import AddTravelPreference from './pages/travel_preference/AddTravelPreferences';
import EditProfile from './pages/profile/EditProfile';
import TravelRecommendation from './pages/travel_recommendation/TravelRecommendation';
import TravelBuddies from './pages/travel_buddies/TravelBuddies';
import Trip from './pages/trip/Trip';
import AddTrip from './pages/trip/AddTrip';
import UsernameForm from './pages/profile/UsernameForm'
import UserPasswordForm from './pages/profile/UserPasswordForm'


function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || ""
  const location = useLocation(); 
  const isLandingPage = location.pathname === "/"; 

  return (
    <div className={`${styles.App} ${isLandingPage ? styles.LandingBackground : styles.NoBackground}`}>
      < NavBar />
     {
      <Container className={styles.Main}>
      <Switch>
      <Route exact path='/' render={()=> <LandingPageText/>}/>
      <Route exact path='/signin' render={()=> < SignInForm />}/>
      <Route exact path='/signup' render={()=> < SignUpForm/>}/>
      <Route exact path='/map' render={()=> <Map />}/>
      <Route exact path="/profiles/:id/edit/username" render={()=> <UsernameForm />}/>
      <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />}/>
      <Route path="/profiles/:id/edit" render= {()=> <EditProfile />} />
      <Route path="/profiles/:id" render= {()=> <Profile />} />
      <Route path="/trip/create" render={() => <AddTrip />}/>
      <Route path="/trip/" render= {() => <Trip />} />
      <Route path='/travel-preference/:id/edit' render= {()=> <TravelPreferenceEditForm />}/>
      <Route path='/travel-preference/' render= {()=> <AddTravelPreference />}/>
      <Route path='/travel-recommendation/' render= {()=> <TravelRecommendation />}/>
      <Route exact path='/posts/create' render={()=> <PostCreateForm />}/>
      <Route exact path="/posts/:id" component={PostPage} />
      <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
      <Route exact path='/feed' render={()=> <PostsPage 
      message="No results found." 
      filter={`owner__travel_buddies_initiated__owner__profile=${profile_id}&`} />
    }/>
      <Route exact path='/travel-buddies/' render={()=> <TravelBuddies />}/>
      <Route exact path='/logout' render={()=> <h1>Logout</h1>}/>
      <Route render={()=> <p>Page not found!</p>}/>
      </Switch>
     </Container>
     }
    </div>
  );
}

export default App;