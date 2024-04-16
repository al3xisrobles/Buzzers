import { Badge } from "@/components/ui/badge"

import {
  Clock9,
  Users,
  MapPin,
  CircleDollarSign,
} from "lucide-react"
import SponsorBtn from "./SponsorBtn";
import SaveBtn from "./SaveBtn";

function Event(props) {

  // Props destructuring for cleanliness
  const { title, org, desc, date, duration, impressions, impressionRate, totalCost, location, imageLoc, match } = props;

  return (
    <div className='flex flex-col sm:flex-row gap-4 w-full pb-5'>
      <div className="min-w-[5rem] max-w-[15rem] aspect-h-9">
        <div className="p-2 absolute">
          <Badge className="bg-secondary md:px-3 sm:text-[0.7rem] lg:text-[0.8rem] rounded-[0.4rem] sm:py-1">{match} match</Badge>
        </div>
        <img className="w-full h-auto object-cover rounded-[0.5rem]" src={imageLoc} alt="Tavern" />
      </div>
      <div className='flex flex-col justify-around'>
        <div className='flex pb-2 flex-col'>
          <div className="flex flex-col sm:flex-row justify-between">
            <h2 className='font-bold text-3xl'>{title}</h2>
            <Badge className="bg-haze my-4 sm:my-0 rounded-[0.5rem]">
              <div className="flex flex-row gap-2 items-center">
                <CircleDollarSign/>
                <div className="flex items-end flex-col gap-1">
                  <p className="font-bold">${impressionRate}0/impression</p>
                  <p>${totalCost}.00</p>
                </div>
              </div>
            </Badge>
          </div>
          <div className='flex flex-row gap-2 text-xl pb-2'>
            <p>{date} | {org}</p>
          </div>
          <p>{desc}</p>
        </div>

        {/* Stats */}
        <div className='flex py-1 flex-row gap-3 text-[#20201F] opacity-75'>
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

        <div className="flex pt-2 flex-row gap-3">
          <SponsorBtn/>
          <SaveBtn/>
        </div>
      </div>
    </div>
  )
}

export default Event;
