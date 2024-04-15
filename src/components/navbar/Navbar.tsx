import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { MoveUpRight } from 'lucide-react'
export default function Navbar() {
  return (
    <nav className='flex justify-between p-4 px-8'>
        <div>
            <Image width={24} height={24} alt='badgepacc logo' src="/BagSmallLogo.svg" />
        </div>

        <div className='flex gap-5'>
            <Button variant='link' className='text-white flex gap-1'>
                Explore Features
                <MoveUpRight size={16}/>
            </Button>

            <Button className='rounded-[3rem] bg-white/20'>
                Sign In
            </Button>
        </div>
    </nav>
  )
}
