import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();

import authRoutes from './routes/auth.js';
import employeeRoutes from './routes/employees.js';
import attendanceRoutes from './routes/attendances.js';
import noticeRoutes from './routes/notices.js';
import publicRoutes from './routes/public.js';
import Admin from './models/Admin.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Missing MONGODB_URI in environment.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

app.post('/api/admin/create-first', async (req, res) => {
  try {
    const existing = await Admin.findOne();
    if (existing) return res.status(400).json({ msg: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const admin = new Admin({
      username: req.body.username,
      password: hashedPassword
    });

    await admin.save(); 
    res.json({ msg: "First admin created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/public', publicRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
