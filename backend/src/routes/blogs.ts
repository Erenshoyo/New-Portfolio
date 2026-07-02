import express, { Request, Response } from 'express';
import { db } from '../db';
import auth from '../middleware/auth';

const router = express.Router();

// Get all blogs (Public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const list = await db.getBlogs();
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Create blog (Authenticated)
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const created = await db.createBlog(req.body);
    return res.status(201).json(created);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Update blog (Authenticated)
router.put('/:id', auth, async (req: Request, res: Response) => {
  try {
    const updated = await db.updateBlog(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Blog not found' });
    return res.json(updated);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete blog (Authenticated)
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const deleted = await db.deleteBlog(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Blog not found' });
    return res.json({ message: 'Blog deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
