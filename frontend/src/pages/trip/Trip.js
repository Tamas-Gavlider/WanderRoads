import React, {useState} from 'react';
import { useCurrentUser } from "../../contexts/CurrentUserContext";

export default function Trip() {
    const currentUser = useCurrentUser();
    const [trip , setTrip] = useState(null)

  return (
    <div>Trip</div>
  )
}
