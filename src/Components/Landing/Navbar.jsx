/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from 'react';
import FullLogo from "../../Assets/FullLogo.png"
import { Button } from "@/components/ui/button"

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    // add event listener
    window.addEventListener('scroll', handleScroll);

    // clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`bg-popover z-50 py-5 px-6 sm:px-8 border-gray-200 ${scrolled && "border-b-2"}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className='w-28'>
          <img src={FullLogo} alt="Buzzers" />
        </a>

        {/* Navbar Buttons */}
        <div className="text-carbon hidden sm:flex flex-row gap-2 items-center">
          <a href="/about">
            <Button variant="ghost">Learn more</Button>
          </a>
          <a href="/dashboard" className="flex justify-center items-center text-black bg-primary rounded-full hover:opacity-90 transition-all duration-300">
            <Button className="shadow-input text-black">Sign up</Button>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
