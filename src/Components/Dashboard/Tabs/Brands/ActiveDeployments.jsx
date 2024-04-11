import { useState } from 'react'

// Table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Dropdown Menu
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import SelectStatus from "../../SelectStatus"

// Lucide
import {
  Check,
  Archive,
  Share,
  CircleHelp,
  Clock5,
  ChevronRight,
} from "lucide-react"

const columns = [
  "Date",
  "Event Name",
  "Organization",
  "Organizer Confirmation",
  "Payment Status",
  "Product Status",
  ""
]

const rows = [
  [
    "Jan 15, 2024",
    "Snoasis",
    "Tavern Band",
    "Confirmed",
    "Paid",
    "Select Status",
  ],
  [
    "Feb 20, 2024",
    "@ SPACE",
    "Tavern Band",
    "Confirmed",
    "Pay Now",
    "Select Status",
  ],
  [
    "Mar 31, 2024",
    "Backyard Concert",
    "Tavern Band",
    "Pending",
    "—",
    "—",
  ],
]

function ActiveDeployments() {

  // Dropdown states
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  // Labels that will turn to buttons instead of text
  const buttonLabels = ['Confirmed', 'Pay Now', 'Pending', 'Select Status', 'Paid'];

  function renderAppropriateButton(buttonLabel) {
    if (buttonLabel === 'Confirmed' || buttonLabel === 'Paid') {
      return (
        <Badge className="rounded-[1rem] bg-haze h-9">
          <Check className='h-4'/>
          <p className='mx-1 text-[0.8rem]'>{buttonLabel}</p>
        </Badge>
      );
    } else if (buttonLabel === 'Pending') {
      return (
        <Badge className="rounded-[1rem] bg-secondary h-9">
          <Clock5 className='h-4'/>
          <p className='mx-1 text-[0.8rem]'>{buttonLabel}</p>
        </Badge>
      );
    } else if (buttonLabel === 'Pay Now') {
      return (
        <Button className="bg-secondary h-9">
          <p className='ml-1'>{buttonLabel}</p>
          <ChevronRight className='h-4'/>
        </Button>
      );
    } else if (buttonLabel === 'Select Status') {
      return (
        <SelectStatus buttonLabel={buttonLabel}/>
      );
    }
  }

  // Render the appropriate cell, either text or a button
  function renderCellContent(cell) {
    // Check if the cell content matches any button label
    if (buttonLabels.includes(cell)) {
      // Return a Button component with the cell content as children
      return renderAppropriateButton(cell);
    } else {
      // Return the cell content as plain text
      return cell;
    }
  }

  return (
    <div>
      <h1 className='text-3xl pb-4 font-bold'>Active Deployments</h1>

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>
                  {renderCellContent(cell)}
                </TableCell>
              ))}

              {/* Dropdown menu */}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="px-3">
                      ⋯
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-2">
                    <DropdownMenuItem
                      checked={showStatusBar}
                    >
                      <CircleHelp className="mr-2 h-4 w-4" />
                      Support
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      checked={showActivityBar}
                    >
                      <Share className="mr-2 h-4 w-4" />
                      Share event
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      checked={showPanel}
                    >
                      <Archive className="mr-2 h-4 w-4" />
                      Archieve event
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ActiveDeployments
