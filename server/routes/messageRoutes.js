import express from 'express';
import Message from '../models/Message.js';
import User from '../models/User.js';

const router = express.Router();

// Récupérer la liste des utilisateurs autorisés à communiquer
router.get('/utilisateurs', async (req, res) => {
  try {
    const list = await User.find({ role: { $ne: 'eleve' } }, 'nom _id role identifiant photoProfil isOnline updatedAt');
    res.json(list);
  } catch(err) {
    res.status(500).json({ message: "Erreur" });
  }
});

// Récupérer la conversation entre l'utilisateur connecté et un autre utilisateur
router.get('/:userId/conversation/:otherUserId', async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;
    const messages = await Message.find({
      $or: [
        { expediteur: userId, destinataire: otherUserId },
        { expediteur: otherUserId, destinataire: userId }
      ]
    }).sort({ createdAt: 1 });
    
    res.json(messages);
  } catch(err) {
    res.status(500).json({ message: "Erreur récupération messages" });
  }
});

// Envoyer un nouveau message
router.post('/', async (req, res) => {
  try {
    const { expediteur, destinataire, contenu } = req.body;
    const newMessage = new Message({ expediteur, destinataire, contenu });
    await newMessage.save();
    return res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Erreur envoi message" });
  }
});

// Marquer une conversation comme lue
router.put('/:userId/conversation/:otherUserId/lire', async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;
    // Les messages dont le destinataire est userId et l'expediteur otherUserId
    await Message.updateMany(
      { expediteur: otherUserId, destinataire: userId, lu: false },
      { $set: { lu: true } }
    );
    res.json({ message: "Messages marqués comme lus." });
  } catch(err) {
    res.status(500).json({ message: "Erreur" });
  }
});

export default router;
