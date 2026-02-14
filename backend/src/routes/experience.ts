import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all experiences (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single experience (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const experience = await prisma.experience.findUnique({
      where: { id: req.params.id },
    });
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create experience (protected)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, company, location, startDate, endDate, current, description, order } = req.body;
    const experience = await prisma.experience.create({
      data: {
        title,
        company,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current: current || false,
        description,
        order: order || 0,
      },
    });
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update experience (protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, company, location, startDate, endDate, current, description, order } = req.body;
    const experience = await prisma.experience.update({
      where: { id: req.params.id },
      data: {
        title,
        company,
        location,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : null,
        current,
        description,
        order,
      },
    });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete experience (protected)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await prisma.experience.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
