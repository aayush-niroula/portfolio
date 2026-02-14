import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all social links (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const links = await prisma.socialLink.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single social link (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const link = await prisma.socialLink.findUnique({
      where: { id: req.params.id },
    });
    if (!link) {
      return res.status(404).json({ error: 'Social link not found' });
    }
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create social link (protected)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { platform, url, icon, order } = req.body;
    const link = await prisma.socialLink.create({
      data: {
        platform,
        url,
        icon,
        order: order || 0,
      },
    });
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update social link (protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { platform, url, icon, order } = req.body;
    const link = await prisma.socialLink.update({
      where: { id: req.params.id },
      data: {
        platform,
        url,
        icon,
        order,
      },
    });
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete social link (protected)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await prisma.socialLink.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Social link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
