import express from 'express';
import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Modifier un enfant par son parent
router.put('/eleves/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { prenom, nom, email, niveauEtude, motDePasse } = req.body;

    const eleve = await User.findById(id);
    if (!eleve || eleve.role !== 'eleve') {
      return res.status(404).json({ message: "Dossier élève introuvable." });
    }

    if (prenom !== undefined) eleve.prenom = prenom;
    if (nom !== undefined) {
      const fullNom = prenom && nom ? `${prenom} ${nom}` : (nom || prenom || eleve.nom);
      eleve.nom = fullNom;
    }
    if (email !== undefined) eleve.email = email ? email.trim() : undefined;
    if (niveauEtude !== undefined) eleve.niveauEtude = niveauEtude;
    if (motDePasse && motDePasse.trim().length >= 6) {
      eleve.motDePasse = motDePasse.trim();
    }

    await eleve.save();

    res.json({ message: "Dossier enfant mis à jour avec succès.", eleve });
  } catch (error) {
    console.error("Erreur modification enfant:", error);
    res.status(500).json({ message: "Erreur lors de la modification du dossier enfant." });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { identifiant, motDePasse } = req.body;
    if (!identifiant || !motDePasse) {
      return res.status(400).json({ message: 'Veuillez remplir tous les champs.' });
    }
    const cleanId = identifiant.trim();
    // Case-insensitive regex for the identifier or email
    const user = await User.findOne({ 
      $or: [
        { email: { $regex: new RegExp(`^${cleanId}$`, 'i') } },
        { identifiant: { $regex: new RegExp(`^${cleanId}$`, 'i') } }
      ]
    });

    if (!user || user.motDePasse !== motDePasse.trim()) {
      return res.status(401).json({ message: 'Identifiant ou mot de passe incorrect.' });
    }

    const currentSession = Date.now().toString() + Math.random().toString(36).substring(2);
    user.isOnline = true;
    user.sessionToken = currentSession;
    await user.save();

    res.json({
      message: 'Connexion réussie',
      user: {
        _id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        identifiant: user.identifiant,
        role: user.role,
        photoProfil: user.photoProfil,
        niveauEtude: user.niveauEtude,
        sessionToken: currentSession
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-motDePasse');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isOnline = false;
      await user.save();
    }
    res.json({ message: 'Déconnexion réussie' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { prenom, nom, telephone, email, motDePasse } = req.body;

    // Validation basique
    if (!prenom || !nom || !telephone || !email || !motDePasse) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    if (motDePasse.length < 8) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères.' });
    }

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Un compte avec cet email existe déjà.' });
    }

    // Générer un identifiant pour le parent (ex: PR-2026-X)
    const count = await User.countDocuments();
    const identifiant = `PR-2026-${String(count + 1).padStart(4, '0')}`;

    // Création du compte Parent
    const newUser = new User({
      nom: `${prenom} ${nom}`,
      email,
      telephone,
      identifiant,
      motDePasse, // Non sécurisé pour le prototype, à hasher plus tard !
      role: 'parent'
    });

    await newUser.save();

    res.status(201).json({ 
      message: 'Compte parent créé avec succès.',
      user: {
        nom: newUser.nom,
        email: newUser.email,
        identifiant: newUser.identifiant,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ message: 'Erreur lors de la création du compte.', error: error.message });
  }
});

// Création de comptes par le Super Admin
router.post('/admin-create', async (req, res) => {
  try {
    const { roleSelection, prenom, nom, email, telephone, motDePasse, checkboxes, manuelMatiere, enfants } = req.body;

    if (!prenom || !nom || !email || !motDePasse) {
      return res.status(400).json({ message: 'Les champs Prénom, Nom, Email et Mot de passe sont requis.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Un compte avec cet email existe déjà.' });
    }

    const count = await User.countDocuments();
    
    // Déterminer le préfixe
    let prefix = 'USER';
    if (roleSelection === 'directeur') prefix = 'DIR';
    else if (roleSelection === 'administratif') prefix = 'ADM';
    else if (roleSelection === 'prof') prefix = 'PRF';
    else if (roleSelection === 'parent') prefix = 'PAR';

    const identifiant = `${prefix}-2026-${String(count + 1).padStart(4, '0')}`;

    let matieresArray = [];
    if (roleSelection === 'prof') {
      matieresArray = [...(checkboxes || [])];
      if (manuelMatiere) matieresArray.push(manuelMatiere.trim());
    }

    const finalRole = roleSelection === 'prof' ? 'professeur' : roleSelection;

    const newUser = new User({
      nom: `${prenom} ${nom}`,
      email,
      telephone: telephone || undefined,
      identifiant,
      motDePasse,
      role: finalRole,
      matieres: roleSelection === 'prof' ? matieresArray : undefined
    });

    await newUser.save();

    let enfantsCreated = [];
    // Si c'est un parent et qu'il y a des enfants
    if (roleSelection === 'parent' && enfants && enfants.length > 0) {
      for (const [index, enfant] of enfants.entries()) {
        if (enfant.nom && enfant.niveau) {
          const eleveId = `EXC-2026-${String(count + 2 + index).padStart(4, '0')}`;
          const newEleve = new User({
            nom: enfant.nom,
            identifiant: eleveId,
            motDePasse: Math.random().toString(36).slice(-8), // Mot de passe aléatoire (8 chars)
            role: 'eleve',
            niveauEtude: enfant.niveau,
            parentId: newUser._id
          });
          await newEleve.save();
          enfantsCreated.push(newEleve);
        }
      }
    }

    res.status(201).json({ 
      message: 'Compte créé avec succès', 
      user: newUser,
      enfants: enfantsCreated
    });

  } catch (error) {
    console.error('Erreur admin-create:', error);
    res.status(500).json({ message: 'Erreur lors de la création du compte.', error: error.message });
  }
});

// Fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'eleve' } }).lean(); // Fetch all except eleves directly (we attach them to parents)
    const eleves = await User.find({ role: 'eleve' }).lean();

    // Attach eleves to their parents
    const usersWithChildren = users.map(user => {
      if (user.role === 'parent') {
        const enfants = eleves.filter(e => String(e.parentId) === String(user._id));
        return { ...user, enfants };
      }
      return user;
    });

    res.json(usersWithChildren);
  } catch (error) {
    console.error('Erreur fetch users:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
});

