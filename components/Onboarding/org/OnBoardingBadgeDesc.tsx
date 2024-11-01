'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Stack, Textarea, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import { useAtom } from 'jotai';
import { badgeFormAtom } from '@/atoms/CreateBadgeFormAtom';

export default function OnBoardingBadgeDesc() {
  const [desc, setDesc] = useState<string>('');
  const [loading, { open: startLoading, close: stopLoading }] = useDisclosure(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useAtom(badgeFormAtom);

  if (Object.keys(formData).length === 0) {
    router.push('/org/badge/name');
  }

  const handleSubmit = async (): Promise<void> => {
    if (!desc || desc.length < 10) {
      setError('Description must be at least 10 characters long');
      return;
    }

    setError('');
    startLoading();
    try {
      if (!session) {
        router.replace('/signin');
        return;
      }

      setFormData({ ...formData, description: desc });

      const payload = new FormData();

      payload.append('badgename', formData.badgeName as string);
      payload.append('badgedesc', desc);
      payload.append('username', session.user?.name || '');
      payload.append('creator_email', session.user?.email || '');
      payload.append('badge_pic',formData.presignedUrl as string)
      const response = await fetch('/api/badges', {
        method: 'POST',
        body: payload,
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Badge created successfully:', result);
        router.push('/');
      } else {
        console.error('Failed to create badge:', result.error);
        setError(result.error || 'Failed to create badge.');
      }
    } catch (err) {
      console.error('Error updating description:', err);
      setError('An unexpected error occurred while submitting.');
    } finally {
      stopLoading();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.currentTarget;
    setDesc(value);

    if (value.length >= 10) {
      setError('');
    } else {
      setError('Description must be at least 10 characters long');
    }
  };

  return (
    <Stack justify="space-between" mt="md" mb="xs" align="center">
      {formData.image && (
        <Card
          style={{
            width: 200,
            height: 200,
            borderRadius: '1rem',
            backgroundImage: `url(${formData.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      <Tooltip label={error} opened={!!error} position="top" withArrow bg="red" color="white">
        <Textarea
          withAsterisk
          required
          radius="md"
          size="md"
          placeholder="Describe yourself..."
          value={desc}
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
        Submit Description
      </Button>
    </Stack>
  );
}
