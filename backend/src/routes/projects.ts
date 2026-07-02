import express, { Request, Response } from 'express';
import { db } from '../db';
import auth from '../middleware/auth';

const router = express.Router();

// Get all projects (Public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const list = await db.getProjects();
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Get single project (Public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await db.getProjectById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Project not found' });
    return res.json(item);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Create project (Authenticated)
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const created = await db.createProject(req.body);
    return res.status(201).json(created);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Update project (Authenticated)
router.put('/:id', auth, async (req: Request, res: Response) => {
  try {
    const updated = await db.updateProject(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    return res.json(updated);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete project (Authenticated)
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const deleted = await db.deleteProject(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found or already deleted' });
    return res.json({ message: 'Project deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
