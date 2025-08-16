import { Router } from 'express';
import Attendance from '../models/Attendance.js';
import Notice from '../models/Notice.js';

const router = Router();

// Public: Daily table (all employees' attendance for a specific date)
router.get('/attendances', async (req, res, next) => {
  try {
    const { date } = req.query;
    const d = date ? new Date(date) : new Date();
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    const list = await Attendance.find({ date: { $gte: start, $lt: end } })
      .populate('employee', 'name place')
      .sort({ 'employee.name': 1 });
    res.json(list);
  } catch (e) { next(e); }
});

// Public: Notices (pinned first)
router.get('/notices', async (req, res, next) => {
  try {
    const list = await Notice.find().sort({ pinned: -1, createdAt: -1 });
    res.json(list);
  } catch (e) { next(e); }
});

export default router;
