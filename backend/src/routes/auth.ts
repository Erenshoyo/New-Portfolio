import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
  const { password } = req.body;
  const adminPassword = process.env.DASHBOARD_PASSWORD || 'admin123';

  if (password === adminPassword) {
    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET || 'supersecretjwtkeyforportfolio',
      { expiresIn: '7d' }
    );
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid password' });
  }
});

router.get('/verify', (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ valid: false });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ valid: false });

  try {
    jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkeyforportfolio');
    return res.json({ valid: true });
  } catch (err) {
    return res.status(401).json({ valid: false });
  }
});

export default router;
