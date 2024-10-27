'use client';

import React from 'react'
import { Avatar,Menu } from '@mantine/core'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AvatarMenu({
        avatarurl,
        username
}:{
        avatarurl:string,
        username: string
}) {
        const router = useRouter();
  return (
    <Menu
    width={260}
    position="bottom-end"
    transitionProps={{ transition: 'pop-top-right' }}
    // onClose={() => setUserMenuOpened(false)}
    // onOpen={() => setUserMenuOpened(true)}
    withinPortal
  >
     <Menu.Target>
     <Avatar
        src={avatarurl}
        alt='A profile picture'
        radius={'xl'}
    />
     </Menu.Target>

     <Menu.Dropdown>
        <Menu.Item onClick={()=>router.push(`/${username}`)}>
                Your Profile
        </Menu.Item>    

        <Menu.Item>
                Settings
        </Menu.Item>    
        
        <Menu.Item onClick={()=>signOut()} color='red'>
                Logout
        </Menu.Item>    
     </Menu.Dropdown>
 
</Menu>
  )
}
