import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import fs from 'fs';
import cron from 'node-cron';

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// CORS configuration - FIXED
app.use(cors({
  origin: [frontendUrl, 'http://localhost:3000'], // Restrict to specific origins
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true
}));

// Basic middleware
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
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
          console.log(`Cleaned up old file: ${file}`);
        } catch (error) {
          console.error(`Failed to delete file ${file}:`, error);
        }
      }
    });
  } catch (error) {
    console.error('Error during file cleanup:', error);
  }
};

// Schedule cleanup every 30 minutes
cron.schedule('*/30 * * * *', cleanupOldFiles);

// Clean up files on startup
cleanupOldFiles();

// Sanitize filename to prevent path traversal
const sanitizeFilename = (originalname: string): string => {
  return path.basename(originalname).replace(/[^a-zA-Z0-9.-]/g, '_');
};

// Configure multer for file upload - FIXED
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // FIXED: Sanitize filename to prevent path traversal
    const sanitizedName = sanitizeFilename(file.originalname);
    const fileExt = path.extname(sanitizedName);
    cb(null, `${Date.now()}_${Math.random().toString(36).substring(7)}${fileExt}`);
  }
});

// Enhanced file validation
const validateImageFile = (file: Express.Multer.File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB - FIXED: Made consistent
  
  // Check MIME type
  if (!allowedTypes.includes(file.mimetype)) {
    return false;
  }
  
  // Check file size
  if (file.size > maxSize) {
    return false;
  }
  
  // Additional validation could include checking file headers
  return true;
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // FIXED: 5MB limit consistent with frontend
  },
  fileFilter: (req, file, cb) => {
    if (validateImageFile(file)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type or size. Only JPEG, PNG and GIF under 5MB are allowed.'));
    }
  }
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Test route
app.get('/test', (req: Request, res: Response) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Server is running!' });
});

// Main route - ENHANCED SECURITY
app.post('/api/describe', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  console.log('Describe endpoint hit');
  let filePath: string | undefined;
  
  try {
    if (!req.file) {
      console.log('No file received in request');
      res.status(400).json({ error: 'No image file provided' });
      return;
    }

    filePath = req.file.path; // Store for cleanup
    const descriptionType = req.body.descriptionType || 'detailed';
    console.log('Description type:', descriptionType);

    console.log('File received:', req.file.originalname, 'MIME type:', req.file.mimetype, 'Size:', req.file.size);

    // Additional server-side validation
    if (!validateImageFile(req.file)) {
      throw new Error('Invalid file type or size');
    }

    // Convert image to base64
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString('base64');
    console.log('Image converted to base64, length:', base64Image.length);

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

    console.log('Calling OpenAI API...');
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
                url: `data:${req.file.mimetype};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: descriptionType === 'title' ? 100 : 500,
    });

    const description = response.choices[0]?.message?.content || 'No description generated';
    res.json({ description });
  } catch (error: any) {
    console.error('Server Error:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    });
    
    res.status(500).json({ 
      error: 'Failed to process image',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    // CRITICAL: Always clean up the uploaded file, even if processing fails
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`Cleaned up file: ${filePath}`);
      } catch (cleanupError) {
        console.error(`Failed to cleanup file ${filePath}:`, cleanupError);
      }
    }
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 