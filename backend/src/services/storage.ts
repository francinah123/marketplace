import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

const bucketName = process.env.AWS_S3_BUCKET!;

// Upload file to S3 and return public URL
export async function uploadFileToS3(file: Express.Multer.File) {
  const key = `uploads/${Date.now()}-${path.basename(file.originalname)}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype
  });

  await s3.send(command);

  return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

// Local fallback (for dev without S3)
export function buildFileUrl(filename: string) {
  return `/uploads/${filename}`;
}
