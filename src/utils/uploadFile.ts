import AWS from 'aws-sdk';
import fs from 'fs';

const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_URL || '');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_ID,
  region: process.env.DO_SPACES_REGION,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

const uploadFile = async (files: any, contentType: string) => {
  if (!files) return '';

  const fileKey = new Date().getTime() + files.name;

  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: process.env.DO_SPACES_BUCKET || '',
        Key: fileKey,
        Body: fs.createReadStream(files.tempFilePath),
        ACL: 'public-read',
        ContentType: contentType,
      },
      (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(`https://nayar-fs.sgp1.digitaloceanspaces.com/${fileKey}`);
        }
      },
    );
  });
};

export default uploadFile;
