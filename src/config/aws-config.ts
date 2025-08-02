import { S3Client } from '@aws-sdk/client-s3';
import { LambdaClient } from '@aws-sdk/client-lambda';
import { APIGatewayClient } from '@aws-sdk/client-api-gateway';

// AWS Configuration for TypeScript frontend
const awsConfig = {
  region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  // Note: For production, use AWS Cognito or IAM roles for authentication
  // Do not hardcode credentials in frontend applications
};

// Initialize AWS Services with v3 SDK
const s3Client = new S3Client(awsConfig);
const lambdaClient = new LambdaClient(awsConfig);
const apiGatewayClient = new APIGatewayClient(awsConfig);

// Debug: Log configuration (remove in production)
console.log('AWS Config:', {
  region: awsConfig.region,
  sdkVersion: '3.x'
});

export {
  s3Client as s3,
  lambdaClient as lambda,
  apiGatewayClient as apiGateway
}; 