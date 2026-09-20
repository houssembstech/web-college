import express from 'express';
import Activity from '../models/Activity.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const act = await Activity.find().sort({ createdAt: -1 });
    res.json(act);
  } catch (err) { res.status(500).json({message: err.message}); }
});

router.post('/', async (req, res) => {
  try {
    const newAct = new Activity(req.body);
    const saved = await newAct.save();
    res.status(201).json(saved);
  } catch (err) { res.status(400).json({message: err.message}); }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updated);
  } catch(err) { res.status(400).json({message: err.message}) }
});

router.delete('/:id', async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({message: 'Activité supprimée'});
  } catch(err) { res.status(400).json({message: err.message})}
});

export default router;
