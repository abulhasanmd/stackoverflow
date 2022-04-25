const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});
// AWS.Config.
const myBucket = process.env.bucketName;

const signedUrlExpireSeconds = 60 * 10;
function generateSignedUrl() {
  return s3.getSignedUrlPromise('putObject', {
    Bucket: myBucket,
    Key: `${process.env.dirName}/${uuidv4()}`,
    Expires: signedUrlExpireSeconds,
  });
}

module.exports = { generateSignedUrl };
