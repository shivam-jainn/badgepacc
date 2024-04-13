import { Card } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UserInfo() {
    const url = "https://images.pexels.com/photos/19404767/pexels-photo-19404767/free-photo-of-man-in-jacket-standing-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    const user = {
        name : "Shivam Jain",
        username : "shivamjainn",
        socials : [
            {
                social : "insta",
                link : "https://www.instagram.com/shivam.jainn/"
            },
            {
                social : "web",
                link : "pexels.com"
            }
        ],
        bio:"Geek . Hacked . Shooked .  This a 100 char te100 char te100 char te100 char te100 char te100 char te100 char te100 char te100 char te100 char te100 char text only"
    }

    const {name,username,socials,bio} = user;
    return (
    
    <Card className='flex max-w-md p-3 gap-2 items-center relative'>
        <Button size="icon" className='absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] '>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        </Button>
        <div className='max-w-[120px] w-full max-h-[120px] h-full rounded-[10rem] overflow-clip   '>
            <img alt='Profile picture' src={url} className=''/>
        </div>

        <div className='flex flex-col'>
            <span>{name}</span>
            <span>@{username}</span>
            <span>{socials.map(({social,link})=>(
                <Button variant="ghost" size="icon" asChild>
                    <Link href={link}>
                    {social}                    
                    </Link>
                </Button>   
            ))}</span>
            <span className='text-sm max-w-[60ch] line-clamp-[3]' style={{maxInlineSize:"66ch"}}>{bio}</span>
        </div>
    </Card>
  )
}
