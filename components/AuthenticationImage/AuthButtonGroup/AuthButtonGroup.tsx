'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Button, Stack } from '@mantine/core';

export default function AuthButtonGroup() {
  const [githubLoading, setGithubLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleGithubAuth() {
    setGithubLoading(true);
    try {
      await signIn('github');
    } catch (error) {
      console.error('GitHub sign-in error:', error);
    } finally {
      setGithubLoading(false);
    }
  }

  // Handler for Google sign-in
  async function handleGoogleAuth() {
    setGoogleLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      console.error('Google sign-in error:', error);
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <Stack>
      <Button
        variant="default"
        size="lg"
        radius="md"
        onClick={handleGithubAuth}
        loading={githubLoading}
        loaderProps={{ type: 'dots' }}
        leftSection={<FaGithub size={16} />}
        style={{ background: 'black', border: 'none', color: 'white' }}
      >
        Github
      </Button>
      <Button
        variant="default"
        size="lg"
        radius="md"
        onClick={handleGoogleAuth}
        loading={googleLoading}
        loaderProps={{ type: 'dots' }}
        leftSection={<FaGoogle size={16} />}
        style={{ background: 'blue', border: 'none', color: 'white' }}
      >
        Google
      </Button>
    </Stack>
  );
}
