import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all education (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single education (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const education = await prisma.education.findUnique({
      where: { id: req.params.id },
    });
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create education (protected)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { degree, institution, location, startDate, endDate, current, description, order } = req.body;
    const education = await prisma.education.create({
      data: {
        degree,
        institution,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current: current || false,
        description,
        order: order || 0,
      },
    });
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update education (protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { degree, institution, location, startDate, endDate, current, description, order } = req.body;
    const education = await prisma.education.update({
      where: { id: req.params.id },
      data: {
        degree,
        institution,
        location,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : null,
        current,
        description,
        order,
      },
    });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete education (protected)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await prisma.education.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
