import express from 'express';
import User from '../models/User.js';
import ClassModel from '../models/Class.js';
import Suivi from '../models/Suivi.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const totalEleves = await User.countDocuments({ role: 'eleve' });
    const totalProfs = await User.countDocuments({ role: 'professeur' });
    const totalEquipe = await User.countDocuments({ role: { $in: ['admin', 'directeur', 'administratif'] } });
    const totalClasses = await ClassModel.countDocuments();
    
    const totalSuivis = await Suivi.countDocuments();
    const presences = await Suivi.countDocuments({ etat: 'Présent' });
    
    let tauxPresence = 0;
    if (totalSuivis > 0) {
      tauxPresence = Math.round((presences / totalSuivis) * 100);
    } else {
      tauxPresence = 100; // default if no records
    }

    res.json({
      totalEleves,
      totalProfs,
      totalEquipe,
      totalClasses,
      tauxPresence
    });
  } catch (error) {
    console.error('Erreur stats:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
