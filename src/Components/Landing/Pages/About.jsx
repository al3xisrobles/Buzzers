import EventCreation from '../../../Assets/Landing/About/EventCreation.png';
import Product from '../../../Assets/Landing/About/Product.png';
import Paid from '../../../Assets/Landing/About/Paid.png';
import { Button } from "@/components/ui/button";

function About() {
  return (
    <div className='bg-salt w-screen h-screen'>
      <div className='w-full h-full'>
        <div className='w-full text-center px-4 max-h-[50rem] h-[75%] flex flex-col gap-4 justify-center items-center'>
          <h1 className='text-6xl font-bold'>Here&apos;s how it works</h1>
          <h3 className='text-3xl'>Take your organization to the next level: <span className='bg-gradient-to-r from-[#FFD54F] to-[#E5B200] text-transparent bg-clip-text opacity-75'>get sponsored and get paid.</span></h3>
        </div>

        <div className='mt-[5rem] w-full min-h-[25rem] sm:h-[25rem] flex flex-col px-4 sm:flex-row justify-evenly bg-haze py-10'>
          <div className='max-w-screen-2xl w-full mx-auto flex flex-col sm:flex-row justify-evenly items-center'>
            <div className='my-auto max-w-[36rem] gap-4 flex flex-col justify-center'>
              <h4 className='text-5xl font-semibold'>Post events in 2 minutes</h4>
              <p className='text-lg'>We&apos;ll guide you through our 2 minute posting process, and help you show off your audience to brands.</p>
              <a href="/dashboard" className='w-max'>
                <Button>
                  Get Started
                </Button>
              </a>
            </div>
            <div>
              <img src={EventCreation} alt="Event creation" className="pointer-events-none mt-8 sm:mt-0 sm:h-[28rem] object-contain" />
            </div>
          </div>
        </div>

        <div className='w-full mt-[5rem] pr-4 sm:my-40 min-h-[25rem] sm:h-[40rem] flex flex-col sm:flex-row justify-between'>
          <div className='max-w-screen-2xl w-full mx-auto flex flex-col gap-10 sm:flex-row justify-evenly sm:justify-between items-center'>
            <div>
              <img src={Product} alt="Product" className="pointer-events-none" />
            </div>
            <div className='pl-4 max-w-[38rem] gap-4 flex flex-col text-right items-end justify-center sm:mr-10 lg:mr-20'>
              <h4 className='text-5xl font-semibold'>We&apos;ll find you the perfect product sponsor</h4>
              <p className='text-lg'>We use AI to match you to an ideal Buzzers brand partner. Review and confirm your agreement, and we&apos;ll get you the product for your event!</p>
              <a href="/dashboard" className='w-max'>
                <Button>
                  Get Started
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className='mt-[5rem] sm:mt-[10rem] w-full min-h-[28rem] sm:h-[28rem] flex flex-col px-4 sm:flex-row justify-evenly bg-haze py-10'>
          <div className='max-w-screen-2xl w-full mx-auto flex flex-col gap-10 sm:flex-row justify-evenly items-center'>
            <div className='my-auto max-w-[37rem] gap-4 flex flex-col justify-center'>
              <h4 className='text-5xl font-semibold'>Get paid for being a brand partner, every time</h4>
              <p className='text-lg'>Upload photos of your event and Buzzers will pay you right away. That&apos;s free products for your event, and quick money to your pocket!</p>
              <a href="/dashboard" className='w-max'>
                <Button>
                  Get Started
                </Button>
              </a>
            </div>
            <div>
              <img src={Paid} alt="Get paid" className="pointer-events-none sm:h-[31rem]" />
            </div>
          </div>
        </div>

        <div className='w-full px-4 sm:mt-0 text-center py-32 flex flex-col gap-4 justify-center items-center'>
          <h3 className='text-3xl'>Sign up before launch and be at the top of the organizer list.</h3>
          <a href="/dashboard" className='w-max'>
            <Button className="px-20">
              Sign up for early access
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
