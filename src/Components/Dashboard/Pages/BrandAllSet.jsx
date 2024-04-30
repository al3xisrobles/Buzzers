import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

function BrandAllSet() {

  const org = "Tavern";

  return (
    <div className='w-screen h-screen flex flex-col max-w-[30rem] text-center mx-auto justify-center items-center gap-6'>
      <h3 className="font-bold text-5xl">You&apos;re all set.</h3>
      <p>We&apos;ve notified {org} of your request for sponsorship. Monitor your Active Deployments to see if they accept and get ready for an awesome event!</p>
      <Link to="/dashboard" className="my-4">
        <Button className="px-20">
          Go to Active Deployments
        </Button>
      </Link>
    </div>
  )
}

export default BrandAllSet
