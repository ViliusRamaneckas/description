import { s3 } from '../config/aws-config';

export const uploadImageToS3 = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('http://localhost:5050/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};

export const generateImageDescription = async (imageUrl: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:5050/api/describe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate description');
    }

    const data = await response.json();
    return data.description;
  } catch (error) {
    console.error('Error generating description:', error);
    throw error;
  }
};

// Test function to verify AWS configuration
export const testAWSConnection = async (): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('Testing AWS connection through backend...');
    
    const response = await fetch('http://localhost:5050/api/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Backend test failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: data.success,
      message: data.message
    };
  } catch (error: any) {
    console.error('Connection Test Error:', error);
    return {
      success: false,
      message: `Connection test failed: ${error.message}`
    };
  }
}; 