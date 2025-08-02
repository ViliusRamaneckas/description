import { S3Client } from '@aws-sdk/client-s3';
import { LambdaClient } from '@aws-sdk/client-lambda';
import { APIGatewayClient } from '@aws-sdk/client-api-gateway';
import { fromEnv } from '@aws-sdk/credential-providers';

// AWS Configuration for frontend (client-side)
const awsConfig = {
  region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  // Note: For client-side apps, credentials should be handled via Cognito or IAM roles
  // Do not put AWS access keys in frontend code
};

// Initialize AWS Services with v3 SDK
const s3Client = new S3Client(awsConfig);
const lambdaClient = new LambdaClient(awsConfig);
const apiGatewayClient = new APIGatewayClient(awsConfig);

export {
  s3Client as s3,
  lambdaClient as lambda,
  apiGatewayClient as apiGateway
}; 