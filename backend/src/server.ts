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
    fileSize: 5 * 1024 * 1024 // 5MB limit
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

    console.log('File received:', req.file.originalname, 'MIME type:', req.file.mimetype);

    // Convert image to base64
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString('base64');
    console.log('Image converted to base64, length:', base64Image.length);

    console.log('Calling OpenAI API...');
    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe this image in detail." },
            {
              type: "image_url",
              image_url: {
                url: `data:${req.file.mimetype};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    });
    console.log('OpenAI API response received');

    // Clean up: delete the uploaded file
    fs.unlinkSync(req.file.path);
    console.log('Uploaded file cleaned up');

    // Send the description back to the client
    res.json({ 
      description: response.choices[0].message.content 
    });
    console.log('Response sent to client');

  } catch (error: any) {
    console.error('Detailed error:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      response: error?.response?.data
    });
    res.status(500).json({ 
      error: 'Failed to generate description',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 