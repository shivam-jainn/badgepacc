'use client';
import { Card, Stack, Text, Badge, Flex, Modal, Image, Skeleton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { TbWorldWww } from "react-icons/tb";

interface UserData {
  name: string | null;
  username: string | null;
  email: string | null;
  isOrganisation: boolean | null;
  bio: string | null;
  website: string | null;
  image: string | null;
  skills: string[] | null;
  banner: string | null;
}

interface UserCardProps {
  username: string;
}

const UserCardSkeleton = () => (
  <Card shadow="sm" padding="lg" radius="lg" style={{ width: '100%', maxWidth: '320px' }}>
    <div style={{
      height: '150px',
      overflow: 'hidden',
      borderRadius: '8px 8px 0 0',
      position: 'relative'
    }}>
      <Skeleton height={120} radius={0} />
      <div style={{
        width: '80px',
        height: '80px',
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        <Skeleton circle height={80} />
      </div>
    </div>

    <Stack style={{ marginTop: '8px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Skeleton height={24} width="60%" radius="md" />
        <Skeleton height={20} width="40%" radius="md" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Skeleton height={16} width="80%" radius="md" />
        <Skeleton height={16} width="70%" radius="md" />
      </div>
      <Flex align="center" gap={8} justify="center" style={{ marginBottom: '8px' }}>
        <Skeleton circle height={24} width={24} />
        <Skeleton height={20} width="50%" radius="md" />
      </Flex>
      <Flex wrap="wrap" justify="center" style={{ marginTop: '8px', gap: '8px' }}>
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} height={20} width={60} radius="xl" />
        ))}
      </Flex>
    </Stack>
  </Card>
);

export default function UserCard({ username }: UserCardProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            datapoints: [
              'name', 'username', 'email', 'isOrganisation',
              'bio', 'website', 'image', 'skills', 'banner',
            ],
          }),
        });

        if(response.status == 404){
            router.push('/notfound');
        }

        if (response.ok) {
          const data: UserData = await response.json();
          setUserData(data);
        } 
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [username]);

  if (isLoading) {
    return <UserCardSkeleton />;
  }

  if (!userData) {
    return <Text>Error loading user data</Text>;
  }

  const skills = userData.skills ?? [];
  const displayedSkills = skills.slice(0, 10);
  const remainingSkillsCount = Math.max(0, skills.length - 10);
  const showMoreSkills = remainingSkillsCount > 0;

  return (
    <Card shadow="sm" padding="lg" radius="lg" style={{ width: '30%', maxWidth: '320px', minHeight: '80%' }}>
      <div style={{
        height: '150px',
        overflow: 'hidden',
        borderRadius: '8px 8px 0 0',
        position: 'relative'
      }}>
        <Image
          src={userData.banner || 'https://images.pexels.com/photos/29060134/pexels-photo-29060134/free-photo-of-creative-beach-signage-with-coffee-and-arrow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
          alt="Banner"
          style={{
            width: '100%',
            height: '80%',
            objectFit: 'cover',
          }}
        />
        <img
          src={userData.image || 'https://via.placeholder.com/80'}
          alt="Profile"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            border: '4px solid white',
          }}
        />
      </div>

      <Stack style={{ marginTop: '8px' }}>
        <div>
          <h2 style={{ textAlign: 'center', padding: '0px', margin: '0px', fontWeight: 'bold' }}>
            {userData.name || 'Name not available'}
          </h2>
          <p style={{ textAlign: 'center', padding: '0px', margin: '0px' }}>
            <Badge>@{userData.username || 'Username not available'}</Badge>
          </p>
        </div>
        <Text style={{ textAlign: 'center', marginBottom: '2px' }}>
          {userData.bio || 'No bio available'}
        </Text>
        <Flex align="center" gap={8} justify="center" style={{ marginBottom: '8px' }}>
          <TbWorldWww size={24} />
          <Text component="a" href={userData.website || '#'} target="_blank" rel="noopener noreferrer" size="20px">
            {userData.website || 'No website'}
          </Text>
        </Flex>
        {userData.isOrganisation && <Badge color="blue">Organisation</Badge>}

        {/* Render Skills only for larger screens */}
        <div className="skills-container">
          <Flex wrap="wrap" justify="center" style={{ marginTop: '8px' }}>
            {displayedSkills.length > 0 ? (
              displayedSkills.map((skill, index) => (
                <Badge key={index} style={{ margin: '4px' }} color="gray">
                  {skill}
                </Badge>
              ))
            ) : (
              <Text>No skills found</Text>
            )}
            {showMoreSkills && (
              <Badge
                onClick={() => setOpened(true)}
                style={{ margin: '4px' }}
                color="blue"
              >
                + {remainingSkillsCount} more
              </Badge>
            )}
          </Flex>
        </div>
      </Stack>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Skills"
        radius="lg"
        style={{ border: '1px solid white' }}
        transitionProps={{ duration: 200, transition: 'pop' }}
      >
        <Flex wrap="wrap" justify="center" style={{ marginTop: '8px' }}>
          {skills.map((skill, index) => (
            <Badge key={index} style={{ margin: '4px' }} color="gray">
              {skill}
            </Badge>
          ))}
        </Flex>
      </Modal>

    </Card>
  );
}
