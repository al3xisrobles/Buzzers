import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import {
  Plus,
} from "lucide-react"
import { useCart } from "./UserContext"

function SponsorBtn() {

  // Set cart quantity function
  const { setCartQuantity } = useCart();

  // Component is mounted
  const [isMounted, setIsMounted] = useState(false);

  // Sponsor button logic
  const [sponsored, setSponsored] = useState(null);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true); // Set the mounted state to true after first render
    } else {
      // Only show toast if it's not the first render
      if (sponsored) {
        setCartQuantity((prevQuantity) => prevQuantity + 1);
        toast.success('Added to Cart');
      } else if (sponsored === false) {
        setCartQuantity((prevQuantity) => prevQuantity - 1);
        toast('Removed from Cart');
      }
    }
  }, [sponsored, isMounted]);

  // Local storage
  useEffect(() => {
    localStorage.setItem('sponsored', sponsored);
  }, [sponsored]);

  return (
    <Button variant="default" className={sponsored ? "bg-secondary" : ""} onClick={() => setSponsored(!sponsored)}>
      <div className='flex gap-2 items-center'>
        {!sponsored ? (
          <>
            <Plus/>
            <p>Sponsor</p>
          </>
        ) : (
          <p>Added to Cart</p>
        )}
      </div>
    </Button>
  )
}

export default SponsorBtn
