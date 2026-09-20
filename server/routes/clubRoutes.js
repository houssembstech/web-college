import express from 'express';
import Club from '../models/Club.js';

const router = express.Router();

// Get all clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find().populate('membres', 'nom prenom email identifiant').lean();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des clubs.' });
  }
});

// Create new club
router.post('/', async (req, res) => {
  try {
    const { nom, type, icon, description, responsable } = req.body;
    if (!nom || !type) return res.status(400).json({ message: 'Le nom et le type sont requis.' });

    const newClub = new Club({ nom, type, icon: icon || '🏆', description, responsable, membres: [], evenements: [] });
    await newClub.save();
    res.status(201).json(newClub);
  } catch (error) {
    res.status(500).json({ message: 'Erreur création du club.' });
  }
});

// Update members of a club
router.put('/:id/members', async (req, res) => {
  try {
    const { membres } = req.body; // Array of student _id
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club non trouvé' });

    club.membres = Array.isArray(membres) ? membres : [];
    await club.save();
    
    const updated = await Club.findById(req.params.id).populate('membres', 'nom prenom email identifiant').lean();
    res.json(updated);
  } catch (error) {
    console.error('Erreur mise à jour membres:', error);
    res.status(500).json({ message: 'Erreur mise à jour des membres du club: ' + error.message });
  }
});

// Update a club
router.put('/:id', async (req, res) => {
  try {
    const { nom, type, icon, description, responsable } = req.body;
    const updated = await Club.findByIdAndUpdate(req.params.id, { nom, type, icon, description, responsable }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Erreur modification du club.' });
  }
});

// Delete a club
router.delete('/:id', async (req, res) => {
  try {
    await Club.findByIdAndDelete(req.params.id);
    res.json({ message: 'Club supprimé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur suppression.' });
  }
});

// Add an event / workshop to a club
router.post('/:id/events', async (req, res) => {
  try {
    const { titre, date, heure, lieu, description } = req.body;
    if (!titre || !date) return res.status(400).json({ message: 'Titre et date obligatoires.' });

    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club introuvable.' });

    club.evenements.push({ titre, date, heure, lieu, description });
    await club.save();
    res.status(201).json(club);
  } catch (error) {
    res.status(500).json({ message: 'Erreur ajout événement.' });
  }
});

// Delete an event from a club
router.delete('/:id/events/:eventId', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club introuvable.' });

    club.evenements = club.evenements.filter(ev => ev._id.toString() !== req.params.eventId);
    await club.save();
    res.json(club);
  } catch (error) {
    res.status(500).json({ message: 'Erreur suppression événement.' });
  }
});

export default router;
