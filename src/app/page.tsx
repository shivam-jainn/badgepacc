"use client";
import Landing from '@/components/pages/Landing';
import { authOptions } from '@/lib/auth/auth';
import { Separator } from '@/components/ui/separator';
import { getServerSession } from 'next-auth';

import { useParams } from 'next/navigation';


import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default async function Home() {
  const footerLinks = [
    {
      name : "Blog",
      link : "/blog"
    },
    {
      name : "Pricing",
      link : "/pricing"
    }
  ];

  const router = useRouter();

  return (
    <section className='py-4 px-8 flex flex-col bg-bgroot text-white'>
      <div className='flex'>
        <div className='flex flex-col items-center'>

          <div>
          <h1>Badgepacc</h1>
          <h2>Your collections starts here</h2>
          <h4>Create & Collect Badges . Make anything rewarding with badgepacc .</h4>

          <Button onClick={()=>{
            router.push('/login')
          }}>
            Redeem your first badge
            </Button>

          </div>
        </div>

        <div className='flex flex-col'> 
            <Image width={400} height={400} alt='A pic' src="/rightHomeLandingImg .png"/>   
        </div>
      </div>

<Separator />


{/* footer */}
      <footer className='flex'>
        <div className='flex items-center p-4'>

        <div>
          Badgepacc
        </div>
        <div>
  {footerLinks.map(({link,name}) => (
    <Button variant="link" key={link} onClick={()=>{
      router.push(link);
    }}>
      {name}
    </Button>
  ))}
</div>

        
        </div>

        <div>

        </div>
      </footer>
    </section>
  )
}