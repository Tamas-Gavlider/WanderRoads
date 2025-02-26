import React, { useState } from 'react';
import axios from 'axios';
import { useCurrentUser } from '../../contexts/CurrentUserContext'; 

export default function AddTravelPreference() {
  const currentUser = useCurrentUser();  
  const [formData, setFormData] = useState({
    preferred_continent: 'ANY',
    climate: 'ANY',
    activity: 'ANY',
    budget: 'ANY',
    travel_style: 'ANY',
    duration: 'ANY',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/travel-preference/', formData, {
      });
      console.log('Travel Preference Created:', response.data);
    } catch (error) {
      console.error('Error creating travel preference:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Add Your Travel Preferences</h2>
      <form onSubmit={handleSubmit}>
        <label>Preferred Continent</label>
        <select name="preferred_continent" value={formData.preferred_continent} onChange={handleChange}>
          <option value="ANY">Any</option>
          <option value="AF">Africa</option>
          <option value="NA">North America</option>
          <option value="OC">Oceania</option>
          <option value="AN">Antarctica</option>
          <option value="AS">Asia</option>
          <option value="EU">Europe</option>
          <option value="SA">South America</option>
        </select>
        
        <label>Climate</label>
        <select name="climate" value={formData.climate} onChange={handleChange}>
          <option value="ANY">Any</option>
          <option value="HOT">Hot</option>
          <option value="COLD">Cold</option>
          <option value="TROPICAL">Tropical</option>
          <option value="MILD">Mild</option>
        </select>

        <label>Activity</label>
        <select name="activity" value={formData.activity} onChange={handleChange}>
          <option value="ANY">Any</option>
          <option value="CULTURE">Culture & History</option>
          <option value="NATURE">Nature & Wildlife</option>
          <option value="BEACH">Beaches & Islands</option>
          <option value="ADVENTURE">Adventure & Hiking</option>
          <option value="CITY">City & Nightlife</option>
          <option value="FOOD">Food & Culinary</option>
        </select>

        <label>Budget</label>
        <select name="budget" value={formData.budget} onChange={handleChange}>
          <option value="ANY">Any</option>
          <option value="LOW">Budget-Friendly</option>
          <option value="MEDIUM">Mid-Range</option>
          <option value="HIGH">Luxury</option>
        </select>

        <label>Travel Style</label>
        <select name="travel_style" value={formData.travel_style} onChange={handleChange}>
          <option value="ANY">Any</option>
          <option value="SOLO">Solo Travel</option>
          <option value="FAMILY">Family</option>
          <option value="BACKPACKING">Backpacking</option>
          <option value="LUXURY">Luxury Travel</option>
        </select>

        <label>Duration</label>
        <select name="duration" value={formData.duration} onChange={handleChange}>
          <option value="ANY">Any</option>
          <option value="WEEKEND">Weekend</option>
          <option value="ONE_WEEK">1 Week</option>
          <option value="TWO_WEEKS">2 Weeks</option>
          <option value="MONTH">1 Month</option>
        </select>

        <button type="submit" disabled={isSubmitting}>Create Preferences</button>
      </form>
    </div>
  );
}