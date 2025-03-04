import React, {useState, useEffect} from 'react';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import axios from 'axios'
import { Link } from 'react-router-dom/cjs/react-router-dom';

export default function Trip() {
    const currentUser = useCurrentUser();
    const [trip , setTrip] = useState(null)
    useEffect(() =>{
        if(currentUser){
       axios.get('/trip/').then((response) =>{
        console.log('Trip: ',response.data);
        setTrip(response.data);
       })
       .catch((error) => {
        console.error("Error fetching travel preferences:", error);
        })
    }
}, [currentUser]);

  return (
    <div>
        <h2>Upcoming Trips</h2>
        <Link to="/trip/create">
        Add Trip
        </Link>

    </div>
  )
}
