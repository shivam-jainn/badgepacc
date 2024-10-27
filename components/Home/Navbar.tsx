import { Group, Button } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import SearchBar from './NavbarAtoms/SearchBar';
import AvatarMenu from './NavbarAtoms/AvatarMenu';
import classes from './Navbar.module.css';
import { auth } from '@/auth';

export default async function Navbar() {
  const session = await auth();

  return (
    <Group
      justify="space-between"
      gap="md"
      align="center"
      p="1rem"
      px="3rem"
      className={classes.navbarBottomColor}
    >
      <div>badgepacc</div>

      {session ? (
        <>
          <div style={{ flex: 1, maxWidth: '40%' }}>
            <SearchBar />
          </div>
          <AvatarMenu avatarurl={session.user?.image as string} username={session.user.username as string} />
        </>
      ) : (
        <Group>
          <Link href="/signin" passHref legacyBehavior>
            <Button radius="xl" component="a">
              Sign In
            </Button>
          </Link>

          <Link href="/signup" passHref legacyBehavior>
            <Button radius="xl" component="a">
              Sign Up
            </Button>
          </Link>
        </Group>
      )}
    </Group>
  );
}
