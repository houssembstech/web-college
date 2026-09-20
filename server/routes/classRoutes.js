import express from 'express';
import Class from '../models/Class.js';
import User from '../models/User.js';
import Suivi from '../models/Suivi.js';

const router = express.Router();

// Récupérer toutes les classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().populate('eleves').populate('emploiDuTemps.professeur').lean();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des classes.' });
  }
});

// Créer une nouvelle classe
router.post('/', async (req, res) => {
  try {
    const { nom, niveau, anneeScolaire } = req.body;
    if (!nom || !niveau) return res.status(400).json({ message: 'Nom et niveau sont requis.' });

    const newClass = new Class({ nom, niveau, anneeScolaire, eleves: [] });
    await newClass.save();
    
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Erreur création classe.' });
  }
});

// Ajouter un élève à une classe
router.post('/:id/eleves', async (req, res) => {
  try {
    const classId = req.params.id;
    const { eleveId } = req.body; // C'est le _id de MongoDB du User
    
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $addToSet: { eleves: eleveId } },
      { new: true }
    ).populate('eleves').populate('emploiDuTemps.professeur');

    if (!updatedClass) return res.status(404).json({ message: 'Classe introuvable.' });
    
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: 'Erreur ajout élève.' });
  }
});

// Supprimer un élève d'une classe
router.delete('/:id/eleves/:eleveId', async (req, res) => {
  try {
    const { id, eleveId } = req.params;
    
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { $pull: { eleves: eleveId } },
      { new: true }
    ).populate('eleves').populate('emploiDuTemps.professeur');

    if (!updatedClass) return res.status(404).json({ message: 'Classe introuvable.' });
    
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: 'Erreur suppression élève.' });
  }
});

// Mettre à jour l'emploi du temps complet
router.put('/:id/emploiDuTemps', async (req, res) => {
  try {
    const { emploiDuTemps } = req.body;
    const currentClassId = req.params.id;
    
    // VALIDATION DES CONFLITS POUR LES PROFESSEURS
    const allOtherClasses = await Class.find({ _id: { $ne: currentClassId } });
    
    for (let newSeance of emploiDuTemps) {
      if (!newSeance.professeur) continue;
      
      let pId = newSeance.professeur;
      let nStart = newSeance.heureDebut;
      let nEnd = newSeance.heureFin;
      let nJour = newSeance.jour;
      
      for (let c of allOtherClasses) {
        for (let s of c.emploiDuTemps) {
           if (s.professeur && String(s.professeur) === String(pId) && s.jour === nJour) {
              if (nStart < s.heureFin && s.heureDebut < nEnd) {
                 // CONFLICT FOUND!
                 return res.status(400).json({ message: `Le professeur sélectionné est déjà affecté à la classe ${c.nom} le ${nJour} de ${s.heureDebut} à ${s.heureFin}. Affectation impossible.` });
              }
           }
        }
      }
    }

    const updatedClass = await Class.findByIdAndUpdate(
      currentClassId,
      { emploiDuTemps },
      { new: true }
    ).populate('eleves').populate('emploiDuTemps.professeur');

    if (!updatedClass) return res.status(404).json({ message: 'Classe introuvable.' });
    
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: 'Erreur mise à jour emploi du temps.' });
  }
});

// Modifier les informations de base d'une classe
router.put('/:id', async (req, res) => {
  try {
    const { nom, niveau, anneeScolaire } = req.body;
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      { nom, niveau, anneeScolaire },
      { new: true }
    );
    if (!updatedClass) return res.status(404).json({ message: 'Classe introuvable.' });
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: 'Erreur mise à jour classe.' });
  }
});

// Supprimer une classe
router.delete('/:id', async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) return res.status(404).json({ message: 'Classe introuvable.' });
    res.json({ message: 'Classe supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur suppression classe.' });
  }
});

// Récupérer le planning d'un élève (en trouvant sa classe)
router.get('/eleve/:eleveId/planning', async (req, res) => {
  try {
    const eleveId = req.params.eleveId;
    const c = await Class.findOne({ eleves: eleveId }).populate('emploiDuTemps.professeur').lean();
    if (!c) return res.status(404).json({ message: "Cet élève n'est inscrit dans aucune classe pour le moment." });

    res.json({ className: c.nom, emploiDuTemps: c.emploiDuTemps });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du planning." });
  }
});

// Enregistrer l'appel (tableau de présences)
router.post('/suivi', async (req, res) => {
  try {
    // on supprime d'abord les appels qui pourraient déjà exister pour cette date/heure/prof 
    // pour éviter les doublons si le prof soumet deux fois.
    if (req.body.length > 0) {
       const template = req.body[0];
       await Suivi.deleteMany({
          dateStr: template.dateStr,
          heure: template.heure,
          matiere: template.matiere,
          professeur: template.professeur
       });
    }
    
    await Suivi.insertMany(req.body);
    res.json({ message: 'L\'appel a été enregistré avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'appel.' });
  }
});

// Fetch session absences
router.get('/suivi/search', async (req, res) => {
  try {
    const { dateStr, heure, professeur, matiere } = req.query;
    const list = await Suivi.find({ dateStr, heure, professeur, matiere });
    res.json(list);
  } catch(error) {
    res.status(500).json({ message: 'Erreur' });
  }
});

// Récupérer le dossier de suivi d'un élève
router.get('/suivi/eleve/:id', async (req, res) => {
  try {
    const list = await Suivi.find({ eleve: req.params.id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du suivi.' });
  }
});

export default router;
