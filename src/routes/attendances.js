import { Router } from 'express';
import Attendance from '../models/Attendance.js';
import Employee from '../models/Employee.js';
import { adminOnly } from '../middleware/auth.js';

const router = Router();

// Create attendance (admin)
router.post('/', adminOnly, async (req, res, next) => {
  try {
    const { employee, date, inTime, outTime, lunchTime, remark, place } = req.body;
    const exists = await Employee.findById(employee);
    if (!exists) return res.status(400).json({ error: 'Invalid employee' });
    const doc = await Attendance.create({ employee, date, inTime, outTime, lunchTime, remark, place });
    res.status(201).json(doc);
  } catch (e) { next(e); }
});

// Read all (admin) with filters
router.get('/', async (req, res, next) => {
  try {
    const { date, employee } = req.query;
    const q = {};
    if (date) {
      const d = new Date(date);
      const next = new Date(d);
      next.setDate(d.getDate() + 1);
      q.date = { $gte: d, $lt: next };
    }
    if (employee) q.employee = employee;
    const list = await Attendance.find(q).populate('employee', 'name place').sort({ createdAt: -1 });
    res.json(list);
  } catch (e) { next(e); }
});

// Update (admin)
router.put('/:id', adminOnly, async (req, res, next) => {
  try {
    const doc = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (e) { next(e); }
});

// Delete (admin)
router.delete('/:id', adminOnly, async (req, res, next) => {
  try {
    const doc = await Attendance.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
