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
          Let&apos;s create your first badge
        </Text>
        {children}
      </Card>
    </Stack>
  );
}
