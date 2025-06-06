import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { products, brands, Product } from '../data/db';
import { authMiddleware } from '../middleware/auth';

const router = Router();


router.post('/', (req: Request, res: Response) => {
  const { title, price, brandId } = req.body;
  const product: Product = { id: uuidv4(), title, price, brandId };
  products.push(product);
  res.status(201).json(product);
});

// Read all products
router.get('/', (req: Request, res: Response) => {
  res.json(products);
});

// Read product by ID
router.get('/:id', (req: Request, res: Response) => {
  const product = products.find(u => u.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

router.get('/:id/details', (req: Request, res: Response) => {
  const product = products.find(u => u.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const brand = brands.find(b => b.id === product.brandId);
  if (!brand) return res.status(404).json({ message: "Brand not found" });

  res.json({ product, brand });
});


// Update product by ID
router.put('/:id', (req: Request, res: Response) => {
  const product = products.find(u => u.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  const { title, price, brandId } = req.body;
  if (title) product.title = title;
  if (price) product.price = price;
  if (brandId) product.brandId = brandId;
  res.json(product);
});

// Delete product by ID
router.delete('/:id', (req: Request, res: Response) => {
  const idx = products.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Product not found" });
  products.splice(idx, 1);
  res.status(204).send();
});

router.post('/:id/buy', authMiddleware, (req: Request, res: Response) => {
  const { quantity } = req.body;
  const product = products.find(u => u.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  // @ts-ignore
  const user = req.user;
  const total = Number(product.price) * Number(quantity);

  if (user.balance < total) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  user.balance -= total;
  res.status(200).json({ message: `Purchased ${quantity} of ${product.title}`, balance: user.balance });
});

export default router;