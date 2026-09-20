import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  type: { type: String, required: true }, // ex: "Workshop Tech", "Club Sportif", "Atelier Culture"
  icon: { type: String, default: '🏆' },
  description: { type: String, default: '' },
  responsable: { type: String, default: '' },
  membres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  evenements: [{
    titre: { type: String, required: true },
    date: { type: String, required: true },
    heure: { type: String, default: '' },
    lieu: { type: String, default: '' },
    description: { type: String, default: '' }
  }]
}, { timestamps: true });

export default mongoose.model('Club', clubSchema);
