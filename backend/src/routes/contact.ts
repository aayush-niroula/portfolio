import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Submit contact message (public)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    res.status(201).json({ message: 'Message sent successfully', id: contactMessage.id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all messages (protected)
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get unread messages count (protected)
router.get('/unread/count', authMiddleware, async (req: Request, res: Response) => {
  try {
    const count = await prisma.contactMessage.count({
      where: { read: false },
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single message (protected)
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const message = await prisma.contactMessage.findUnique({
      where: { id: req.params.id },
    });
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark message as read (protected)
router.put('/:id/read', authMiddleware, async (req: Request, res: Response) => {
  try {
    const message = await prisma.contactMessage.update({
      where: { id: req.params.id },
      data: { read: true },
    });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete message (protected)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await prisma.contactMessage.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
