'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSession } from 'next-auth/react';

export default function OnBoardingClaim() {
  const [loading, { open: startLoading, close: stopLoading }] = useDisclosure(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const {data:session} = useSession();

  const handleClaim = async (): Promise<void> => {
    startLoading();
    setError('');

    try {
      if (session==null) {
        router.replace('/signin'); // Redirects to /signin
        return;
      }
      
      const badgeId = 'cm2qf2q1d00013ka3gzyvx7mg';
      const response = await fetch('/api/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user?.email,
          badgeId,
        }),
      });

      const sdsd = await response.json();
      console.log(sdsd);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to claim. Please try again.');
      }

      router.push('/');
    } catch (err: any) {
      if (err.message.includes('already claimed')) {
        setError('You have already claimed this badge.');
      } else if (err.message.includes('Session not found')) {
        setError('Session not found. Please log in to claim the badge.');
      } else {
        setError('Error claiming the badge. Please try again later.');
      }
    } finally {
      stopLoading();
    }
  };

  return (
    <Tooltip label={error} opened={!!error} position="top" withArrow bg="red" color="white">
      <Button
        radius="xl"
        size="lg"
        onClick={handleClaim}
        loading={loading}
        loaderProps={{ type: 'dots' }}
      >
        Claim
      </Button>
    </Tooltip>
  );
}