// Fetch all eleves
router.get('/eleves', async (req, res) => {
  try {
    const eleves = await User.find({ role: 'eleve' }).lean();
    res.json(eleves);
  } catch (error) {
    console.error('Erreur fetch eleves:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des élèves.' });
  }
});

// Supprimer un utilisateur
router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    // Trouver et supprimer
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });

    // S'il s'agit d'un parent, supprimer également ses enfants
    if (user.role === 'parent') {
      await User.deleteMany({ parentId: userId });
    }

    res.json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression.' });
  }
});



// Modifier un enfant par son parent
router.put('/update-enfant/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { prenom, nom, email, niveauEtude, motDePasse } = req.body;

    const eleve = await User.findById(id);
    if (!eleve || eleve.role !== 'eleve') {
      return res.status(404).json({ message: "Dossier élève introuvable." });
    }

    if (prenom !== undefined) eleve.prenom = prenom;
    if (nom !== undefined) {
      const fullNom = prenom && nom ? `${prenom} ${nom}` : (nom || prenom || eleve.nom);
      eleve.nom = fullNom;
    }
    if (email !== undefined) eleve.email = email ? email.trim() : undefined;
    if (niveauEtude !== undefined) eleve.niveauEtude = niveauEtude;
    if (motDePasse && motDePasse.trim().length >= 6) {
      eleve.motDePasse = motDePasse.trim();
    }

    await eleve.save();

    res.json({ message: "Dossier enfant mis à jour avec succès.", eleve });
  } catch (error) {
    console.error("Erreur modification enfant:", error);
    res.status(500).json({ message: "Erreur lors de la modification du dossier enfant." });
  }
});

// Modifier un utilisateur
router.put('/users/:id', async (req, res) => {
  try {
    const { prenom, nom, email, telephone, matieres, niveauEtude, motDePasse } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });

    if (prenom !== undefined) user.prenom = prenom.trim();
    if (nom !== undefined) user.nom = nom.trim();
    if (email !== undefined) user.email = email ? email.trim() : undefined;
    if (telephone !== undefined) user.telephone = telephone;
    if (matieres !== undefined) user.matieres = matieres;
    if (niveauEtude !== undefined) user.niveauEtude = niveauEtude;
    if (motDePasse && motDePasse.trim().length >= 6) user.motDePasse = motDePasse.trim();

    await user.save();

    res.json({ message: 'Utilisateur modifié avec succès.', eleve: user, user });
  } catch (error) {
    console.error("Erreur modification utilisateur:", error);
    res.status(500).json({ message: 'Erreur lors de la modification.' });
  }
});

