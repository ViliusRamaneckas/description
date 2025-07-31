const AWS = require('aws-sdk');

// AWS Configuration
AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

// Initialize AWS Services
const s3 = new AWS.S3();
const lambda = new AWS.Lambda();
const apiGateway = new AWS.APIGateway();

module.exports = {
  s3,
  lambda,
  apiGateway
}; 