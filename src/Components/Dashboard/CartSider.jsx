// Drawer from Shadcn/ui
import {
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

// Lucide
import {
  X,
} from "lucide-react"

import CartItem from "./CartItem"

function CartSider() {
  return (
    <>
      <DrawerClose className="p-3 w-max">
        <X/>
      </DrawerClose>
      <DrawerHeader className="pt-1">
        <DrawerTitle>My Cart</DrawerTitle>
      </DrawerHeader>

      <CartItem/>
      <CartItem/>
      <CartItem/>
    </>
  )
}

export default CartSider
