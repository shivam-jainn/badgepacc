"use client";
import { Card } from '@/components/ui/card'
import React from 'react'
import { DoorOpen } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { FaGoogle } from "react-icons/fa";
import { Button } from '@/components/ui/button';
export default function page() {
  return (
    <Card className=' flex-col bg-[#6F6F6F]/40 max-w-sm flex items-center p-8'>
        <div className='p-4 flex items-center align-middle rounded-[1000px] bg-white w-[80px] h-[80px]'>
        <DoorOpen className='w-full' />
        </div>

        <div>
            <h1>Welcome to Badgepacc</h1>
            <h3>Please sign in or sign up</h3>
        </div>

        <div>
            <Button onClick={()=>{
                signIn('google');
            }}>
                <FaGoogle />
            </Button>
        </div>
    </Card>
)
}
