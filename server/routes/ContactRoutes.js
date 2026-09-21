import express from 'express';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nomComplet, contactClient, message } = req.body;
    if (!nomComplet || !contactClient || !message) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }
    const newMessage = new ContactMessage({ nomComplet, contactClient, message });
    await newMessage.save();
    res.status(201).json({ message: "Message envoyé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: "Message supprimé." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

export default router;
