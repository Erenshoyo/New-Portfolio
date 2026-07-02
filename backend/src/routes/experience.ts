import express, { Request, Response } from 'express';
import { db } from '../db';
import auth from '../middleware/auth';

const router = express.Router();

// Get all experience (Public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const list = await db.getExperiences();
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Create experience (Authenticated)
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const created = await db.createExperience(req.body);
    return res.status(201).json(created);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Update experience (Authenticated)
router.put('/:id', auth, async (req: Request, res: Response) => {
  try {
    const updated = await db.updateExperience(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Experience not found' });
    return res.json(updated);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete experience (Authenticated)
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const deleted = await db.deleteExperience(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Experience not found' });
    return res.json({ message: 'Experience deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
