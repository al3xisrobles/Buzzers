import { useState, useEffect } from "react"
import { useAuthenticator } from '@aws-amplify/ui-react';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import {
  LogOut,
  CircleUser,
  ShoppingCart,
  Bookmark,
  Settings,
  User as LucideUser,
} from "lucide-react"

const Menu = () => {

  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const { user, signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    console.log("USER:", user);
  }, [user])

  return (
  <div className='flex flex-row items-center'>
    <Button variant="ghost" className="px-3">
      <Bookmark/>
    </Button>
    <Button variant="ghost" className="px-3">
      <ShoppingCart/>
    </Button>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-3">
          <CircleUser/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          checked={showStatusBar}
        >
          <LucideUser className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          checked={showActivityBar}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          checked={showPanel}
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  )
}

export default Menu;
