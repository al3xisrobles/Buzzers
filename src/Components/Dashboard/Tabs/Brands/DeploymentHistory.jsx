import { useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 900) + 100,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 900) + 100,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 900) + 100,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 900) + 100,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 900) + 100,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 900) + 100,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 900) + 100,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 900) + 100,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 900) + 100,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 900) + 100,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 900) + 100,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 900) + 100,
  },
];


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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-salt rounded-sm py-2 px-3 shadow">
        <p className="label">{`${label}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

function DeploymentHistory() {

  // Dropdown states
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

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
        <Button className="rounded-[1rem] bg-secondary h-9">
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

    <div className="space-y-4 mt-2 mb-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-salt">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm opacity-50 font-medium">
              NET IMPRESSIONS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-4xl">20,540</div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card className="bg-salt">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm opacity-50 font-medium">
              EVENTS SPONSORED
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-4xl">40</div>
            {/* <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card className="bg-salt">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm opacity-50 font-medium">
              AVERAGE COST PER IMPRESSION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-4xl">$0.75</div>
            {/* <p className="text-xs text-muted-foreground">
              +19% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card className="bg-salt">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm opacity-50 font-medium">
              NET SPENDING
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-4xl">$1905.00</div>
            {/* <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p> */}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-salt">
          <CardHeader>
            <CardTitle className="text-sm opacity-50 font-medium">
              IMPRESSIONS BY MONTH
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip cursor={{fill: 'var(--salt)'}} content={<CustomTooltip />} />
                <Bar dataKey="total" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-4 bg-salt md:col-span-3">
          <CardHeader>
            <CardTitle className="text-sm opacity-50 font-medium">
              EVENT LOCATIONS
            </CardTitle>
          </CardHeader>
          <CardContent>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="bg-salt col-span-4">
          <CardHeader>
            <CardTitle className="text-sm opacity-50 font-medium">
              PAST EVENTS
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-6">
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DeploymentHistory
