import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow PDFs
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Upload resume (protected)
router.post('/resume', authMiddleware, upload.single('resume'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const resumeUrl = `/uploads/${req.file.filename}`;
    
    res.json({ 
      message: 'Resume uploaded successfully',
      url: resumeUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload resume' });
  }
});

// Get resume info (public endpoint for visitors)
router.get('/resume/public', async (req: Request, res: Response) => {
  try {
    const uploadsDir = uploadDir;
    
    // Find the most recent resume file
    const files = fs.readdirSync(uploadsDir)
      .filter(f => f.startsWith('resume-') && f.endsWith('.pdf'))
      .map(f => ({
        name: f,
        path: path.join(uploadsDir, f),
        created: fs.statSync(path.join(uploadsDir, f)).birthtime
      }))
      .sort((a, b) => b.created.getTime() - a.created.getTime());

    if (files.length === 0) {
      return res.json({ exists: false });
    }

    const latestResume = files[0];
    res.json({
      exists: true,
      url: `/uploads/${latestResume.name}`,
      filename: latestResume.name
    });
  } catch (error) {
    console.error('Error getting resume:', error);
    res.status(500).json({ error: 'Failed to get resume info' });
  }
});

// Get resume info (protected)
router.get('/resume', authMiddleware, async (req: Request, res: Response) => {
  try {
    const uploadsDir = uploadDir;
    
    // Find the most recent resume file
    const files = fs.readdirSync(uploadsDir)
      .filter(f => f.startsWith('resume-') && f.endsWith('.pdf'))
      .map(f => ({
        name: f,
        path: path.join(uploadsDir, f),
        created: fs.statSync(path.join(uploadsDir, f)).birthtime
      }))
      .sort((a, b) => b.created.getTime() - a.created.getTime());

    if (files.length === 0) {
      return res.json({ exists: false });
    }

    const latestResume = files[0];
    res.json({
      exists: true,
      url: `/uploads/${latestResume.name}`,
      filename: latestResume.name
    });
  } catch (error) {
    console.error('Error getting resume:', error);
    res.status(500).json({ error: 'Failed to get resume info' });
  }
});

// Delete resume (protected)
router.delete('/resume', authMiddleware, async (req: Request, res: Response) => {
  try {
    const uploadsDir = uploadDir;
    
    const files = fs.readdirSync(uploadsDir)
      .filter(f => f.startsWith('resume-') && f.endsWith('.pdf'));

    for (const file of files) {
      fs.unlinkSync(path.join(uploadsDir, file));
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

export default router;
