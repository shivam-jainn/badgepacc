import React from 'react'
import { Separator } from '@/components/ui/separator'
import { authOptions } from '@/lib/auth/auth';

import { useParams, useRouter } from 'next/navigation';


import { Button } from '@/components/ui/button';
import Image from 'next/image';
export default function Landing() {
  const footerLinks = [
    {
      name : "Blog",
      link : "/blog"
    },
    {
      name : "Pricing",
      link : "/pricing"
    },
        {
      name : "API",
      link : "/api-doc"
    }
  ];
  const router = useRouter();
  return (
    <>
    <div className='flex align-middle px-8 justify-between'>
    <div className='flex flex-col gap-4 justify-between py-8'>

      <div className='flex flex-col gap-8'> 
      <h1 className='text-5xl font-bold'>Badgepacc</h1>
      <h2 className='text-7xl'>Your <br /> collections <br /> <span className='home-title-grad '>starts here</span></h2>
      <h4 className='text-2xl'>Create & Collect Badges . Make anything rewarding with badgepacc .</h4>

    

      </div>
    
      <Button 
      className='max-w-sm rounded-[3rem]'
      onClick={()=>{
        router.push('/login')
      }}>
        Redeem your first badge
        </Button>
    </div>

    <div className='flex flex-col items-center align-middle'> 
        <Image width={400} height={400} alt='A pic' src="/rightHomeLandingImg .png"/>   
    </div>
  </div>

<Separator />


{/* footer */}
  <footer className='flex'>
    <div className='flex items-center align-middle gap-3 p-4'>

    <div className='text-xl font-bold'>
      Badgepacc
    </div>
    <div>
{footerLinks.map(({link,name}) => (
<Button 
variant="link" 
key={link}
className='text-white'
onClick={()=>{
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
  </>
  )
}
