import React from 'react';
import Image from 'next/image';
import { Card, Stack, Text } from '@mantine/core';
import OnBoardingClaim from '@/components/Onboarding/OnBoardingClaim';

export default function Page() {
  return (
    <Stack h={600} align="center" justify="center" gap="md">
      <Card shadow="sm" padding="xl" radius="md">
        <Text fw={700} size="lg" mb={16}>
          Let&apos;s set up your profile
        </Text>
        <Image
          src="https://images.pexels.com/photos/238118/pexels-photo-238118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          height={300}
          width={450}
          alt="Welcome Image"
          style={{ borderRadius: '1rem', marginBottom: '2rem' }}
        />

        <OnBoardingClaim />
      </Card>
    </Stack>
  );
}
