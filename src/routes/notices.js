import { Router } from 'express';
import Notice from '../models/Notice.js';
import { adminOnly } from '../middleware/auth.js';

const router = Router();

// Create (admin)
router.post('/', adminOnly, async (req, res, next) => {
  try {
    const doc = await Notice.create(req.body);
    res.status(201).json(doc);
  } catch (e) { next(e); }
});

// Read all (admin)
router.get('/', async (req, res, next) => {
  try {
    const list = await Notice.find().sort({ pinned: -1, createdAt: -1 });
    res.json(list);
  } catch (e) { next(e); }
});

// Update (admin)
router.put('/:id', adminOnly, async (req, res, next) => {
  try {
    const doc = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (e) { next(e); }
});

// Delete (admin)
router.delete('/:id', adminOnly, async (req, res, next) => {
  try {
    const doc = await Notice.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Pin / Unpin (admin)
router.patch('/:id/pin', adminOnly, async (req, res, next) => {
  try {
    const doc = await Notice.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });

    doc.pinned = !doc.pinned;   // toggle
    await doc.save();

    res.json(doc);
  } catch (e) { next(e); }
});

export default router;
