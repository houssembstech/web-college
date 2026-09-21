import mongoose from 'mongoose';

const ContactMessageSchema = new mongoose.Schema({
  nomComplet: { type: String, required: true },
  contactClient: { type: String, required: true }, 
  message: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('ContactMessage', ContactMessageSchema);
