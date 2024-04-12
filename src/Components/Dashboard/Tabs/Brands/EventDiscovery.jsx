import { useEffect, useState } from 'react';
import Event from '../../Event'
import { useAuth } from '../../Auth/AuthContext'; // Make sure the path is correct
import Tavern from "../../../../Assets/Dashboard/Tavern.png"
import Tavern2 from "../../../../Assets/Dashboard/Tavern2.png"

function EventDiscovery() {
  const { userAttributes, loading } = useAuth();
  const [brandName, setBrandName] = useState('Brand');

  const events = [
    {
      title: "Backyard Concert",
      date: "3/31",
      org: "Tavern Band",
      imageLoc: Tavern,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      duration: "3-4 hr",
      impressions: "400 people",
      match: "97%",
      location: "Evanston, IL",
      impressionRate: 0.50,
      totalCost: 200.0,
    },
    {
      title: "Philanthropy Event @ Good To Go",
      date: "4/14",
      org: "Tavern Band",
      imageLoc: Tavern2,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      duration: "2-3 hr",
      impressions: "200 people",
      match: "92%",
      location: "Evanston, IL",
      impressionRate: 0.50,
      totalCost: 100.0,
    },
  ]

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

      {events.map((event, index) => {
        return (
          <div key={index}>
            <hr className='border-obsidian opacity-50 mb-5'/>
            <Event
              title={event["title"]}
              org={event["org"]}
              desc={event["desc"]}
              date={event["date"]}
              duration={event["duration"]}
              totalCost={event["totalCost"]}
              impressions={event["impressions"]}
              impressionRate={event["impressionRate"]}
              location={event["location"]}
              match={event["match"]}
              imageLoc={event["imageLoc"]}
            />
          </div>
        )
      })}

      {events.length == 0 &&
        <div className='w-full mt-[35vh] text-center text-2xl opacity-50'>
          <p>No events yet :(</p>
        </div>
      }

    </div>
  )
}

export default EventDiscovery;
