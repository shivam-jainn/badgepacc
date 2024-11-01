'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaUpload } from 'react-icons/fa';
import { Button, Card, Stack, TextInput, Tooltip } from '@mantine/core';
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { useSession } from 'next-auth/react';
import { useAtom } from 'jotai';
import { badgeFormAtom } from '@/atoms/CreateBadgeFormAtom';
import { uploadBadgeAndGetPresignedUrl } from '@/app/(onboarding)/org/badge/name/actions';

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}


export default function OnBoardingCreateBadge() {
  const [badgeName, setBadgeName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useAtom(badgeFormAtom);
  const [image, setImage] = useState<ArrayBuffer>();

  const handleSubmit = async (): Promise<void> => {
    if (!badgeName || badgeName.length < 5) {
      setError('Badge Name must be at least 5 characters long');
      return;
    }
  
    setError('');
    setLoading(true);
    try {
      if (!session) {
        router.replace('/signin');
        return;
      }
  
      const base64Image = image ? arrayBufferToBase64(image) : null;
      if (!base64Image) {
        throw new Error("Image is missing.");
      }
  
      const presignedUrl = await uploadBadgeAndGetPresignedUrl(base64Image, badgeName);
      console.log("Presigned URL:", presignedUrl);
  
      setFormData((prev) => ({
        ...prev,
        badgeName,
        presignedUrl,
        _image: base64Image, // Optionally, keep the base64 image in formData if needed
      }));

      router.push('/org/badge/desc');
    } catch (err) {
      console.error('Error uploading badge:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    setBadgeName(value);
    setError(value.length >= 5 ? '' : 'Badge Name must be at least 5 characters long');
  };

  const handleDrop = (files: FileWithPath[]) => {
    const file = files[0];
    if (file) {
      const previewReader = new FileReader();
      const uploadReader = new FileReader();
  
      // For preview: read as Data URL
      previewReader.onload = () => {
        setFormData((prev) => ({ ...prev, image: previewReader.result as string }));
      };
      previewReader.readAsDataURL(file);
  
      // For upload: read as ArrayBuffer
      uploadReader.onload = () => {
        setImage(uploadReader.result as ArrayBuffer);
      };
      uploadReader.readAsArrayBuffer(file);
    }
  };
  

  return (
    <Stack justify="space-between" mt="md" mb="xs" align="center">
      <Dropzone onDrop={handleDrop} accept={{ 'image/*': [] }}>
        <Card
          style={{
            position: 'relative',
            width: 200,
            height: 200,
            borderRadius: '1rem',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          withBorder
          shadow="xl"
          padding={0}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: formData.image
                ? `url(${formData.image})`
                : 'url(https://images.pexels.com/photos/14589064/pexels-photo-14589064.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: formData.image ? 'none' : 'blur(4px)',
              transition: 'filter 0.3s ease, brightness 0.3s ease',
            }}
          />
          {!formData.image && (
            <FaUpload
              size={48}
              color="gray"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.7,
              }}
            />
          )}
        </Card>
      </Dropzone>

      <Tooltip label={error} opened={!!error} position="top" withArrow color="red">
        <TextInput
          withAsterisk
          required
          style={{ width: '100%' }}
          size="lg"
          radius="xl"
          placeholder="Badge Name"
          value={badgeName}
          onChange={handleChange}
          error={!!error}
        />
      </Tooltip>
      
      <Button
        radius="xl"
        size="lg"
        fullWidth
        onClick={handleSubmit}
        loading={loading}
        loaderProps={{ type: 'dots' }}
      >
        <FaArrowRight size={20} />
      </Button>
    </Stack>
  );
}