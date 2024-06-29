const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config()
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey:process.env.SECRET,
});
const s3 = new AWS.S3();

const bucket = process.env.BUCKET_NAME
const contentType = 'image/*'; 
async function uploadFileToS3( fileName, fileContent) {
    const params = {
        Bucket: bucket,
        Key: fileName,
        Body: fileContent,
        ContentType: contentType,
        ACL: 'public-read', 
    };
    console.log("access key" ,process.env.AWS_ACCESS_KEY , process.env.AWS_SECRET_KEY , params )

  try {
    const data = await s3.upload(params).promise();
    console.log('File uploaded successfully:', data.Location);
    return data.Location;
  } catch (err) {
    console.error('Error uploading file to S3:', err);
    throw err;
  }
}
module.exports = uploadFileToS3
