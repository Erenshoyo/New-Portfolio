import express, { Request, Response } from 'express';
import { db } from '../db';
import auth from '../middleware/auth';

const router = express.Router();

// Get all skills (Public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const list = await db.getSkills();
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Create skill (Authenticated)
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const created = await db.createSkill(req.body);
    return res.status(201).json(created);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Update skill (Authenticated)
router.put('/:id', auth, async (req: Request, res: Response) => {
  try {
    const updated = await db.updateSkill(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Skill not found' });
    return res.json(updated);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete skill (Authenticated)
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const deleted = await db.deleteSkill(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Skill not found' });
    return res.json({ message: 'Skill deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
