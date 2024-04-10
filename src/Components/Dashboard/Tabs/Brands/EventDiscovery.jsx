import Event from '../../Event'

function EventDiscovery() {
  return (
    <div>
      <h1 className='text-3xl pb-4'><span className='font-bold'>Olipop’s</span> AI-Targeted Events</h1>

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

export default EventDiscovery
