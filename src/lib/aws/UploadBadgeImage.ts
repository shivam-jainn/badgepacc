import {S3Client,PutObjectCommand} from '@aws-sdk/client-s3';

export async function UploadBadgeImage(resized_image:Buffer,user_id:string,badgeName:string) {
    const BUCKET = process.env.AWS_BUCKET;
    const IDENTIFIER = user_id+"/badge/"+badgeName
    console.log(IDENTIFIER);
    
    const s3Client = new S3Client({region:process.env.AWS_BUCKET_REGION,
      credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY as string,
        secretAccessKey : process.env.AWS_SECRET as string
      }
    });

    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: IDENTIFIER,
        Body: resized_image,
      });

      try {
        await s3Client.send(command);
        console.log(BUCKET+IDENTIFIER);
        
        return BUCKET+IDENTIFIER as string;
      } catch (err) {
        console.error(err);
      }
}