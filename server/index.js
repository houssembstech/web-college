import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 5000;

// Vérification de l'URI MongoDB
if (!process.env.MONGODB_URI) {
  console.error("❌ ERREUR: MONGODB_URI manquante dans le fichier .env");
  process.exit(1);
}

// Connexion MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ Connecté à MongoDB Atlas (Excellence School DB)'))
.catch(err => console.error('❌ Erreur de connexion MongoDB:', err));

import authRoutes from './routes/authRoutes.js';
import classRoutes from './routes/classRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import clubRoutes from './routes/clubRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import contactRoutes from './routes/ContactRoutes.js';

// Route de test
app.get('/api/status', (req, res) => {
  res.json({ status: 'API Backend Modèle Excellence School en ligne' });
});

app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/contact', contactRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend en ligne sur le port ${PORT}`);
});
