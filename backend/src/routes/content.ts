import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all site content (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const content = await prisma.siteContent.findMany();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get content by key (public)
router.get('/:key', async (req: Request, res: Response) => {
  try {
    const content = await prisma.siteContent.findUnique({
      where: { key: req.params.key },
    });
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create or update content (protected)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { key, value, type } = req.body;
    const content = await prisma.siteContent.upsert({
      where: { key },
      update: { value, type },
      create: { key, value, type: type || 'text' },
    });
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update content (protected)
router.put('/:key', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { value, type } = req.body;
    const content = await prisma.siteContent.update({
      where: { key: req.params.key },
      data: { value, type },
    });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete content (protected)
router.delete('/:key', authMiddleware, async (req: Request, res: Response) => {
  try {
    await prisma.siteContent.delete({
      where: { key: req.params.key },
    });
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Bulk update content (protected)
router.post('/bulk', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { items } = req.body;
    const results = await Promise.all(
      items.map((item: { key: string; value: string; type?: string }) =>
        prisma.siteContent.upsert({
          where: { key: item.key },
          update: { value: item.value, type: item.type },
          create: { key: item.key, value: item.value, type: item.type || 'text' },
        })
      )
    );
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
