import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import {
  Bookmark,
} from "lucide-react"

function SaveBtn() {

  // Component is mounted
  const [isMounted, setIsMounted] = useState(false);

  // Save button logic
  const [saved, setSaved] = useState(null);

  // Local storage
  useEffect(() => {
    localStorage.setItem('saved', saved);
  }, [saved]);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true); // Set the mounted state to true after first render
    } else {
      // Only show toast if it's not the first render
      if (saved) {
        toast.success('Saved to Bookmarks');
      } else if (saved === false) {
        toast('Removed from Bookmarks');
      }
    }
  }, [saved, isMounted]);

  return (
    <Button variant="outline" className={saved ? "bg-gray-100" : ""} onClick={() => setSaved(!saved)}>
      <div className='flex gap-2 items-center'>
        <Bookmark/>
        {!saved ? (
          <p>Save</p>
        ) : (
          <p>Saved</p>
        )}
      </div>
    </Button>
  )
}

export default SaveBtn
