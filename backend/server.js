const Fastify = require('fastify');
const cors = require('@fastify/cors');
const multipart = require('@fastify/multipart');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');

dotenv.config();

const fastify = Fastify({
  logger: true
});

const port = parseInt(process.env.PORT || '5050');
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// Register plugins
fastify.register(cors, {
  origin: [frontendUrl, 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true
});

fastify.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
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
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
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

// Main route - ENHANCED SECURITY
fastify.post('/api/describe', async (request, reply) => {
  fastify.log.info('Describe endpoint hit');
  let filePath;
  
  try {
    const data = await request.file();
    
    if (!data) {
      fastify.log.info('No file received in request');
      return reply.status(400).send({ error: 'No image file provided' });
    }

    const descriptionType = request.body?.descriptionType || 'detailed';
    fastify.log.info('Description type:', descriptionType);

    fastify.log.info('File received:', data.filename, 'MIME type:', data.mimetype, 'Size:', data.file.bytesRead);

    // Additional server-side validation
    if (!validateImageFile(data.mimetype || '', data.file.bytesRead)) {
      throw new Error('Invalid file type or size');
    }

    // Save file temporarily
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const sanitizedName = sanitizeFilename(data.filename || 'image');
    const fileExt = path.extname(sanitizedName);
    filePath = path.join(uploadDir, `${Date.now()}_${Math.random().toString(36).substring(7)}${fileExt}`);

    // Save file
    const buffer = await data.toBuffer();
    fs.writeFileSync(filePath, buffer);

    // Convert image to base64
    const base64Image = buffer.toString('base64');
    fastify.log.info('Image converted to base64, length:', base64Image.length);

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

    fastify.log.info('Calling OpenAI API...');
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:${data.mimetype};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: descriptionType === 'title' ? 100 : 500,
    });

    const description = response.choices[0]?.message?.content || 'No description generated';
    return { description };
  } catch (error) {
    fastify.log.error('Server Error:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    });
    
    return reply.status(500).send({ 
      error: 'Failed to process image',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    // CRITICAL: Always clean up the uploaded file, even if processing fails
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        fastify.log.info(`Cleaned up file: ${filePath}`);
      } catch (cleanupError) {
        fastify.log.error(`Failed to cleanup file ${filePath}:`, cleanupError);
      }
    }
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
