import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: false },
  email: { type: String, required: false },
  identifiant: { type: String, required: true, unique: true }, // CIN pour parents, ou code (ex: EXC-2026-X) pour élèves
  telephone: { type: String, required: false },
  motDePasse: { type: String, required: true }, // Sera hashé plus tard avec bcrypt
  role: { type: String, enum: ['eleve', 'parent', 'professeur', 'admin', 'directeur', 'administratif'], required: true },
  niveauEtude: { type: String, required: false }, // Exemple: "7ème année de base"
  photoProfil: { type: String, required: false },
  matieres: [{ type: String }], // Uniquement pour professeurs
  isOnline: { type: Boolean, default: false }, // Statut en ligne
  sessionToken: { type: String, default: '' }, // Jeton de session unique (1 seul appareil)
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Lie l'élève à son parent tuteur
  paymentInfo: {
    systeme: { type: String, enum: ['Mensuel', 'Trimestriel', 'Annuel', 'Non défini'], default: 'Non défini' },
    etat: { type: String, enum: ['Payé', 'En attente', 'Non Payé', 'Crédit'], default: 'Non Payé' },
    history: { type: mongoose.Schema.Types.Mixed, default: {} }
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
