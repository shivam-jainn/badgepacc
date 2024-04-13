"use client";
import React from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button';
export default function page() {
    const session = useSession();
  console.log(session);
    return (
    <div>
        Hi , {session.data?.user?.name}
        
        <h1>Setup badge distribution</h1>
        <Button onClick={()=>{
          console.log("bot added to your GH account");
        }}>
          Github
        </Button>
        
        <div>
          OR
        </div>

        <h1>Setup your own with APIs</h1>
        <Button>
          Open API settings
        </Button>
    </div>
  )
}
