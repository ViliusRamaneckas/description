import AWS from 'aws-sdk';

// AWS Configuration
const awsConfig = {
  region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  credentials: new AWS.Credentials({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || ''
  }),
  endpoint: `https://s3.${process.env.REACT_APP_AWS_REGION || 'us-east-1'}.amazonaws.com`,
  sslEnabled: true,
  signatureVersion: 'v4'
};

// Initialize AWS Services with the config
const s3 = new AWS.S3(awsConfig);
const lambda = new AWS.Lambda(awsConfig);
const apiGateway = new AWS.APIGateway(awsConfig);

// Debug: Log configuration (remove in production)
console.log('AWS Config:', {
  region: awsConfig.region,
  endpoint: awsConfig.endpoint,
  hasAccessKey: !!awsConfig.credentials.accessKeyId,
  hasSecretKey: !!awsConfig.credentials.secretAccessKey
});

export {
  s3,
  lambda,
  apiGateway
}; 