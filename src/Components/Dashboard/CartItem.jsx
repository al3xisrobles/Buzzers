import Tavern from "../../Assets/Dashboard/Tavern.png"

import {
  ChevronRight,
} from "lucide-react"

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"

import CartPopout from "./CartPopout";

function CartItem() {

  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <div className="text-left w-full mx-2 p-2 hover:bg-muted transition rounded-[0.5rem]">
          <div className='flex flex-row justify-between items-center gap-4'>
            <div className="flex flex-row gap-4">
              <img src={Tavern} alt="Event picture" className='w-24 rounded-[0.5rem]'/>

              <div className="flex flex-col">
                <h4 className='font-bold text-lg'>
                  Backyard Concert
                </h4>
                <p>3/31 | Tavern Band</p>
                <p className='opacity-50'>$0.50/impression <span className='text-sm'>$200 total</span></p>
              </div>
            </div>

            <ChevronRight/>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-[800px]">
        <CartPopout/>
      </DrawerContent>
    </Drawer>
  )
}

export default CartItem
