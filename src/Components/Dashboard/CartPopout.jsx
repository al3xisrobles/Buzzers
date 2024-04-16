import React from 'react'

import { Button } from "@/components/ui/button"

import Tavern from "../../Assets/Dashboard/Tavern.png"

import {
  X,
  Clock9,
  Users,
  CircleDollarSign,
} from "lucide-react"

import {
  DrawerClose
} from "@/components/ui/drawer"

import SponsorBtn from './SponsorBtn'
import SaveBtn from './SaveBtn'
import { Badge } from '../../../components/ui/badge'

const vibes = [
  "Concert",
  "Outdoors",
  "Feel-good",
  "Upbeat",
  "Daytime"
]

const audienceInsights = [
  "High-achieving students",
  "Partygoers",
  "College",
]

const previousEvents = [
  1,
  2,
  3,
]

function CartPopout() {
  return (
    <>
      <DrawerClose className="absolute z-50 m-8 w-max">
        <X className='text-white' size={36}/>
      </DrawerClose>

      <div className='h-[250px] flex-shrink-0 relative overflow-hidden flex items-center justify-center'>
        <img src={Tavern} alt="Org Photo" className='pointer-events-none w-max'/>
        <div className='absolute inset-0 bg-black bg-opacity-25'></div>

        <div className="px-6 py-3 left-2 bottom-2 absolute">
          <Badge className="bg-secondary text-md h-9 px-5 rounded-[0.5rem] sm:py-1">97% match</Badge>
        </div>
        <div className="px-6 py-3 right-2 bottom-2 absolute">
          <Badge className="bg-haze h-9 px-5 text-md rounded-[0.5rem]">
            <div className="flex flex-row gap-2 items-center">
              <CircleDollarSign/>
              <div className="flex items-center flex-row gap-2">
                <p>$0.50/impression</p>
                <p className='text-sm'>$200.00 total</p>
              </div>
            </div>
          </Badge>
        </div>
      </div>

      <div className='p-8'>
        <div className='flex flex-row justify-between'>
          <h2 className='text-3xl font-bold'>Backyard Concert</h2>
          <div className='flex flex-row gap-2'>
            <SaveBtn/>
            <SponsorBtn/>
          </div>

        </div>

        <p className='text-lg'>3/31 | Tavern Band</p>

        {/* About */}
        <div className='pt-5'>
          <p className='text opacity-50'>ABOUT THIS EVENT</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</p>
        </div>

        <div className='pt-5 flex flex-row justify-between'>
          {/* Metrics */}
          <div>
            <p className='text opacity-50'>METRICS</p>
            <div className='flex flex-row gap-6 py-2'>
              <div className='flex flex-col gap-2'>
                <Clock9/>
                <p>3-4 hr</p>
              </div>
              <div className='flex flex-col gap-2'>
                <Users/>
                <p>400 people</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className='pt-5'>
            <p className='text opacity-50'>EVENT LOCATION</p>
          </div>
        </div>

        {/* Event Vibes */}
        <div className='pt-5'>
          <p className='pb-2 text opacity-50'>EVENT VIBES</p>
          <div className='flex flex-row gap-2'>
            {vibes.map((vibe, index) => {
              return (
                <Badge key={index} className="h-9 rounded-[0.5rem] bg-haze px-5">
                  {vibe}
                </Badge>
              )
            })}
          </div>
        </div>

        {/* Audience Insights */}
        <div className='pt-5'>
          <p className='pb-2 text opacity-50'>AUDIENCE INSIGHTS</p>
          <div className='flex flex-row gap-2'>
            {audienceInsights.map((insight, index) => {
              return (
                <Badge key={index} className="h-9 rounded-[0.5rem] bg-haze px-5">
                  {insight}
                </Badge>
              )
            })}
          </div>
        </div>

        {/* Previous Events */}
        <div className='pt-5'>
          <p className='pb-2 text opacity-50'>PREVIOUS EVENTS FROM TAVERN</p>
          <div className='flex flex-row gap-3'>
            {previousEvents.map((event, index) => {
              return (
                <a href="/dashboard" key={index} className='cursor-pointer hover:opacity-75 transition flex flex-col gap-2'>
                  <img src={Tavern} alt="Org event" className='pointer-events-none w-36 rounded-[0.5rem]'/>
                  <p className='pl-1'>Event name</p>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPopout
