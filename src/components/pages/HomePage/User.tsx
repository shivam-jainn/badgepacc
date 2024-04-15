"use client";
import { useSession } from 'next-auth/react'
import React from 'react'
import EventCards from './Components/EventCards';
import { Button } from '@/components/ui/button';
export default function User() {
    const session = useSession(); 

    return (
    <section>
        {/* <h1 className='text-4xl font-medium'>Hey , {session.data?.user?.name}</h1> */}
        <h1 className='text-4xl font-medium'>Hey , Shivam</h1>

        <h3 className='text-xl font-medium'>Earn badges with these Events</h3>
        <EventCards />

        <h3 className='text-xl font-medium'>Feel like a website or project would be fun with us?</h3>
        <Button>
            Drop your suggestion here
        </Button>

    </section>
  )
}
