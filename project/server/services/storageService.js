import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  endpoint: `https://${process.env.SPACES_ENDPOINT}`,
  region: process.env.SPACES_REGION,
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
  }
});

export const uploadToSpaces = async (buffer, fileName, contentType) => {
  try {
    const key = `check-ins/${fileName}`;
    const command = new PutObjectCommand({
      Bucket: process.env.SPACES_BUCKET,
      Key: key,
      Body: buffer,
      ACL: 'private',
      ContentType: contentType || `image/${path.extname(fileName).substring(1)}`
    });

    await s3Client.send(command);
    return `https://${process.env.SPACES_BUCKET}.${process.env.SPACES_ENDPOINT}/${key}`;
  } catch (error) {
    console.error('Storage upload error:', error);
    throw new Error('Failed to upload file to DigitalOcean Spaces');
  }
};

export const generateStorageUrl = (fileName) => {
  return `https://${process.env.SPACES_BUCKET}.${process.env.SPACES_ENDPOINT}/check-ins/${fileName}`;
};