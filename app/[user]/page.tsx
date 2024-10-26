import { Group } from '@mantine/core';
import React from 'react';
import UserCard from '@/components/Profiles/UserCard';
import BadgeBoard from '@/components/Profiles/BadgeBoard';

export default function Page({ params }: { params: { user: string } }) {
  return (
    <Group
      style={{ height: '100%', overflowY: 'auto' }} // Allow scrolling if content overflows
      px="3rem"
      align="center"
    >
      <UserCard username={params.user} />
      <BadgeBoard username={params.user} />
    </Group>
  );
}
