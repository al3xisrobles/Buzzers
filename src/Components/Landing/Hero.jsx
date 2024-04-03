import Navbar from './Navbar';
import Calendar from "../../Assets/UndrawCalendar.svg";
import { Button } from "@/components/ui/button"

function Hero() {

  return (
    <div className="relative w-screen bg-popover border-b">
      {/* Navbar will be fixed at the top */}
      <div className="fixed bg-popover md:border-0 top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Hero image container */}
      <div className="px-4 max-w-6xl mx-auto md:h-screen h-max w-screen">
        <div className="mt-16 md:mt-0 w-full h-full justify-center flex flex-col gap-10 sm:gap-[10rem] md:flex-row items-center">

          {/* Headings */}
          <div className="w-full text-center md:text-left my-10 md:my-0 md:w-1/2">
            <div className="text-carbon flex max-w-[500px] justify-center flex-col gap-4 mx-auto">
              <h1 className="text-4xl md:text-5xl w-full font-bold px-2">Event sponsorship made easy for <span className="text-primary">brands</span> and <span className="text-honeycomb">organizers.</span></h1>
              <h3 className="text-carbon w-full px-2">Reinventing event sponsorship with unprecedented access and efficiency for brands and organizers. Buzzers turns every event into an opportunity for sponsorship.</h3>
              <div className='flex flex-col sm:flex-row gap-3 items-center'>
                <a href="/dashboard" className="hover:opacity-75 transition mx-auto md:mx-0 w-max rounded-full">
                  <Button className="text-black">Get Started for Free</Button>
                </a>
                <p>or <a href="/" className="font-bold hover:opacity-50 transition">learn more</a></p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="z-40 flex flex-col gap-4 items-center justify-center">
            <img src={Calendar} className="w-[25rem]" alt="Calendar"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
