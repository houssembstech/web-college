import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, './.env') });
import User from './server/models/User.js';

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    try {
      const count = await User.countDocuments();
      const eleveId = `EXC-2026-${String(count + 1).padStart(4, '0')}`;
      
      const newEleve = new User({
        nom: "Test",
        identifiant: eleveId,
        motDePasse: "123456",
        role: "eleve",
        niveauEtude: "7ème année",
        parentId: new mongoose.Types.ObjectId()
      });
      console.log("Saving eleve...");
      await newEleve.save();
      console.log("Saved!");
    } catch (err) {
      console.error("ERROR CAUGHT:");
      console.error(err);
    }
    process.exit(0);
  });
