import React, { ReactNode } from 'react'

export default function layout({children}:{children:ReactNode}) {
  return (
    <section className='w-full h-screen bg-[#131517] '>
        
        <div className='bg-gradient-anim-auth bg-gradient-auth w-full h-full absolute bottom-0  blur-10 '>
        {children}
        </div>
    </section>
  )
}
