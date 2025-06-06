import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { brands, Brand } from '../data/db';

const router = Router();


router.post('/', (req: Request, res: Response) => {
  const { title } = req.body;
  const brand: Brand = { id: uuidv4(), title };
  brands.push(brand);
  res.status(201).json(brand);
});

// Read all brands
router.get('/', (req: Request, res: Response) => {
  res.json(brands);
});

// Read brand by ID
router.get('/:id', (req: Request, res: Response) => {
  const brand = brands.find(u => u.id === req.params.id);
  if (!brand) return res.status(404).json({ message: "Brand not found" });
  res.json(brand);
});


// Update brand by ID
router.put('/:id', (req: Request, res: Response) => {
  const brand = brands.find(u => u.id === req.params.id);
  if (!brand) return res.status(404).json({ message: "Brand not found" });
  const { title } = req.body;
  if (title) brand.title = title;
  res.json(brand);
});

// Delete brand by ID
router.delete('/:id', (req: Request, res: Response) => {
  const idx = brands.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Brand not found" });
  brands.splice(idx, 1);
  res.status(204).send();
});

export default router;