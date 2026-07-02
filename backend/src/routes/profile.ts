import express, { Request, Response } from 'express';
import { db } from '../db';
import auth from '../middleware/auth';

const router = express.Router();

// Get profile (Public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const profile = await db.getProfile();
    return res.json(profile);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Update profile (Authenticated)
router.put('/', auth, async (req: Request, res: Response) => {
  try {
    const updated = await db.updateProfile(req.body);
    return res.json(updated);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
