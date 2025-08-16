import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  place: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Employee', EmployeeSchema);
