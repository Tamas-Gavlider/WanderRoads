import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


export default function TravelPreferences() {
  
  const {id} = useParams()
  const currentUser = useCurrentUser();
  const [preferences , setPreferences] = useState(null);
  const isOwner = currentUser?.username === preferences?.owner;

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`/travel-preference/1/`)  
        .then((response) => {
          console.log("Travel preferences:", response.data);
          setPreferences(response.data);
        })
        .catch((error) => console.error("Error", error));
    }
  }, [currentUser]);
  
  return (
    <div>
      
      {preferences ? (
        <div>
        <p>Travel preferences</p>
          <p><strong>Continent:</strong> {preferences.preferred_continent}</p>
          <p><strong>Climate:</strong> {preferences.climate}</p>
          <p><strong>Activity:</strong> {preferences.activity}</p>
          <p><strong>Budget:</strong> {preferences.budget}</p>
          <p><strong>Travel Style:</strong> {preferences.travel_style}</p>
          <p><strong>Duration:</strong> {preferences.duration}</p>
          <Link to={`/travel-preference/1/edit`}>
          Edit preferences</Link>
        </div>
      ) : (
        <p>Loading...</p> 
      )}
    </div>
  );
}