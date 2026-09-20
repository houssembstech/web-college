import mongoose from 'mongoose';

const suiviSchema = new mongoose.Schema({
  eleve: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eleveNom: String,
  professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  professeurNom: String,
  matiere: String,
  heure: String, // ex: "08:00 - 10:00"
  etat: String, // 'Présent', 'Absent', 'Retard', 'Exclu'
  dateStr: String, // ex: "17/10/2026"
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Suivi', suiviSchema);