// Rattacher un élève existant à un parent
router.post('/users/:parentId/link-enfant', async (req, res) => {
  try {
    const { parentId } = req.params;
    const { identifiantEleve } = req.body;

    const eleve = await User.findOne({ identifiant: identifiantEleve, role: 'eleve' });
    if (!eleve) return res.status(404).json({ message: "Code élève introuvable." });
    if (eleve.parentId) return res.status(400).json({ message: "Cet élève est déjà rattaché à un parent." });

    eleve.parentId = parentId;
    await eleve.save();

    res.json({ message: "Enfant rattaché avec succès.", eleve });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du rattachement." });
  }
});

// Récupérer les enfants d'un parent
router.get('/users/:parentId/enfants', async (req, res) => {
  try {
    const enfants = await User.find({ parentId: req.params.parentId, role: 'eleve' });
    res.json(enfants);
  } catch (error) {
    res.status(500).json({ message: "Erreur de récupération." });
  }
});

// Créer un nouvel élève depuis le tableau de bord parent
router.post('/users/:parentId/create-enfant', async (req, res) => {
  try {
    const { parentId } = req.params;
    const { prenom, nom, email, niveauEtude, motDePasse } = req.body;

    // Nom complet combiné ou champ nom simple
    const fullNom = prenom && nom ? `${prenom} ${nom}` : (nom || prenom);

    if (!fullNom || !niveauEtude || !motDePasse) {
      return res.status(400).json({ message: "Le prénom, le nom, le niveau et le mot de passe sont requis." });
    }

    if (motDePasse.length < 6) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caractères." });
    }

    // Vérifier si l'email existe déjà si fourni
    if (email) {
      const emailExists = await User.findOne({ email: email.trim().toLowerCase() });
      if (emailExists) {
        return res.status(400).json({ message: "Un compte avec cet email existe déjà." });
      }
    }

    // Générer un identifiant pour l'élève
    const count = await User.countDocuments();
    const eleveId = `EXC-2026-${String(count + 1).padStart(4, '0')}`;

    const newEleve = new User({
      nom: nom ? nom.trim() : (fullNom || ''),
      prenom: prenom ? prenom.trim() : undefined,
      email: email ? email.trim() : undefined,
      identifiant: eleveId,
      motDePasse,
      role: 'eleve',
      niveauEtude,
      parentId
    });

    res.status(201).json({ message: "Compte enfant créé avec succès.", eleve: newEleve });
  } catch (error) {
    console.error("Erreur création enfant:", error);
    res.status(500).json({ message: "Erreur lors de la création du compte." });
  }
});


// Update user profile
router.put('/update-profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, motDePasse, photoProfil } = req.body;
    const updateData = {};
    
    if (email) updateData.email = email;
    if (motDePasse) {
      updateData.motDePasse = motDePasse;
    }
    
    // Upload photo to Cloudinary if Base64 image provided
    if (photoProfil) {
      if (photoProfil.startsWith('data:image')) {
        try {
          const uploadRes = await cloudinary.uploader.upload(photoProfil, {
            folder: 'lycee_profiles',
            transformation: [{ width: 300, height: 300, crop: 'fill' }]
          });
          updateData.photoProfil = uploadRes.secure_url;
        } catch (cErr) {
          console.error("Cloudinary upload failed, falling back to raw data:", cErr);
          updateData.photoProfil = photoProfil;
        }
      } else {
        updateData.photoProfil = photoProfil;
      }
    }
    
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    
    res.json(updatedUser);
  } catch (err) {
    console.error("Erreur update-profile:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mettre à jour l'état de paiement d'un élève
router.put('/:id/payment', async (req, res) => {
  try {
    const { systeme, etat, history } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }
    
    if (!user.paymentInfo) {
      user.paymentInfo = {};
    }
    if (systeme) user.paymentInfo.systeme = systeme;
    if (etat) user.paymentInfo.etat = etat;
    if (history) user.paymentInfo.history = history;
    
    user.markModified('paymentInfo.history');
    
    await user.save();
    res.status(200).json({ message: 'Paiement mis à jour', user });
  } catch (error) {
    console.error('Erreur mise à jour paiement:', error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

export default router;