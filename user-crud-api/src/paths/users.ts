import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];
const router = Router();

// Create user
router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user: User = { id: uuidv4(), name, email };
  users.push(user);
  res.status(201).json(user);
});

// Read all users
router.get('/', (req: Request, res: Response) => {
  res.json(users);
});

// Read user by ID
router.get('/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Update user by ID
router.put('/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  res.json(user);
});

// Delete user by ID
router.delete('/:id', (req: Request, res: Response) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "User not found" });
  users.splice(idx, 1);
  res.status(204).send();
});

export default router;