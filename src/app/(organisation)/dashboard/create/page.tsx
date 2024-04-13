import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import BadgeImage from './Components/BadgeImage'
import { Button } from '@/components/ui/button'

export default function page() {

  
  return (
      <section>


<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent side="bottom" className='rounded-t-lg mb-0 flex w-fit m-auto flex-col items-center '>
    <SheetHeader>
      <SheetTitle className="text-center">Create a badge</SheetTitle>
      <SheetDescription className='flex flex-col items-center'>
        <BadgeImage />
        <input type="text" className='text-center bg-transparent p-3 text-gray-500 font-bold text-xl outline-none border-none' placeholder='Badge Name'/>
        <textarea maxLength={120} className='min-h-[180px] text-center bg-transparent p-3 text-gray-500 font-medium text-xl outline-none border-none' placeholder='Badge Description'/>
        <Button>
          Create
        </Button>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

      </section>
  )
}
