import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Coupon, coupons } from '../data/db';
import { authMiddleware, requireAdmin } from '../middleware/auth';

const router = Router();

// Create coupon
router.post('/', requireAdmin, (req: Request, res: Response) => {
  const { name, discount } = req.body;
  const coupon: Coupon = { id: uuidv4(), name, discount };
  coupons.push(coupon);
  res.status(201).json(coupon);
});
// Read all coupons
router.get('/', authMiddleware, (req: Request, res: Response) => {
  res.json(coupons);
});
// Read coupon by ID
router.get('/:id', authMiddleware, (req: Request, res: Response) => {
  const coupon = coupons.find(c => c.id === req.params.id);
  if (!coupon) return res.status(404).json({ message: "Coupon not found" });
  res.json(coupon);
});
// Update coupon by ID
router.put('/:id', requireAdmin, (req: Request, res: Response) => {
  const coupon = coupons.find(c => c.id === req.params.id);
  if (!coupon) return res.status(404).json({ message: "Coupon not found" });
  const { name, discount } = req.body;
  if (name) coupon.name = name;
  if (discount) coupon.discount = discount;
  res.json(coupon);
});
// Delete coupon by ID
router.delete('/:id', requireAdmin, (req: Request, res: Response) => {
  const idx = coupons.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Coupon not found" });
  coupons.splice(idx, 1);
  res.status(204).send();
});
// Export the router
export default router;
