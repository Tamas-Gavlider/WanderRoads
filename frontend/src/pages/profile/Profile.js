import React, { useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import axios from 'axios'

export default function Profile() {
    const [profile, setProfile] = useState(null)

    if (useCurrentUser) {
      setProfile()
    }

  return (
    <div>Profile</div>
  )
}
