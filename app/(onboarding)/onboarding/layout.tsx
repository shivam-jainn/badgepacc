import React, { ReactNode } from 'react';
import Image from 'next/image';
import { Card, Stack, Text } from '@mantine/core';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Stack h={600} align="center" justify="center" gap="md">
      <Card shadow="sm" padding="xl" radius="md">
        <Text fw={700} size="lg" mb={16}>
          Let&apos;s set up your profile
        </Text>
        <Image
          src="https://images.pexels.com/photos/14589064/pexels-photo-14589064.jpeg"
          height={300}
          width={400}
          alt="Welcome Image"
          style={{ borderRadius: '1rem' }}
        />
        {children}
      </Card>
    </Stack>
  );
}
