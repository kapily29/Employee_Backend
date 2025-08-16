import { Router } from 'express';
import Employee from '../models/Employee.js';
import { adminOnly } from '../middleware/auth.js';

const router = Router();

// Create employee (admin)
router.post('/', adminOnly, async (req, res, next) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json(emp);
  } catch (e) { next(e); }
});

// Read all employees (admin)
router.get('/', adminOnly, async (req, res, next) => {
  try {
    const list = await Employee.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) { next(e); }
});

// Read one (admin)
router.get('/:id', adminOnly, async (req, res, next) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ error: 'Not found' });
    res.json(emp);
  } catch (e) { next(e); }
});

// Update (admin)
router.put('/:id', adminOnly, async (req, res, next) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!emp) return res.status(404).json({ error: 'Not found' });
    res.json(emp);
  } catch (e) { next(e); }
});

// Delete (admin)
router.delete('/:id', adminOnly, async (req, res, next) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
