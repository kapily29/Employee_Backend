import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  inTime: { type: String, required: true },   // 'HH:mm'
  outTime: { type: String, required: true },
  lunchTime: { type: String, default: '' },
  remark: { type: String, default: '' },
  place: { type: String, default: '' },
}, { timestamps: true });

AttendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', AttendanceSchema);
