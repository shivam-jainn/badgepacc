'use client';
import { Card, Grid, Text, Loader, Modal, Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';

interface BadgeBoardProps {
  username: string;
}

interface Badge {
  id: string;
  name: string;
  pic: string;
  description: string;
}

interface Token {
  id: string;
  issuance_time: string; // or Date, depending on your data
  issuance_id: string;
  user_email: string;
  badge_id: string;
  badge: Badge; // Include badge details
}

export default function BadgeBoard({ username }: BadgeBoardProps) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    async function fetchTokens() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/user/badges?username=${username}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch tokens');
        }

        setTokens(data);
      } catch (err) {
        setError('An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    if (username) {
      fetchTokens();
    }
  }, [username]);

  const openModal = (badge: Badge) => {
    setSelectedBadge(badge);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
    setSelectedBadge(null);
  };

  if (isLoading) {
    return (
      <Card shadow="sm" padding="lg" radius="lg" style={{ width: '70%', minHeight: '80%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Loader />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card shadow="sm" padding="lg" radius="lg" style={{ width: '70%', minHeight: '80%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Text>{error}</Text>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card shadow="sm" padding="xl" radius="lg" style={{ width: '70%', minHeight: '80%', overflowY: 'auto' }}>
        {tokens.length === 0 ? (
          <Text size="lg">No badges found</Text>
        ) : (
          <Grid gutter="sm">
            {tokens.map((token, index) => (
              <Grid.Col key={index} span={4} style={{ width: '100px' }}>
                <div
                  onClick={() => openModal(token.badge)}
                  style={{
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    textAlign: 'center',
                    height: '200px',
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer', 
                  }}
                >
                  <img
                    src={token.badge.pic}
                    alt={token.badge.name}
                    style={{
                      width: '100%', 
                      height : '100%',
                      borderRadius: '8px',
                    }}
                  />
                </div>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Card>

      <Modal
        opened={modalOpened}
        onClose={closeModal}
         size="sm"
         radius={"lg"}
      >
        {selectedBadge && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={selectedBadge.pic}
              alt={selectedBadge.name}
              style={{
                width: '320px', // Make the image fill the width of the modal
                height: '320px',
                borderRadius: '8px',
              }}
            />
            <Text fw={500} size="xl" mt="md">{selectedBadge.name}</Text>
            <Text size="md" color="dimmed" mt="md">{selectedBadge.description}</Text>
          </div>
        )}
      </Modal>
    </>
  );
}
