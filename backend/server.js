const Fastify = require('fastify');
const cors = require('@fastify/cors');
const multipart = require('@fastify/multipart');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
const sharp = require('sharp');

dotenv.config();

const fastify = Fastify({
  logger: true
});

const port = parseInt(process.env.PORT || '5050');
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// Register plugins
fastify.register(cors, {
  origin: [
    'http://localhost:3000',
    'https://www.freeimagedescriber.com',
    'https://freeimagedescriber.com'
  ],
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
});

fastify.register(multipart, {
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB
  }
});

// File cleanup utilities
const cleanupOldFiles = () => {
  const uploadDir = 'uploads/';
  const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds
  
  if (!fs.existsSync(uploadDir)) return;
  
  try {
    const files = fs.readdirSync(uploadDir);
    const now = Date.now();
    
    files.forEach(file => {
      const filePath = path.join(uploadDir, file);
      const stats = fs.statSync(filePath);
      
      // Check if file is older than 1 hour
      if (now - stats.mtime.getTime() > ONE_HOUR) {
        try {
          fs.unlinkSync(filePath);
          fastify.log.info(`Cleaned up old file: ${file}`);
        } catch (error) {
          fastify.log.error(`Failed to delete file ${file}:`, error);
        }
      }
    });
  } catch (error) {
    fastify.log.error('Error during file cleanup:', error);
  }
};

// Schedule cleanup every 30 minutes
cron.schedule('*/30 * * * *', cleanupOldFiles);

// Clean up files on startup
cleanupOldFiles();

// Sanitize filename to prevent path traversal
const sanitizeFilename = (originalname) => {
  return path.basename(originalname).replace(/[^a-zA-Z0-9.-]/g, '_');
};

// Enhanced file validation
const validateImageFile = (mimetype, size) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
  const maxSize = 20 * 1024 * 1024; // 20MB
  
  // Check MIME type
  if (!allowedTypes.includes(mimetype)) {
    return false;
  }
  
  // Check file size
  if (size > maxSize) {
    return false;
  }
  
  return true;
};

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Test route
fastify.get('/test', async (request, reply) => {
  fastify.log.info('Test endpoint hit');
  return { message: 'Server is running!' };
});

// Health check route - for keeping server warm
fastify.get('/health', async (request, reply) => {
  fastify.log.info('Health check endpoint hit');
  return { 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };
});

// CORS test route
fastify.get('/cors-test', async (request, reply) => {
  fastify.log.info('CORS test endpoint hit');
  reply.header('Access-Control-Allow-Origin', '*');
  return { message: 'CORS test successful', timestamp: new Date().toISOString() };
});

// Optimized image processing function
async function optimizeImage(buffer, mimetype) {
  const startTime = Date.now();
  
  try {
    // Optimize image: resize if too large, compress, and convert to JPEG for better compression
    const optimizedBuffer = await sharp(buffer)
      .resize(1024, 1024, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 85, 
        progressive: true 
      })
      .toBuffer();
    
    const processingTime = Date.now() - startTime;
    console.log(`Image optimization completed in ${processingTime}ms. Original: ${buffer.length} bytes, Optimized: ${optimizedBuffer.length} bytes`);
    
    return {
      buffer: optimizedBuffer,
      mimetype: 'image/jpeg'
    };
  } catch (error) {
    console.warn('Image optimization failed, using original:', error.message);
    return {
      buffer,
      mimetype
    };
  }
}

// Main route - PERFORMANCE OPTIMIZED
fastify.post('/api/describe', async (request, reply) => {
  const requestStartTime = Date.now();
  fastify.log.info('Describe endpoint hit');
  
  try {
    const data = await request.file();
    
    if (!data) {
      fastify.log.info('No file received in request');
      return reply.status(400).send({ error: 'No image file provided' });
    }

    // Get description type from form data or query parameters
    const descriptionType = request.body?.type || request.query?.descriptionType || 'detailed';
    fastify.log.info('Description type received:', descriptionType);

    const fileSize = data.file.bytesRead || 0;
    fastify.log.info('File received:', data.filename, 'MIME type:', data.mimetype, 'Size:', fileSize);

    // Fast validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
    const maxSize = 20 * 1024 * 1024; // 20MB
    
    if (!allowedTypes.includes(data.mimetype?.toLowerCase() || '')) {
      return reply.status(400).send({ 
        error: 'Unsupported file format',
        message: `Please upload a valid image file. Supported formats: JPG, PNG, GIF, WebP, AVIF. You uploaded: ${data.mimetype || 'unknown'}`,
        code: 'INVALID_FILE_TYPE'
      });
    }
    
    if (fileSize > maxSize) {
      return reply.status(400).send({ 
        error: 'File too large',
        message: `File size must be less than 20MB. Your file is ${Math.round(fileSize / 1024 / 1024 * 100) / 100}MB`,
        code: 'FILE_TOO_LARGE'
      });
    }

    // PERFORMANCE OPTIMIZATION: Process image in memory without file system operations
    const buffer = await data.toBuffer();
    const bufferTime = Date.now();
    fastify.log.info(`Buffer conversion completed in ${bufferTime - requestStartTime}ms`);

    // Optimize image for faster processing
    const { buffer: optimizedBuffer, mimetype: optimizedMimetype } = await optimizeImage(buffer, data.mimetype);
    const optimizationTime = Date.now();
    fastify.log.info(`Image optimization completed in ${optimizationTime - bufferTime}ms`);

    // Convert optimized image to base64
    const base64Image = optimizedBuffer.toString('base64');
    const base64Time = Date.now();
    fastify.log.info(`Base64 conversion completed in ${base64Time - optimizationTime}ms. Size: ${base64Image.length} chars`);

    // Prepare optimized prompt based on description type
    let prompt = '';
    let maxTokens = 300; // Reduced default for faster responses
    
    switch (descriptionType) {
      case 'title':
        prompt = 'Generate a concise, catchy product title for this image. Keep it under 10 words.';
        maxTokens = 50;
        break;
      case 'brief':
        prompt = 'Provide a brief, one-paragraph description of this image. Focus on the main elements and purpose.';
        maxTokens = 150;
        break;
      case 'detailed':
      default:
        prompt = 'Provide a detailed description of this image, including all notable features, colors, composition, and context.';
        maxTokens = 300;
        break;
    }

    fastify.log.info('Calling OpenAI API...');
    const apiStartTime = Date.now();
    
    // PERFORMANCE OPTIMIZATION: Use faster model and optimized parameters
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // This is actually the fastest vision model
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:${optimizedMimetype};base64,${base64Image}`,
                detail: "low" // CRITICAL: Use low detail for 3x faster processing
              },
            },
          ],
        },
      ],
      max_tokens: maxTokens,
      temperature: 0.3, // Lower temperature for faster, more consistent responses
      stream: false
    });

    const apiTime = Date.now();
    fastify.log.info(`OpenAI API call completed in ${apiTime - apiStartTime}ms`);

    const description = response.choices[0]?.message?.content || 'No description generated';
    const totalTime = Date.now() - requestStartTime;
    
    fastify.log.info(`Total request processing time: ${totalTime}ms`);
    
    return { 
      description,
      processingTime: totalTime
    };
    
  } catch (error) {
    const totalTime = Date.now() - requestStartTime;
    fastify.log.error('Server Error:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      processingTime: totalTime
    });
    
    return reply.status(500).send({ 
      error: 'Failed to process image',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port, host: '0.0.0.0' });
    fastify.log.info(`Server is running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
