import React from "react";
import styles from "./App.module.css";
import Container from "react-bootstrap/Container";
import { Route, Switch, useLocation } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import NavBar from "./components/NavBar";
import LandingPageText from "./components/LandingPageText";
import Map from "./pages/map/Map";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import Profile from "./pages/profile/Profile";
import Profiles from "./pages/profile/Profiles";
import TravelPreferenceEditForm from "./pages/travel_preference/TravelPreferenceEditForm";
import AddTravelPreference from "./pages/travel_preference/AddTravelPreferences";
import TravelRecommendation from "./pages/travel_recommendation/TravelRecommendation";
import Trip from "./pages/trip/Trip";
import TripEditForm from "./pages/trip/TripEditForm";
import AddTrip from "./pages/trip/AddTrip";
import UsernameForm from "./pages/profile/UsernameForm";
import UserPasswordForm from "./pages/profile/UserPasswordForm";
import ProfileImageChangeForm from "./pages/profile/ProfileImageChangeForm";
import EditStatus from "./pages/profile/EditStatus";
import AddCountry from "./pages/profile/AddCountry";
import ChangeThemeSong from "./pages/profile/ChangeThemeSong";
import Confirmation from "./pages/travel_preference/Confirmation";
import NotFoundPage from "./components/NotFoundPage";
import landingPageImage from "./assets/landing_page.webp";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div
      style={{
        backgroundImage: isLandingPage ? `url(${landingPageImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      className={`${styles.App} ${styles.LandingBackground}`}
    >
      <NavBar />
      {
        <Container fluid className={styles.Main}>
          <Switch>
            <Route exact path="/map" render={() => <Map />} />
            <Route exact path="/" render={() => <LandingPageText />} />
            {!currentUser && (
              <>
                <Route exact path="/signin" render={() => <SignInForm />} />
                <Route exact path="/signup" render={() => <SignUpForm />} />
              </>
            )}
            <Route exact path="/confirmation" render={() => <Confirmation />} />
            <Route
              path="/profiles/:id/edit/status"
              render={() => <EditStatus />}
            />
            <Route
              path="/profiles/:id/edit/countries"
              render={() => <AddCountry />}
            />
            <Route
              path="/profiles/:id/edit/theme-song"
              render={() => <ChangeThemeSong />}
            />
            <Route
              path="/profiles/:id/change-image"
              render={() => <ProfileImageChangeForm />}
            />
            <Route
              exact
              path="/profiles/:id/edit/username"
              render={() => <UsernameForm />}
            />
            <Route
              exact
              path="/profiles/:id/edit/password"
              render={() => <UserPasswordForm />}
            />
            <Route path="/profiles/:id" render={() => <Profile />} />
            <Route path="/trip/:id/edit" render={() => <TripEditForm />} />
            <Route path="/trip/create" render={() => <AddTrip />} />
            <Route path="/trip/" render={() => <Trip />} />
            <Route
              path="/travel-preference/:id/edit"
              render={() => <TravelPreferenceEditForm />}
            />
            <Route
              path="/travel-preference/"
              render={() => <AddTravelPreference />}
            />
            <Route
              path="/travel-recommendation/"
              render={() => <TravelRecommendation />}
            />
            <Route
              exact
              path="/posts/create"
              render={() => <PostCreateForm />}
            />
            <Route exact path="/posts/:id" component={PostPage} />
            <Route
              exact
              path="/posts/:id/edit"
              render={() => <PostEditForm />}
            />
            <Route
              exact
              path="/feed"
              render={() => (
                <PostsPage
                  message="No results found."
                  filter={`owner__travel_buddies_initiated__owner__profile=${profile_id}&`}
                />
              )}
            />
            <Route exact path="/travelers/" render={() => <Profiles />} />
            <Route exact path="/logout" render={() => <h1>Logout</h1>} />
            <Route render={() => <NotFoundPage />} />
          </Switch>
        </Container>
      }
    </div>
  );
}

export default App;
