import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  nom: { type: String, required: true }, // ex: "7ème A"
  niveau: { type: String, required: true }, // ex: "7ème année de base"
  anneeScolaire: { type: String, default: "2026/2027" },
  eleves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Liste des élèves
  emploiDuTemps: [{
    jour: String,
    heureDebut: String,
    heureFin: String,
    matiere: String,
    professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    salle: String
  }]
}, { timestamps: true });

export default mongoose.model('Class', classSchema);
