"use client";
import React, { useState } from 'react'
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
import { useAtomValue } from 'jotai';
import { badgeFileAtom } from '@/lib/recoil/BadgeImageAtom';
import axios from 'axios';
import { useSession } from 'next-auth/react';
export default function page() {
  const [badgeName, setBadgeName] = useState("");
  const [badgeDescription, setBadgeDescription] = useState("");
  const badgeImageFile = useAtomValue(badgeFileAtom)
  
  const handleCreateBadge = async () => {
    try {
        if (!badgeImageFile) {
            throw new Error('Badge image file is null');
        }

        const formData = new FormData();
        formData.append('name', badgeName);
        formData.append('description', badgeDescription);

        formData.append('image', badgeImageFile);

        const response = await axios.post('/api/badge', formData);
        console.log(response.data);
    } catch (error) {
        console.error('Error creating badge:', error);
    }
};


  return (
    <section>
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side="bottom" className='rounded-t-lg mb-0 flex w-fit m-auto flex-col items-center '>
          <SheetHeader>
            <SheetTitle className="text-center">Create a badge</SheetTitle>
            <SheetDescription className='flex flex-col items-center'>
              <BadgeImage />
              <input 
                type="text" 
                className='text-center bg-transparent p-3 text-gray-500 font-bold text-xl outline-none border-none' 
                placeholder='Badge Name'
                value={badgeName}
                onChange={(e) => setBadgeName(e.target.value)}
              />
              <textarea 
                maxLength={120} 
                className='min-h-[180px] text-center bg-transparent p-3 text-gray-500 font-medium text-xl outline-none border-none' 
                placeholder='Badge Description'
                value={badgeDescription}
                onChange={(e) => setBadgeDescription(e.target.value)}
              />
              <Button onClick={handleCreateBadge}>
                Create
              </Button>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
}
