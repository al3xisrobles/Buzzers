import { useState, useEffect } from "react"

import {
  ChevronLeft,
  Users,
  MapPin,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import Tavern from "../../../Assets/Dashboard/Tavern.png"
import Tavern2 from "../../../Assets/Dashboard/Tavern2.png"

import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card"
import { Link, useNavigate } from 'react-router-dom'

const events = [
  {
    title: "Backyard Concert",
    date: "3/31",
    org: "Tavern Band",
    imageLoc: Tavern,
    impressions: 400,
    match: "97%",
    location: "Evanston, IL",
    impressionRate: 0.52,
    totalCost: 206.10,
  },
  {
    title: "Philanthropy Event",
    date: "4/14",
    org: "Tavern Band",
    imageLoc: Tavern2,
    impressions: 200,
    match: "92%",
    location: "Evanston, IL",
    impressionRate: 0.50,
    totalCost: 100.0,
  },
  {
    title: "Backyard Concert",
    date: "3/31",
    org: "Tavern Band",
    imageLoc: Tavern,
    impressions: 400,
    match: "97%",
    location: "Evanston, IL",
    impressionRate: 0.52,
    totalCost: 206.10,
  },
  {
    title: "Backyard Concert",
    date: "3/31",
    org: "Tavern Band",
    imageLoc: Tavern,
    impressions: 400,
    match: "97%",
    location: "Evanston, IL",
    impressionRate: 0.52,
    totalCost: 206.10,
  },
]

function DeploymentSummary() {
  const [loading, setLoading] = useState(false);
  const [doneProcessing, setDoneProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setDoneProcessing(true);
      }, 2000);
    }
  }, [loading]);

  useEffect(() => {
    console.log(loading);
    if (doneProcessing) {
      navigate("/allset");
    }
  }, [doneProcessing]);

  return (
    <div className='w-screen h-full md:h-screen flex flex-col sm:flex-row md:items-stretch'>
      {/* Left - Scrollable */}
      <div className='w-full  md:w-[75%] lg:w-[55%] flex flex-col items-center justify-start px-5 pt-[8rem] pb-10 overflow-y-auto hide-scrollbar'>
        <div className='w-full flex flex-row justify-center gap-4'>
          <Link to="/dashboard">
            <ChevronLeft size={38}/>
          </Link>
          <div className='w-full md:w-[75%] lg:w-[60%] max-w-[40rem] flex flex-col gap-6'>
            <h2 className='font-bold text-4xl pb-6'>Deployment Summary</h2>

            {/* Events list */}
            {events.map((event, index) => (
              <div key={index} className='w-full flex flex-col gap-4'>
                <div className='w-full flex flex-row gap-4'>
                  <img src={event.imageLoc} className='max-w-[7rem] h-full object-cover rounded-[0.5rem]' alt="Event name"/>
                  <div className='flex flex-col gap-1'>
                    <h4 className='font-bold text-2xl'>{event.title}</h4>
                    <p>{event.date} | {event.org}</p>
                    <div className='flex flex-col gap-1 opacity-50'>
                      <div className='flex flex-row items-center gap-1'>
                        <Users size={18}/>
                        <p>{event.impressions} people</p>
                      </div>
                      <div className='flex flex-row items-center gap-1'>
                        <MapPin size={18}/>
                        <p>{event.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-row justify-between'>
                  <p>${event.impressionRate} x {event.impressions}</p>
                  <p>${event.totalCost.toFixed(2)}</p>
                </div>
                <div className='h-[1px] w-full bg-black'></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Static */}
      <div className='w-full md:w-[45%] flex flex-col justify-center gap-5 max-w-[35rem] p-10 bg-white'>
        <h4 className='font-semibold text-xl'>Here&apos;s how our process works:</h4>

        <ol className='list-decimal ml-5'>
          <li>Organizers have 48 hours to agree to properly deploy your marketing and confirm the events.</li>
          <li>When the organizer confirms, you’ll be able to pay the invoice directly through the Buzzers platform.</li>
          <li>Pay and ship your product, and that’s it! Buzzers will make sure your marketing is effectively deployed at the event.</li>
          <li>You will be able to see pictures of your sponsored events in your deployment history.</li>
        </ol>

        <Card>
          <CardHeader>
            <CardTitle>Cart breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <p className='text-sm text-muted-foreground'>Avg CPI x Total Impressions</p>
            <div className='w-full flex justify-between'>
              <p>$0.50 x 600 impressions</p>
              <p>$300.00</p>
            </div>
            <div className='h-[1px] my-5 w-full bg-black'></div>
            <div className='w-full flex justify-between'>
              <p>Total <span className='opacity-50'>(USD)</span></p>
              <p>$300.00</p>
            </div>
            {!loading ? (
              <Button className="mt-2" onClick={() => setLoading(true)}>
                Sponsor Tavern
              </Button>
            ) : (
              <Button disabled className="mt-2">
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Loading
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DeploymentSummary
