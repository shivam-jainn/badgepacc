"use client";
import { Card } from '@/components/ui/card'
import React from 'react'
import { DoorOpen } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { FaGoogle } from "react-icons/fa";
import { Button } from '@/components/ui/button';
export default function page() {
  return (
   
   <Card className=' flex-col gap-3  bg-[#6F6F6F]/40 max-w-sm  m-auto flex  p-3 border-none'>
        <div className='my-2 p-2 flex items-center align-middle rounded-[1000px] bg-white w-[40px] h-[40px]'>
        <DoorOpen className='w-full text-black' />
        </div>

        <div>
            <h1 className='text-white font-bold text-xl'>Welcome to Badgepacc</h1>
            <h3 className='text-white'>Please sign in or sign up</h3>
        </div>

        <div>
            <Button
            className='w-full'
            onClick={()=>{
                signIn('google');
            }}>
                <FaGoogle />
            </Button>
        </div>
    </Card>
)
}
