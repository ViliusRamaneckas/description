import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// CORS configuration
app.use(cors({
  origin: true, // Allow all origins
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

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024 // 1MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'));
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

// Main route
app.post('/api/describe', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  console.log('Describe endpoint hit');
  try {
    if (!req.file) {
      console.log('No file received in request');
      res.status(400).json({ error: 'No image file provided' });
      return;
    }

    const descriptionType = req.body.descriptionType || 'detailed';
    console.log('Description type:', descriptionType);

    console.log('File received:', req.file.originalname, 'MIME type:', req.file.mimetype, 'Size:', req.file.size);

    // Check file size
    if (req.file.size > 1 * 1024 * 1024) { // 1MB
      res.status(400).json({ error: 'Image size must be less than 1MB' });
      return;
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

    // Clean up the uploaded file
    fs.unlinkSync(req.file.path);

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
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 