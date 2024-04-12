import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast';

import { Badge } from "@/components/ui/badge"

import {
  Bookmark,
  Plus,
  Clock9,
  Users,
  MapPin,
  CircleDollarSign,
} from "lucide-react"

function Event(props) {

  let title = props["title"]
  let org = props["org"]
  let desc = props["desc"]
  let date = props["date"]
  let duration = props["duration"]
  let impressions = props["impressions"]
  let impressionRate = props["impressionRate"]
  let totalCost = props["totalCost"]
  let location = props["location"]
  let imageLoc = props["imageLoc"]
  let match = props["match"]

  const [isMounted, setIsMounted] = useState(false);

  // Save button logic
  const [saved, setSaved] = useState(null);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true); // Set the mounted state to true after first render
    } else {
      // Only show toast if it's not the first render
      if (saved) {
        toast.success('Saved to Bookmarks', {
          position: 'top-right'
        });
      } else if (saved === false) {
        toast('Removed from Bookmarks', {
          position: 'top-right'
        });
      }
    }
  }, [saved, isMounted]);

  // Sponsor button logic
  const [sponsored, setSponsored] = useState(null);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true); // Set the mounted state to true after first render
    } else {
      // Only show toast if it's not the first render
      if (sponsored) {
        toast.success('Added to Cart', {
          position: 'top-right'
        });
      } else if (sponsored === false) {
        toast('Removed from Cart', {
          position: 'top-right'
        });
      }
    }
  }, [sponsored, isMounted]);

  return (
    <div className='flex flex-col sm:flex-row gap-4 w-full pb-5'>
      <div className="min-w-[5rem] max-w-[15rem] aspect-h-9">
        <div className="p-2 absolute">
          <Badge className="bg-secondary md:px-3 sm:text-[0.7rem] lg:text-[0.8rem] rounded-[0.4rem] sm:py-1">{match} match</Badge>
        </div>
        <img className="w-full h-auto object-cover" src={imageLoc} alt="Tavern" />
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
          <Button variant="default" className={sponsored ? "bg-secondary" : ""} onClick={() => setSponsored(!sponsored)}>
            <div className='flex gap-2 items-center'>
              {!sponsored ? (
                <>
                  <Plus/>
                  <p>Sponsor</p>
                </>
              ) : (
                <p>Added to Cart</p>
              )}
            </div>
          </Button>
          <Button variant="outline" className={saved ? "bg-gray-100" : ""} onClick={() => setSaved(!saved)}>
            <div className='flex gap-2 items-center'>
              <Bookmark/>
              {!saved ? (
                <p>Save</p>
              ) : (
                <p>Saved</p>
              )}
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Event;
