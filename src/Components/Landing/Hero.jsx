import Navbar from './Navbar';
import YellowCurve from "../../Assets/YellowCurve.svg"
import { Button } from "@/components/ui/button"

function Hero() {

  return (
    <div className="relative w-screen h-screen bg-popover border-b flex">
      {/* Navbar will be fixed at the top */}
      <div className="fixed bg-popover md:border-0 top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Hero image container */}
      <div className="px-4 my-auto sm:max-w-6xl mx-auto md:h-screen w-screen">
        <div className="mt-16 md:mt-0 w-full h-full justify-center flex flex-col gap-10 sm:gap-[10rem] md:flex-row items-center">

          {/* Headings */}
          <div className="w-full text-center my-10 md:my-0">
            <div className="text-carbon flex justify-center flex-col gap-4 mx-auto">
              <h1 className="text-4xl md:text-6xl w-full font-bold px-2">Event sponsorship, <span className="text-primary">reimagined</span></h1>
              <h3 className="text-carbon text-2xl w-full px-2">Get free products for your events and get paid.</h3>
              <div className='pt-5 flex flex-col justify-center sm:flex-row gap-3 items-center'>
                <a href="/dashboard" className="hover:opacity-75 transition md:mx-0 w-max rounded-full">
                  <Button className="text-black text-lg px-6 py-6 shadow-input">Sign up for early access</Button>
                </a>
                {/* <p>or <a href="/about" className="font-bold hover:opacity-50 transition">learn more</a></p> */}
              </div>
              <div className='pt-10'>
                <p>Coming August 2024 for colleges opening week.</p>
                <p>Sign up before launch and be the first to get your event sponsored.</p>
              </div>
            </div>
          </div>

          <img src={YellowCurve} className='absolute bottom-0 w-max mx-auto' />
        </div>
      </div>
    </div>
  );
}

export default Hero;
