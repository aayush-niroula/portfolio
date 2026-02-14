import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all skills (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get skills by category (public)
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const skills = await prisma.skill.findMany({
      where: { category: req.params.category },
      orderBy: { order: 'asc' },
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single skill (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id: req.params.id },
    });
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create skill (protected)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, icon, category, level, order } = req.body;
    const skill = await prisma.skill.create({
      data: {
        name,
        icon,
        category,
        level: level || 80,
        order: order || 0,
      },
    });
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update skill (protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, icon, category, level, order } = req.body;
    const skill = await prisma.skill.update({
      where: { id: req.params.id },
      data: {
        name,
        icon,
        category,
        level,
        order,
      },
    });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete skill (protected)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await prisma.skill.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
