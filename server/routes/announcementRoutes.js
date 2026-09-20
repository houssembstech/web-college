import express from 'express';
import Announcement from '../models/Announcement.js';
import User from '../models/User.js';
import ClassModel from '../models/Class.js';

const router = express.Router();

// Récupérer les annonces destinées à un utilisateur spécifique
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    let query = {};

    if (user.role === 'direction' || user.role === 'admin') {
      query = {};
    } else if (user.role === 'parent') {
      const enfants = await User.find({ parentId: user._id, role: 'eleve' });
      const classeIds = [];
      for (const enfant of enfants) {
        const classeEleve = await ClassModel.findOne({ 'eleves': enfant._id });
        if (classeEleve) classeIds.push(classeEleve._id.toString());
      }

      query = {
        $or: [
          { cibleTypes: 'tous_parents' },
          { cibleType: 'tous_parents' },
          { cibleTypes: 'parents_classe', cibleClasseIds: { $in: classeIds } },
          { cibleType: 'parents_classe', cibleClasseId: { $in: classeIds } }
        ]
      };
    } else if (user.role === 'eleve') {
      const classeEleve = await ClassModel.findOne({ 'eleves': user._id });
      const classeId = classeEleve ? classeEleve._id.toString() : null;

      query = {
        $or: [
          { cibleTypes: 'tous_eleves' },
          { cibleType: 'tous_eleves' },
          ...(classeId ? [
            { cibleTypes: 'eleves_classe', cibleClasseIds: classeId },
            { cibleType: 'eleves_classe', cibleClasseId: classeId }
          ] : [])
        ]
      };
    } else if (user.role === 'professeur') {
      query = {
        $or: [
          { cibleTypes: 'tous_profs' },
          { cibleType: 'tous_profs' }
        ]
      };
    }

    const announcements = await Announcement.find(query)
      .populate('cibleClasseIds', 'nom')
      .sort({ createdAt: -1 });

    res.json(announcements);
  } catch (error) {
    console.error('Erreur récupération annonces:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Récupérer TOUTES les annonces pour l'admin/direction
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('cibleClasseIds', 'nom')
      .sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des annonces.' });
  }
});

// Créer une annonce (Direction / Admin)
router.post('/', async (req, res) => {
  try {
    const { titre, detail, categorie, priorite, cibleTypes, cibleClasseIds, createurId } = req.body;

    const types = Array.isArray(cibleTypes) ? cibleTypes : (req.body.cibleType ? [req.body.cibleType] : []);
    const classes = Array.isArray(cibleClasseIds) ? cibleClasseIds : (req.body.cibleClasseId ? [req.body.cibleClasseId] : []);

    if (!titre || !detail || types.length === 0) {
      return res.status(400).json({ message: 'Titre, détail et au moins un destinataire sont requis.' });
    }

    if ((types.includes('eleves_classe') || types.includes('parents_classe')) && classes.length === 0) {
      return res.status(400).json({ message: 'Veuillez sélectionner au moins une classe.' });
    }

    const isValidObjectId = (id) => id && typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/);
    const validCreateurId = isValidObjectId(createurId) ? createurId : null;
    const validClassIds = classes.filter(isValidObjectId);

    const newAnnouncement = new Announcement({
      titre,
      detail,
      categorie: categorie || 'Général',
      priorite: priorite || 'normale',
      cibleTypes: types,
      cibleClasseIds: validClassIds,
      createur: validCreateurId
    });

    await newAnnouncement.save();
    
    const populated = await Announcement.findById(newAnnouncement._id)
      .populate('cibleClasseIds', 'nom');
    res.status(201).json(populated);
  } catch (error) {
    console.error('Erreur création annonce:', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'annonce.' });
  }
});

// Supprimer une annonce
router.delete('/:id', async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Annonce supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression.' });
  }
});

export default router;
