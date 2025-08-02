const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');
const axios = require('axios');

// Initialize AWS SDK v3 clients with optimized configuration
const awsConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
};

const s3Client = new S3Client(awsConfig);
const lambdaClient = new LambdaClient(awsConfig);

exports.handler = async (event) => {
    try {
        // Parse the incoming request
        const { imageUrl, descriptionType = 'detailed' } = JSON.parse(event.body || JSON.stringify(event));

        if (!imageUrl) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Image URL is required' })
            };
        }

        // Get the image from S3
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        const base64Image = imageBuffer.toString('base64');

        // Prepare prompt based on description type
        let prompt = '';
        switch (descriptionType) {
            case 'title':
                prompt = 'Generate a concise, catchy product title for this image. Keep it under 10 words.';
                break;
            case 'brief':
                prompt = 'Provide a brief, one-paragraph description of this image. Focus on the main elements and purpose.';
                break;
            case 'detailed':
            default:
                prompt = 'Provide a detailed description of this image, including all notable features, colors, composition, and context.';
                break;
        }

        // Call OpenAI API via another Lambda function
        const command = new InvokeCommand({
            FunctionName: 'openai-image-description',
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify({
                image: base64Image,
                prompt: prompt
            })
        });

        const openaiResponse = await lambdaClient.send(command);
        // Optimized: Direct buffer conversion (faster than TextDecoder)
        const responsePayload = JSON.parse(Buffer.from(openaiResponse.Payload).toString('utf8'));

        if (openaiResponse.FunctionError) {
            throw new Error(responsePayload.errorMessage || 'OpenAI function error');
        }

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                description: responsePayload.description,
                imageUrl
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Internal server error',
                message: error.message
            })
        };
    }
}; 