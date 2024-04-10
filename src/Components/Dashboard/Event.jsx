import Tavern from "../../Assets/Dashboard/Tavern.png"
import { Button } from "@/components/ui/button"

import {
  Bookmark,
  Plus,
  Clock9,
  Users,
  MapPin
} from "lucide-react"

function Event(props) {

  let title = props["title"]
  let org = props["org"]
  let desc = props["desc"]
  let duration = props["duration"]
  let impressions = props["impressions"]
  let location = props["location"]
  // let match = props["match"]

  return (
    <div className='flex flex-row gap-4 w-full pb-5'>
      <img className="w-[18rem]" src={Tavern} alt="Tavern" />
      <div className='flex flex-col justify-around'>
        <div className='flex flex-col'>
          <h2 className='font-bold text-3xl'>{title}</h2>
          <h3 className='font-bold text-xl pb-2'>{org}</h3>
          <p>{desc}</p>
        </div>

        {/* Stats */}
        <div className='flex flex-row gap-3 text-[#20201F] opacity-75'>
          <div className='flex flex-col gap-2'>
            <Clock9/>
            <p>{duration}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <Users/>
            <p>{impressions}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <MapPin/>
            <p>{location}</p>
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <Button variant="default">
            <div className='flex gap-2 items-center'>
              <Plus/>
              Sponsor
            </div>
          </Button>
          <Button variant="outline">
            <div className='flex gap-2 items-center'>
              <Bookmark/>
              Save
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Event;
