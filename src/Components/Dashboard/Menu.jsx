import { useState, useEffect } from "react"
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useCart } from "./UserContext"
import CartSider from "./CartSider"

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
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer"

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

  const { cartQuantity } = useCart();

  const { signOut } = useAuthenticator((context) => [context.user]);

  return (
  <div className='flex flex-row items-center'>
    <Button variant="ghost" className="px-3">
      <Bookmark/>
    </Button>

    <Drawer direction="right">
      <DrawerTrigger>
        <Button variant="ghost" className="px-3">
          <div className="flex flex-row items-center gap-2">
            <ShoppingCart/>
            {cartQuantity}
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-5">
        <CartSider/>
        <DrawerFooter className="w-max ml-auto">
          <Button>
            Review and Deploy
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

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
