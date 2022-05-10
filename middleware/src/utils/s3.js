const {
	v4: uuidv4,
} = require('uuid');
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
async function generateSignedUrl() {
	const uploadURL = await s3.getSignedUrlPromise('putObject', {
		Bucket: myBucket,
		Key: `${process.env.dirName}/${uuidv4()}`,
		Expires: signedUrlExpireSeconds,
	});
	return uploadURL;
}

module.exports = {
	generateSignedUrl,
};