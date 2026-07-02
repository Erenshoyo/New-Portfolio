import express, { Request, Response } from 'express';
import { db } from '../db';
import auth from '../middleware/auth';

const router = express.Router();

// Get all education (Public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const list = await db.getEducations();
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Create education (Authenticated)
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const created = await db.createEducation(req.body);
    return res.status(201).json(created);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Update education (Authenticated)
router.put('/:id', auth, async (req: Request, res: Response) => {
  try {
    const updated = await db.updateEducation(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Education history not found' });
    return res.json(updated);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete education (Authenticated)
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const deleted = await db.deleteEducation(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Education history not found' });
    return res.json({ message: 'Education history deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
