"use client";
import { Card } from '@/components/ui/card'
import React, { useState } from 'react'
import { DoorOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Page() {


    const router = useRouter();

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [isOrganisation, setIsOrganisation] = useState("");


    async function handleSubmit() {
        const url = "/api/user";
        const data = {
            username: username,
            bio: bio,
            isOrganisation : Boolean(isOrganisation)
        };
        try {
            const response = await axios.put(url, data);
            if (response.status === 200) {
                router.push('/');
            } else {
                throw new Error("Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }

    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <Card className='flex-col gap-3 bg-[#6F6F6F]/40 max-w-sm flex m-auto p-8 border-none'>
                <div className='p-2 flex items-center justify-center rounded-full bg-white w-12 h-12'>
                    <DoorOpen className='w-full text-black  ' />
                </div>

                <div>
                    <h1 className='text-white font-bold text-xl'>Welcome to Badgepacc</h1>
                    <h3 className='text-white'>Please enter relevant info below</h3>
                </div>

                <div className='flex flex-col gap-2 text-white'>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            placeholder="Enter your bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)} />
                    </div>

                    <div>
                    <Select onValueChange={setIsOrganisation}>
    <SelectTrigger className="w-full">
        <SelectValue placeholder="Orgnaisation" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value={String(true)}>Yes</SelectItem>
        <SelectItem value={String(false)}>No</SelectItem>
    </SelectContent>
</Select>


                    </div>


                </div>

                <div>
                    <Button
                        className='w-full'
                        onClick={handleSubmit}>
                        Continue
                    </Button>
                </div>
            </Card>
        </div>
    )
}
