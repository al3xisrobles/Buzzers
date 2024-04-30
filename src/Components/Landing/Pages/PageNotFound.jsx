import Search from "../../../Assets/UndrawSearch.svg";
import { Button } from "@/components/ui/button"

function PageNotFound() {

  return (
    <div className="relative w-screen border-b" id="how-it-works">

      {/* Hero image container */}
      <div className="px-4 text-center h-screen w-screen">
        <div className="flex items-center px-10 flex-row justify-center h-full">
          <div className="flex px-4 sm:px-10 w-[80%] lg:px-32 text-left flex-col gap-4 items-start">
            <h2 className='text-5xl font-bold'>404: Page Not Found</h2>
            <p className='text-lg'>The page you are looking for doesn&apos;t exist. Try to find what you&apos;re looking for on our homepage by clicking the button below.</p>
            <a href="/" className='mt-6 w-max'>
              <Button>
                Go Home
              </Button>
            </a>
          </div>
          <div className="hidden sm:flex justify-center items-center">
            <img src={Search} className='w-[30rem]' alt="Searching"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
