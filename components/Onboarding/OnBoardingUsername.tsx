'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaAt } from 'react-icons/fa';
import { Button, Group, TextInput, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSession } from 'next-auth/react';

export default function OnBoardingUsername() {
  const [username, setUsername] = useState<string>('');
  const [loading, { open: startLoading, close: stopLoading }] = useDisclosure(false);
  const [error, setError] = useState<string>(''); // Specify type for error state
  const router = useRouter();
  const {data:session,update} = useSession();

  const handleSubmit = async (): Promise<void> => {
    if (!username) return;

    if (username.length < 5) {
      setError('Username must be at least 5 characters long');
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
        body: JSON.stringify({ username, email: session.user?.email }),
      });

      if (!response.ok) throw new Error('Failed to update username');

      const newSession = {
        ...session,
        user: {
          ...session?.user,
          username: username
        },
      };

      await update(newSession);

      router.push('/onboarding/isorg');
    } catch (err) {
      console.error('Error updating username:', err);
    } finally {
      stopLoading();
    }
  };

  // Handle change for input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    setUsername(value);

    // Clear error message if username length is 5 or more
    if (value.length >= 5) {
      setError(''); // Clear error when valid length
    } else {
      setError('Username must be at least 5 characters long'); // Show error if less than 5
    }
  };

  return (
    <Group justify="space-between" mt="md" mb="xs" align="center">
      <Tooltip label={error} opened={!!error} position="top" withArrow bg="red" color="white">
        <TextInput
          withAsterisk
          required
          size="lg"
          radius="xl"
          leftSection={<FaAt />}
          placeholder="username"
          value={username}
          onChange={handleChange} // Use new handleChange function
          error={!!error} // Highlight input if there's an error
        />
      </Tooltip>
      <Button
        radius="xl"
        size="lg"
        onClick={handleSubmit}
        loading={loading}
        loaderProps={{ type: 'dots' }}
      >
        <FaArrowRight size={20} />
      </Button>
    </Group>
  );
}
