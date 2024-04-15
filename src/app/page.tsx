"use client";

import Organisation from '@/components/pages/HomePage/Organisation';
import User from '@/components/pages/HomePage/User';
import Landing from '@/components/pages/Landing';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>; 
  }

  const isLoggedIn = session && session.user;
  const isOrg = isLoggedIn && session.user?.isOrganisation;
  
  return (
    <section className='py-4 px-8 flex flex-col bg-bgroot text-white h-full gap-4'>
      {isLoggedIn ? (isOrg ? <Organisation /> : <User />) : <Landing />}
    </section>
  );
}
