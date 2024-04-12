import {S3Client,PutObjectCommand} from '@aws-sdk/client-s3';

export async function UploadBadgeImage(resized_image:Buffer,user_id:string,badgeName:string) {
    const BUCKET = process.env.AWS_BUCKET;
    const IDENTIFIER = user_id+"/badge/"+badgeName
    const s3Client = new S3Client({});

    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: IDENTIFIER,
        Body: resized_image,
      });

      try {
        await s3Client.send(command);
        return BUCKET+IDENTIFIER as string;
      } catch (err) {
        console.error(err);
      }
}