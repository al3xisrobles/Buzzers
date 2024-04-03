import React from 'react'
import Tavern from "../../Assets/Dashboard/Tavern.png"
import Clock from '../../Assets/Dashboard/clock.svg'
import People from '../../Assets/Dashboard/people.svg'
import Puzzle from '../../Assets/Dashboard/puzzle.svg'
import { Button } from "@/components/ui/button"
import Cart from "../../Assets/Dashboard/cart.svg"
import Bookmark from "../../Assets/Dashboard/bookmark.svg"

function Event(props) {

  let title = props["title"]
  let org = props["org"]
  let desc = props["desc"]
  let duration = props["duration"]
  let impressions = props["impressions"]
  let match = props["match"]

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
        <div className='flex flex-row gap-3'>
          <div className='flex flex-col gap-2'>
            <img src={Clock} className="h-5" alt="clock"/>
            <p className='text-[#20201F] opacity-50'>{duration}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <img src={People} className="h-5" alt="clock"/>
            <p className='text-[#20201F] opacity-50'>{impressions}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <img src={Puzzle} className="h-5" alt="clock"/>
            <p className='text-[#20201F] opacity-50'>{match}</p>
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <Button variant="default">
            <img className="h-5 mr-2" src={Cart} alt="Cart"/>
            Add to Cart
          </Button>
          <Button variant="outline">
            <img className="h-5 mr-2" src={Bookmark} alt="Bookmark"/>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Event
