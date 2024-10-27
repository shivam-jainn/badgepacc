'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
import { Button, Group, Select, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSession } from 'next-auth/react';

export default function OnBoardingIsOrg() {
  const [isOrganisation, setIsOrganisation] = useState<string | null>(null); // State for dropdown selection
  const [loading, { open: startLoading, close: stopLoading }] = useDisclosure(false);
  const [error, setError] = useState<string>(''); // Specify type for error state
  const router = useRouter();
  const {data:session,update} = useSession();

  const handleSubmit = async (): Promise<void> => {
    if (!isOrganisation) {
      setError('Please select an option'); // Set error if no selection
      return;
    }

    setError('');
    startLoading();
    try {

      if (session==null) {
        router.replace('/signin'); // Redirects to /signin
        return;
      }

      const isOrg: boolean = isOrganisation === 'yes';
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isOrg, email: session.user?.email }),
      });

      if (!response.ok) throw new Error('Failed to update organization status');
      
      const newSession = {
        ...session,
        user: {
          ...session?.user,
          isOrg: isOrg
        },
      };

      await update(newSession);

      router.push('/onboarding/bio');
    } catch (err) {
      console.error('Error updating organization status:', err);
    } finally {
      stopLoading();
    }
  };

  return (
    <Group justify="space-between" mt="md" mb="xs" align="center">
      <Tooltip label={error} opened={!!error} position="top" withArrow bg="red" color="white">
        <Select
          withAsterisk
          required
          size="lg"
          radius="xl"
          placeholder="Are you an organization?"
          data={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
          value={isOrganisation}
          onChange={(value) => setIsOrganisation(value)} // Update state on selection
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
