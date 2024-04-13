"use client";
import { Card } from '@/components/ui/card'
import React from 'react'
import { DoorOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function page() {
    const router = useRouter();
    function handleSubmit(){
        router.push('/');
    }

  return (
    <Card className='flex flex-col bg-[#6F6F6F]/40 max-w-sm flex items-center p-8'>
    <div className='p-4 flex items-center align-middle rounded-[1000px] bg-white w-[80px] h-[80px]'>
    <DoorOpen className='w-full' />
    </div>

    <div>
        <h1>Welcome to Badgepacc</h1>
        <h3>Please enter relevant info below</h3>
    </div>

    <div>
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="username">Username</Label>
      <Input type="text" id="username" placeholder="username" />
    </div>

    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="bio" />
    </div>

    </div>

    <div>
        <Button onClick={handleSubmit}>
            Continue
        </Button>
    </div>
    
</Card>
  )
}
