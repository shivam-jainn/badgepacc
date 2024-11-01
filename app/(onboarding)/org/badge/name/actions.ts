"use server";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@/auth";

export async function uploadBadgeAndGetPresignedUrl(badgeImage: string, badgeName: string) {
  const session = await auth();

  const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_S3_SECRET as string,
    },
    endpoint: 'http://localhost:4566',
    forcePathStyle: true,
  });

  const formattedBadgeName = encodeURIComponent(badgeName.replace(/\s+/g, '_'));
  const key = `badges/${session?.user.id}/${formattedBadgeName}.png`;

  // Convert base64 string to Buffer
  const buffer = Buffer.from(badgeImage, 'base64');

  try {
    const uploadParams = {
      Bucket: 'bp-localtest',
      Key: key,
      Body: buffer,  // Use the buffer created from base64
      ContentType: "image/png",
    };
    
    await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("File uploaded successfully.");

    const getObjectCommand = new GetObjectCommand({
      Bucket: 'bp-localtest',
      Key: key,
    });
    const presignedUrl = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 });

    console.log("Generated presigned URL:", presignedUrl);

    return presignedUrl;
  } catch (error) {
    console.error("Error uploading file or generating presigned URL:", error);
    throw error;
  }
}
