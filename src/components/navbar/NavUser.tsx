"use client";
import React from 'react'
import Image from 'next/image'
import { Button,buttonVariants } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { getSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default async function NavUser() {
    const router = useRouter();
    const session = await getSession();
    
    
    return (
    <nav className='flex justify-between p-4 px-8'>
    <div>
        <Image width={24} height={24} alt='badgepacc logo' src="/BagSmallLogo.svg" />
    </div>

    <div className='flex gap-5'>
        <Button variant='ghost' size="icon" className='text-white flex gap-1'>
        <Bell />
        </Button>


        <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem 
                    onClick={()=>{
                        router.push(`/${session?.user?.username}`)
                    }}
                    className='flex justify-center items-center'>Profile</DropdownMenuItem>
                    <DropdownMenuItem 
                    onClick={()=>{
                        router.push('/billing')
                    }}
                    className='flex justify-center items-center'>Billing</DropdownMenuItem>
                    <DropdownMenuItem 
                    onClick={()=>{
                        router.push('/settings')
                    }}
                    className='flex justify-center items-center'>Settings</DropdownMenuItem>
                    <DropdownMenuItem className={cn(buttonVariants({ variant: "destructive" }), "w-full")}
                        onClick={()=>signOut()}
                    >Log Out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
       
    </div>
</nav>
  )
}
