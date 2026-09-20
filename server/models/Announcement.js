import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  detail: { type: String, required: true },
  categorie: { type: String, default: 'Général' },
  priorite: { type: String, enum: ['normale', 'moyenne', 'haute'], default: 'normale' },
  cibleTypes: [{ 
    type: String, 
    enum: ['tous_parents', 'tous_eleves', 'tous_profs', 'eleves_classe', 'parents_classe']
  }],
  cibleClasseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  createur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Announcement', announcementSchema);
