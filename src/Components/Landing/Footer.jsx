// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInstagram, faTiktok, faLinkedin } from '@fortawesome/free-brands-svg-icons';
// import toast, { Toaster } from 'react-hot-toast';
import FullLogoWhite from "../../Assets/FullLogoSalt.svg"

// function copyToClipboard() {
//   // Copy the text inside the text field
//   navigator.clipboard.writeText("hello@billed-app.com");

//   // Alert the copied text
//   toast.success("Email copied to clipboard", {
//     position: 'bottom-left',
//     iconTheme: {
//       primary: '#00A97F'
//     }
//   });
// }

function Footer() {

  return (
    <footer className="bg-obsidian pt-5 pb-10 text-salt w-screen">

      <div className='w-[80%] mx-auto flex flex-col items-start'>
        {/* <div className="w-full mx-auto max-w-6xl py-12 px-6 flex gap-20 items-start lg:px-8">

          <div className="flex gap-4 sm:mt-0 flex-col fa-lg items-center justify-center">
            <a href="https://www.instagram.com/billed.app" rel="noreferrer" target="_blank" className="m-0 transition hover:opacity-75">
              <FontAwesomeIcon icon={faInstagram}/>
            </a>
            <a href="https://linkedin.com/company/99340415" rel="noreferrer" target="_blank" className="m-0 transition hover:opacity-75">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://www.tiktok.com/@billedapp" rel="noreferrer" target="_blank" className="m-0 transition hover:opacity-75">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </div>

          <div className="flex gap-3 sm:mt-0 flex-col justify-center">
            <h5 className="font-bold">Brands</h5>
            <p><a href="/" className='hover:opacity-75 transition'>Product</a></p>
            <p><a href="/" className='hover:opacity-75 transition'>Why Buzzers?</a></p>
            <p><a href="/" className='hover:opacity-75 transition'>Pricing</a></p>
            <p><a href="/" className='hover:opacity-75 transition'>Partners</a></p>
            <p><a href="/" className='hover:opacity-75 transition'>FAQ</a></p>
          </div>

          <div className="flex gap-3 sm:mt-0 flex-col justify-center">
            <h5 className="font-bold">Organizers</h5>
            <p><a href="/" className='hover:opacity-75 transition'>How it Works</a></p>
            <p><a href="/" className='hover:opacity-75 transition'>FAQ</a></p>
          </div>

          <div className="flex gap-3 sm:mt-0 flex-col justify-center">
            <h5 className="font-bold">Company</h5>
            <p><a href="/" className='hover:opacity-75 transition'>Contact</a></p>
            <p><a href="/" className='hover:opacity-75 transition'>About</a></p>
          </div>

        </div> */}

        {/* <div className="w-full mx-auto border-t max-w-6xl py-10 flex flex-col sm:flex-row gap-4 sm:gap-0 items-start sm:items-center sm:justify-between "> */}
        <div className="w-full mx-auto max-w-6xl pt-5 flex flex-col sm:flex-row gap-4 sm:gap-0 items-start sm:items-center sm:justify-between ">
          <div className='flex gap-6'>
            <img src={FullLogoWhite} className='w-[5rem]' alt="Buzzers"/>
          </div>

          <div className="flex gap-6 justify-center text-sm">
            <p>© 2024 Buzzers, Inc.</p>
            <a href="/privacy-policy" className='transition hover:opacity-75'>Privacy Policy</a>
            <a href="/terms-of-service" className='transition hover:opacity-75'>Terms of Service</a>
          </div>
        </div>
      </div>

      {/* <div><Toaster/></div> */}
    </footer>
  );
}

export default Footer;
