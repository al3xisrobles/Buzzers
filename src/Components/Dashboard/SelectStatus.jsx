import React, { useState } from 'react'
// Dropdown Menu
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// Lucide
import {
  ChevronRight,
} from "lucide-react"

function SelectStatus({ buttonLabel }) {

  const [status, setStatus] = useState(buttonLabel);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-9">
            <p className='ml-1'>{status}</p>
            <ChevronRight className='h-4'/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-2">
          <DropdownMenuItem
            checked={true}
            onClick={() => setStatus("Not Shipped")}
          >
            Not Shipped
          </DropdownMenuItem>
          <DropdownMenuItem
            checked={false}
            onClick={() => setStatus("Sent")}
          >
            Sent for fulfillment
          </DropdownMenuItem>
          <DropdownMenuItem
            checked={false}
            onClick={() => setStatus("Shipped")}
          >
            Shipped
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SelectStatus
