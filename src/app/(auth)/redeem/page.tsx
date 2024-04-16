"use client";
import { Card } from '@/components/ui/card';
import React, { useEffect } from 'react';
import { TicketCheck, TicketSlash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const session = await getSession();
            console.log(session);
        }
        
        fetchData();
    }, []); // Run only once when the component mounts

    async function redeemBadge() {
        try {
            const data = {
                badge: "clv2b7ti5000012d6535fxdj0"
            };

            const response = await axios.post("/api/tokens", data);

            if (response.data.success) { // Check if truthy
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card className='flex-col gap-3 bg-[#6F6F6F]/20 max-w-sm m-auto flex p-3 border-none'>
            <div className='my-2 p-2 flex items-center align-middle rounded-[1000px] bg-white w-[40px] h-[40px]'>
                <TicketCheck />
            </div>

            <div>
                <h1 className='text-white font-bold text-xl'>Welcome to Badgepacc</h1>
                <h3 className='text-white'>Redeem your first badge</h3>
            </div>

            <div>
                <Button className='w-full' onClick={redeemBadge}>
                    <TicketSlash />
                </Button>
            </div>
        </Card>
    );
}
