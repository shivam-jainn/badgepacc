'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Stack, Textarea, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSession } from 'next-auth/react';

export default function OnBoardingBio() {
  const [bio, setBio] = useState<string>('');
  const [loading, { open: startLoading, close: stopLoading }] = useDisclosure(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const {data:session} = useSession();
  
  const handleSubmit = async (): Promise<void> => {
    if (!bio) return;

    if (bio.length < 10) {
      setError('Bio must be at least 10 characters long');
      return;
    }

    setError('');
    startLoading();
    try {
    
      if (session==null) {
        router.replace('/signin'); // Redirects to /signin
        return;
      }

      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio, email: session.user?.email }),
      });

      if (!response.ok) throw new Error('Failed to update bio');

      router.push('/claim');
    } catch (err) {
      console.error('Error updating bio:', err);
    } finally {
      stopLoading();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.currentTarget;
    setBio(value);

    if (value.length >= 10) {
      setError('');
    } else {
      setError('Bio must be at least 10 characters long');
    }
  };

  return (
    <Stack justify="space-between" mt="md" mb="xs" align="center">
      <Tooltip label={error} opened={!!error} position="top" withArrow bg="red" color="white">
        <Textarea
          withAsterisk
          required
          radius="md"
          size="md"
          placeholder="Tell us about yourself..."
          value={bio}
          onChange={handleChange}
          error={!!error}
          minRows={2}
          style={{ width: '100%' }}
        />
      </Tooltip>
      <Button
        radius="md"
        size="md"
        onClick={handleSubmit}
        loading={loading}
        loaderProps={{ type: 'dots' }}
        style={{ width: '100%' }}
      >
        Submit Bio
      </Button>
    </Stack>
  );
}
