import { useEffect, useState } from 'react';
import Event from '../../Event'
import { useAuth } from '../../Auth/AuthContext'; // Make sure the path is correct


function EventDiscovery() {
  const { userAttributes, loading } = useAuth();
  const [brandName, setBrandName] = useState('Brand');

  useEffect(() => {
    if (!loading) {
      const name = userAttributes['custom:brand_name'];
      if (name) {
        setBrandName(name);
      }
    }
  }, [loading, userAttributes]); // Depend on userAttributes to update when they do

  return (
    <div>
      <h1 className='text-3xl pb-4'><span className='font-bold'>{brandName}’s</span> AI-Targeted Events</h1>

      <Event
        title="Backyard Concert"
        org="Tavern Band"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        duration="3-4 hr"
        impressions="400 people"
        match="97%"
        location="Evanston, IL"
      />

      <hr className='border-obsidian opacity-50'/>
    </div>
  )
}

export default EventDiscovery;
