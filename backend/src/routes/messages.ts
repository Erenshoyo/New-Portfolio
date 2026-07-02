import express, { Request, Response } from 'express';
import { db } from '../db';
import auth from '../middleware/auth';

const router = express.Router();

// Submit a contact message (Public)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    const created = await db.createMessage({ name, email, subject: subject || '', message });
    return res.status(201).json(created);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Get all messages (Authenticated — dashboard only)
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const list = await db.getMessages();
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Mark a message as read (Authenticated)
router.patch('/:id/read', auth, async (req: Request, res: Response) => {
  try {
    const updated = await db.markMessageRead(req.params.id);
    if (!updated) return res.status(404).json({ message: 'Message not found' });
    return res.json(updated);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete a message (Authenticated)
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const deleted = await db.deleteMessage(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Message not found' });
    return res.json({ message: 'Message deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
