import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  pinned: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Notice', NoticeSchema);
