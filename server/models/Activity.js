import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  titre: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  lieu: { type: String, required: true },
  image: { type: String },
  photos: [{ type: String }],
  borderColor: { type: String }
}, { timestamps: true });

export default mongoose.model('Activity', activitySchema);
