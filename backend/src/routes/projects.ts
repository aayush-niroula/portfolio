import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all projects (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get featured projects (public)
router.get('/featured', async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: 'asc' },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single project (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create project (protected)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description, imageUrl, projectUrl, liveDemoUrl, githubUrl, tags, featured, order } = req.body;
    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        projectUrl,
        liveDemoUrl,
        githubUrl,
        tags: tags || [],
        featured: featured || false,
        order: order || 0,
      },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update project (protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description, imageUrl, projectUrl, liveDemoUrl, githubUrl, tags, featured, order } = req.body;
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        imageUrl,
        projectUrl,
        liveDemoUrl,
        githubUrl,
        tags,
        featured,
        order,
      },
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete project (protected)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await prisma.project.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
