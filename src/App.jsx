import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter, Routes, Route, Outlet, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { BulletinModal } from './BulletinModal';
import DashboardPaiements from './DashboardPaiements';
import { Home, Info, User, Activity, Phone, LogIn, UserPlus, Grid, Users, BookOpen, Clock, Settings, FileText, MessageSquare, Heart, Bus, Star, Award, ShieldCheck, HeartHandshake, Edit, Trash2, X, Calendar, UserX, Lock, ChevronDown, ChevronRight, CheckCircle, Menu, CreditCard, Eye, EyeOff } from 'lucide-react';

export const OFFICIAL_SUBJECTS = [
  "Arabe expression écrite", "Arabe étude de texte", "Arabe.Oral", "ARABE", 
  "Français", "Français.Oral", "ANGLAIS", "HISTOIRE", "GEOGRAPHIE", "SVT", 
  "MATHEMATIQUES", "INFORMATIQUE", "MUSIQUE", "DESSIN", "EDUCATION PHYSIQUE", 
  "TECHNOLOGIE", "EDUCATION CIVIQUE", "EDUCATION ISLAMIQUE"
];

function PublicLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';
  const userText = localStorage.getItem('lycee_user');
  const user = userText ? JSON.parse(userText) : null;

  return (
    <>
      <nav className="navbar py-4">
        <div className="container public-nav-container">
          <div className="logo-and-burger" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="flex items-center gap-4">
              <img src="/images/logo%20excellence.png" alt="Excellence School Logo" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
              <span className="font-bold text-2xl uppercase" style={{ color: 'var(--primary)' }}>Excellence</span>
            </div>
            {/* Bouton Hamburger Mobile */}
            <button className="mobile-only-btn text-primary" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              {mobileNavOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          <div className={`public-menu-content ${mobileNavOpen ? 'open' : ''}`}>
            <div className="nav-links">
              <Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setMobileNavOpen(false)}><div className="flex items-center gap-2"><Home size={18} />Accueil</div></Link>
              <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={() => setMobileNavOpen(false)}><div className="flex items-center gap-2"><Info size={18} />À propos</div></Link>
              <Link to="/activities" className={`nav-link ${isActive('/activities')}`} onClick={() => setMobileNavOpen(false)}><div className="flex items-center gap-2"><Activity size={18} />Activités</div></Link>
              <Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={() => setMobileNavOpen(false)}><div className="flex items-center gap-2"><Phone size={18} />Contact</div></Link>
            </div>
            
            <div className="auth-buttons" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {user ? (
                <Link to="/dashboard" className="btn btn-primary flex items-center justify-center gap-2" onClick={() => setMobileNavOpen(false)}>
                  <Grid size={18} /> Mon Espace Portail
                </Link>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline" onClick={() => setMobileNavOpen(false)}><LogIn size={18} className="mr-2" />Connexion</Link>
                  <Link to="/signup" className="btn btn-primary" onClick={() => setMobileNavOpen(false)}><UserPlus size={18} className="mr-2" />S'inscrire</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer className="py-8 bg-white border-t mt-20" style={{ borderColor: 'var(--border-color)' }}>
        <div className="container text-center text-muted">
          &copy; {new Date().getFullYear()} Collège privé Excellence School. Tous droits réservés.
        </div>
      </footer>
    </>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero py-20">
        <div className="container text-center hero-content">
          <h1 className="text-5xl mb-4 font-bold" style={{ color: 'var(--primary)' }}>Plus qu'un collège, un avenir.</h1>
          <p className="text-2xl text-muted mb-8 max-w-2xl mx-auto">
            Bienvenue au Collège Privé Excellence School Monastir. Nous formons les leaders de demain de la 7ème à la 9ème année en alliant exigence, épanouissement et réussite.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/about" className="btn btn-primary">Découvrir notre école</Link>
            <Link to="/login" className="btn btn-outline">Espace Portail</Link>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <h2 className="text-4xl text-center mb-12">Nos points forts</h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="flex justify-center mb-6">
              <div style={{ backgroundColor: '#fdfaf5', padding: '1rem', borderRadius: '50%', border: '2px solid var(--secondary)', color: 'var(--primary)', display: 'inline-flex' }}>
                <Users size={32} />
              </div>
            </div>
            <h3 className="text-2xl mb-2">Corps professoral</h3>
            <p className="text-muted">Des enseignants qualifiés et passionnés par la réussite de leurs élèves.</p>
          </div>
          <div className="card text-center">
            <div className="flex justify-center mb-6">
              <div style={{ backgroundColor: '#fdfaf5', padding: '1rem', borderRadius: '50%', border: '2px solid var(--secondary)', color: 'var(--primary)', display: 'inline-flex' }}>
                <BookOpen size={32} />
              </div>
            </div>
            <h3 className="text-2xl mb-2">Pédagogie innovante</h3>
            <p className="text-muted">Des méthodes d'enseignement modernes favorisant l'apprentissage actif.</p>
          </div>
          <div className="card text-center">
            <div className="flex justify-center mb-6">
              <div style={{ backgroundColor: '#fdfaf5', padding: '1rem', borderRadius: '50%', border: '2px solid var(--secondary)', color: 'var(--primary)', display: 'inline-flex' }}>
                <Activity size={32} />
              </div>
            </div>
            <h3 className="text-2xl mb-2">Vie scolaire riche</h3>
            <p className="text-muted">Des clubs, événements et activités pour un développement complet.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ identifiant: '', motDePasse: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('lycee_user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch(err) { setError("Erreur réseau"); }
  };

  return (
    <div className="container py-20 flex justify-center">
      <div className="card w-full" style={{ maxWidth: '400px' }}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Connexion</h2>
          <p className="text-muted">Accédez à votre espace sécurisé</p>
        </div>
        {error && <div className="p-3 mb-4 text-white bg-red-500 rounded text-sm">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Identifiant</label>
            <input type="text" className="input-field" placeholder="Email ou code" required value={creds.identifiant} onChange={e => setCreds({...creds, identifiant: e.target.value})} />
          </div>
          <div className="input-group mb-6">
            <label className="input-label">Mot de passe</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                className="input-field" 
                style={{ paddingRight: '40px' }} 
                placeholder="••••••••" 
                required 
                value={creds.motDePasse} 
                onChange={e => setCreds({...creds, motDePasse: e.target.value})} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full text-center block mb-4">Se connecter</button>
          <div className="text-center text-sm text-muted">
            Pas encore de compte ? <Link to="/signup" className="text-primary font-bold">S'inscrire</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function SignUpPage() {
  const [formData, setFormData] = useState({ prenom: '', nom: '', email: '', telephone: '', motDePasse: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.motDePasse.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Une erreur est survenue.');
      } else {
        setSuccess('Compte Parent créé avec succès ! Votre identifiant est : ' + data.user.identifiant);
        setFormData({ prenom: '', nom: '', email: '', telephone: '', motDePasse: '' });
      }
    } catch (err) {
      setError('Erreur de connexion au serveur. Assurez-vous que le backend est lancé.');
    }
  };

  return (
    <div className="container py-20 flex justify-center">
      <div className="card w-full" style={{ maxWidth: '500px' }}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Inscription</h2>
          <p className="text-muted">Créez votre compte Parent pour accéder au portail</p>
        </div>

        {error && <div className="p-3 mb-4 text-white bg-red-500 rounded" style={{ backgroundColor: '#ef4444' }}>{error}</div>}
        {success && <div className="p-3 mb-4 text-white rounded" style={{ backgroundColor: '#10b981' }}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">Prénom</label>
              <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required className="input-field" placeholder="Votre prénom" />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">Nom</label>
              <input type="text" name="nom" value={formData.nom} onChange={handleChange} required className="input-field" placeholder="Votre nom" />
            </div>
          </div>

          <div className="text-sm text-primary mb-4 p-3" style={{ backgroundColor: '#fdfbf7', borderRadius: '8px', border: '1px solid #ecdcb9' }}>
            ℹ️ Note : En tant que <strong>Parent</strong>, vous pourrez ajouter vos enfants à votre compte depuis votre tableau de bord.
          </div>

          <div className="input-group mb-4">
            <label className="input-label">Téléphone (WhatsApp recommandé)</label>
            <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} required className="input-field" placeholder="Ex: 98 123 456" />
          </div>

          <div className="input-group mb-4">
            <label className="input-label">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-field" placeholder="adresse@email.com" />
          </div>

          <div className="input-group mb-6">
            <label className="input-label">Mot de passe (min 8 caractères)</label>
            <input type="password" name="motDePasse" value={formData.motDePasse} onChange={handleChange} required minLength="8" className="input-field" placeholder="••••••••" />
          </div>

          <button type="submit" className="btn btn-primary w-full text-center block mb-4">Créer mon compte Parent</button>

          <div className="text-center text-sm text-muted">
            Déjà un compte ? <Link to="/login" className="text-primary font-bold">Se connecter</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--text-main)', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* Hero Banner avec Logo et typographie dorée */}
      <section style={{ 
        position: 'relative', 
        padding: '80px 20px 60px 20px', 
        background: 'linear-gradient(180deg, #ffffff 0%, var(--background) 100%)',
        textAlign: 'center',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <img src="/images/logo%20excellence.png" alt="Excellence School Logo" style={{ height: '90px', width: 'auto', objectFit: 'contain', margin: '0 auto' }} />
          </div>
          
          <h1 style={{ 
            fontSize: '46px', 
            fontWeight: '900', 
            letterSpacing: '-0.5px', 
            marginBottom: '20px', 
            color: 'var(--primary)'
          }}>
            À Propos du Collège Excellence School
          </h1>

          <p style={{ fontSize: '20px', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '750px', margin: '0 auto 28px auto', fontWeight: '500' }}>
            Un concours ne détermine pas un avenir. Chaque enfant possède un talent unique, son propre rythme et un potentiel d'excellence extraordinaire.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span style={{ backgroundColor: '#ffffff', color: 'var(--primary)', border: '1px solid var(--secondary)', padding: '8px 18px', borderRadius: '30px', fontSize: '13px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>✨ Pédagogie Innvovante</span>
            <span style={{ backgroundColor: '#ffffff', color: 'var(--primary)', border: '1px solid var(--secondary)', padding: '8px 18px', borderRadius: '30px', fontSize: '13px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>🛡️ Bienveillance & Rigueur</span>
            <span style={{ backgroundColor: '#ffffff', color: 'var(--primary)', border: '1px solid var(--secondary)', padding: '8px 18px', borderRadius: '30px', fontSize: '13px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>🎓 Épanouissement Global</span>
          </div>
        </div>
      </section>

      {/* Mission & Vision avec Cards Harmonieuses */}
      <section style={{ padding: '70px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', alignItems: 'center' }}>
          
          <div style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '20px', 
            padding: '40px', 
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 25px -5px rgba(6, 29, 56, 0.08)'
          }}>
            <h2 style={{ fontSize: '30px', fontWeight: '800', color: 'var(--primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <BookOpen style={{ color: 'var(--secondary)' }} size={36} /> Notre Vision & Mission
            </h2>
            <p style={{ color: 'var(--text-main)', fontSize: '16px', lineHeight: '1.7', marginBottom: '16px' }}>
              Au <strong>Collège Privé Excellence School Monastir</strong>, nous croyons que l'éducation doit conjuguer <strong>rigueur intellectuelle</strong> et <strong>développement humain</strong>.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
              Nous offrons un environnement stimulant avec des outils pédagogiques de pointe pour préparer nos étudiants aux défis de demain.
            </p>

            <div style={{ 
              backgroundColor: '#fdfaf5', 
              borderLeft: '4px solid var(--secondary)', 
              padding: '16px 20px', 
              borderRadius: '12px',
              border: '1px solid #f1f5f9',
              borderLeftWidth: '4px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary)', fontWeight: 'bold', fontSize: '15px' }}>
                <Star size={22} style={{ color: 'var(--secondary)' }} />
                <span>Des fondations solides pour un avenir brillant.</span>
              </div>
            </div>
          </div>

          {/* Cartes Valeurs */}
          <div style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '20px', 
            padding: '40px', 
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 25px -5px rgba(6, 29, 56, 0.08)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', marginBottom: '24px', textAlign: 'center', letterSpacing: '1px' }}>
              NOS VALEURS FONDAMENTALES
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ backgroundColor: '#fdfaf5', border: '1px solid #f1f5f9', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <Award style={{ color: 'var(--secondary)', margin: '0 auto 10px auto' }} size={32} />
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--primary)' }}>EXCELLENCE</div>
              </div>
              <div style={{ backgroundColor: '#fdfaf5', border: '1px solid #f1f5f9', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <HeartHandshake style={{ color: 'var(--secondary)', margin: '0 auto 10px auto' }} size={32} />
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--primary)' }}>RESPECT</div>
              </div>
              <div style={{ backgroundColor: '#fdfaf5', border: '1px solid #f1f5f9', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <BookOpen style={{ color: 'var(--secondary)', margin: '0 auto 10px auto' }} size={32} />
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--primary)' }}>DISCIPLINE</div>
              </div>
              <div style={{ backgroundColor: '#fdfaf5', border: '1px solid #f1f5f9', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <ShieldCheck style={{ color: 'var(--secondary)', margin: '0 auto 10px auto' }} size={32} />
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--primary)' }}>RESPONSABILITÉ</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Grille : Pourquoi Choisir notre Collège */}
      <section style={{ padding: '70px 20px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '900', color: 'var(--primary)', letterSpacing: '-0.5px' }}>POURQUOI NOUS CHOISIR ?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginTop: '8px' }}>Les atouts qui font la différence dans la scolarité de vos enfants</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            
            <div style={{ backgroundColor: '#fdfaf5', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '28px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '20px' }}>
                <BookOpen size={28} style={{ color: 'var(--secondary)' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '10px' }}>Enseignement de Qualité</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Des programmes riches et adaptés favorisant une maîtrise approfondie des matières fondamentales.</p>
            </div>

            <div style={{ backgroundColor: '#fdfaf5', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '28px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '20px' }}>
                <FileText size={28} style={{ color: 'var(--secondary)' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '10px' }}>Suivi Pédagogique Continu</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Un accompagnement sur-mesure et des évaluations régulières consultables en temps réel.</p>
            </div>

            <div style={{ backgroundColor: '#fdfaf5', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '28px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '20px' }}>
                <ShieldCheck size={28} style={{ color: 'var(--secondary)' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '10px' }}>Suivi Santé & Médical</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Un suivi médical attentif et un environnement sécurisé garantissant la sérénité des familles.</p>
            </div>

            <div style={{ backgroundColor: '#fdfaf5', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '28px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '20px' }}>
                <Bus size={28} style={{ color: 'var(--secondary)' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '10px' }}>Transport Scolaire Dédié</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Flotte de bus moderne et sécurisée desservant les différents secteurs de Monastir.</p>
            </div>

            <div style={{ backgroundColor: '#fdfaf5', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '28px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '20px' }}>
                <HeartHandshake size={28} style={{ color: 'var(--secondary)' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '10px' }}>Encadrement Bienveillant</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Une équipe pédagogique à l'écoute, soucieuse de l'épanouissement individuel de chaque élève.</p>
            </div>

            <div style={{ backgroundColor: '#fdfaf5', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '28px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '20px' }}>
                <Star size={28} style={{ color: 'var(--secondary)' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '10px' }}>Vie Associative Dynamique</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Large éventail de clubs de robotique, sport, théâtre et musique pour révéler tous les talents.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Section Liste des Clubs & Workshops au Collège */}
      <section style={{ padding: '70px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: 'var(--secondary)', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>Vie associative & Ateliers</span>
          <h2 style={{ fontSize: '34px', fontWeight: '900', color: 'var(--primary)', marginTop: '6px' }}>NOS CLUBS & WORKSHOPS</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '650px', margin: '10px auto 0 auto' }}>Découvrez l'ensemble des activités et ateliers passionnants proposés à nos élèves au Collège Excellence.</p>
        </div>
        
        <AboutClubsList />
      </section>

      {/* Slogan Final */}
      <section style={{ 
        padding: '70px 20px', 
        textAlign: 'center', 
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0'
      }}>
        <h2 style={{ fontSize: '36px', fontWeight: '900', color: 'var(--primary)', lineHeight: '1.4' }}>
          ENSEMBLE, CONSTRUISONS <br />
          <span style={{ color: 'var(--secondary)' }}>AUJOURD'HUI</span> LA RÉUSSITE DE <span style={{ color: 'var(--secondary)' }}>DEMAIN.</span>
        </h2>
      </section>

    </div>
  );
}

function AboutClubsList() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/clubs')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setClubs(data); })
      .catch(err => console.error(err));
  }, []);

  const defaultClubs = [
    { nom: "Club Robotique & IA", type: "Workshop Tech", icon: "🤖", responsable: "Prof. Robotique" },
    { nom: "Équipe de Foot", type: "Club Sportif", icon: "⚽", responsable: "Prof. EPS" },
    { nom: "Théâtre & Art dramatique", type: "Atelier Culture", icon: "🎭", responsable: "Prof. Français" },
    { nom: "Conseil de Vie Collégienne", type: "Comité Étudiant", icon: "📢", responsable: "Administration" },
    { nom: "Club d'Échecs", type: "Club de réflexion", icon: "♟️", responsable: "Prof. Maths" },
    { nom: "Chorale & Musique", type: "Atelier Musique", icon: "🎵", responsable: "Prof. Musique" }
  ];

  const clubsToDisplay = clubs.length > 0 ? clubs : defaultClubs;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
      {clubsToDisplay.map((club, idx) => (
        <div key={club._id || idx} style={{ 
          backgroundColor: '#ffffff', 
          border: '1px solid #cbd5e1', 
          borderRadius: '20px', 
          padding: '24px', 
          boxShadow: '0 4px 10px rgba(0,0,0,0.03)', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '18px'
        }}>
          <div style={{ 
            width: '58px', 
            height: '58px', 
            borderRadius: '16px', 
            backgroundColor: '#fdfaf5', 
            border: '1px solid var(--secondary)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '28px'
          }}>
            {club.icon || '🏆'}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 'bold', color: 'var(--primary)' }}>{club.nom}</h3>
            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', backgroundColor: '#fdfaf5', border: '1px solid #ecdcb9', padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase', display: 'inline-block', marginTop: '6px' }}>
              {club.type}
            </span>
            {club.responsable && (
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>👨‍🏫 {club.responsable}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyPage({ title, description }) {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-4xl mb-4">{title}</h1>
      <p className="text-xl text-muted">{description}</p>
    </div>
  );
}

function DashboardLayout() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFastNavOpen, setMobileFastNavOpen] = useState(false);
  const userText = localStorage.getItem('lycee_user');
  const user = userText ? JSON.parse(userText) : null;
  
  if (!user) {
    return <div className="p-8 text-center text-red-500">Accès refusé. Veuillez vous connecter. <Link to="/login" className="underline font-bold text-primary ml-2">Connexion</Link></div>;
  }

  const isDirection = user.role === 'admin' || user.role === 'directeur' || user.role === 'administratif';
  const isProf = user.role === 'professeur';
  const isParent = user.role === 'parent';
  const isEleve = user.role === 'eleve';

  const handleLogout = async () => {
    if (user && user._id) {
      try {
        await fetch(`http://localhost:5000/api/auth/logout/${user._id}`, { method: 'POST' });
      } catch (err) {}
    }
    localStorage.removeItem('lycee_user');
    navigate('/');
  };

  return (
    <div className="dashboard-layout relative">
      {/* Overlay sombre sur mobile si le menu est ouvert */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden" 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 998 }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
            <img src="/images/logo%20excellence.png" alt="Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
            <span className="font-bold text-xl uppercase" style={{ color: 'var(--primary)' }}>Portail</span>
          </div>
          <button className="md:hidden text-muted" onClick={() => setMobileMenuOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-col flex" style={{ flex: 1, minHeight: 0, overflowY: 'scroll', WebkitOverflowScrolling: 'touch', paddingRight: '4px', paddingBottom: '20px' }} onClick={(e) => { if (e.target.closest('a')) setMobileMenuOpen(false); }}>
          <div className="text-xs font-bold text-muted mb-2 px-2 uppercase">Menu Principal</div>
          <Link to="/dashboard" className="sidebar-link active"><Grid size={18} /> Tableau de Bord</Link>
          <Link to="/dashboard/mon-profil" className="sidebar-link"><User size={18} /> Mon Profil</Link>

          {(user.role === 'directeur' || user.role === 'admin' || isProf || isEleve) && (
            <>
              <div className="text-xs font-bold text-muted mb-2 px-2 uppercase mt-6">Espace Scolaire</div>
              <Link to="/dashboard/planning" className="sidebar-link"><Clock size={18} /> Emploi du Temps</Link>
            </>
          )}

          {isParent && (
            <>
              <div className="text-xs font-bold text-muted mb-2 px-2 uppercase mt-6 text-secondary">Espace Famille</div>
              <Link to="/dashboard/dossiers-enfants" className="sidebar-link"><Heart size={18} /> Dossiers Enfants</Link>
              <Link to="/dashboard/notes-bulletins" className="sidebar-link"><FileText size={18} /> Bulletins & Notes</Link>
            </>
          )}

          {(user.role === 'directeur' || user.role === 'admin' || isProf) && <Link to="/dashboard/presences" className="sidebar-link"><Users size={18} /> Classes & Présences</Link>}
          {(user.role === 'directeur' || user.role === 'admin' || isProf || isEleve) && <Link to="/dashboard/notes-devoirs" className="sidebar-link"><FileText size={18} /> Notes & Devoirs</Link>}
          <Link to="/dashboard/messagerie" className="sidebar-link"><MessageSquare size={18} /> Messagerie</Link>

          {isDirection && (
            <>
              <div className="text-xs font-bold text-muted mb-2 px-2 uppercase mt-6 text-primary">Direction & Admin</div>
              <Link to="/dashboard/annonces" className="sidebar-link"><FileText size={18} /> Gestion des Annonces</Link>
              <Link to="/dashboard/clubs" className="sidebar-link"><Award size={18} /> Gestion des Clubs</Link>
              <Link to="/dashboard/classes" className="sidebar-link"><BookOpen size={18} /> Gestion des Classes</Link>
              <Link to="/dashboard/paiements" className="sidebar-link"><CreditCard size={18} /> Gestion Paiements</Link>
              <Link to="/dashboard/users-list" className="sidebar-link"><Users size={18} /> Liste des Comptes</Link>
              <Link to="/dashboard/users" className="sidebar-link"><UserPlus size={18} /> Création de Comptes</Link>
            </>
          )}
        </nav>

        <div className="mt-auto">
          <button onClick={handleLogout} className="sidebar-link text-muted hover:text-primary w-full text-left"><LogIn size={18} /> Déconnexion</button>
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header Navbar pour Portail connecté */}
        <header style={{ 
          backgroundColor: '#ffffff', 
          borderBottom: '1px solid #e2e8f0', 
          padding: '12px 24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}>
          {/* Titre / Fil d'ariane */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="text-primary mobile-only-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Menu size={24} />
            </button>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)' }} className="desktop-only">
              🎓 Portail Collège
            </span>
            <span className="desktop-only" style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#eff6ff', color: '#2563eb', padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
              {user.role}
            </span>
          </div>

          {/* Profil Rapide & Liens */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className={mobileFastNavOpen ? "mobile-fast-nav open" : "desktop-only"} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link to="/dashboard" onClick={() => setMobileFastNavOpen(false)} style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--primary)', backgroundColor: '#eff6ff', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Grid size={15} /> Mon Dashboard
              </Link>
              <Link to="/" onClick={() => setMobileFastNavOpen(false)} style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Home size={15} /> Accueil
              </Link>
              <Link to="/about" onClick={() => setMobileFastNavOpen(false)} style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Info size={15} /> À propos
              </Link>
              <Link to="/activities" onClick={() => setMobileFastNavOpen(false)} style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Activity size={15} /> Activités
              </Link>
              <Link to="/contact" onClick={() => setMobileFastNavOpen(false)} style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Phone size={15} /> Contact
              </Link>
              <button 
                className="mobile-only-flex"
                onClick={handleLogout}
                style={{ backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', alignItems: 'center', gap: '6px', marginTop: '4px', width: '100%' }}
              >
                <LogIn size={15} /> Déconnexion
              </button>
            </div>

            <div className="desktop-only" style={{ width: '1px', height: '24px', backgroundColor: '#cbd5e1' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--primary)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px',
                overflow: 'hidden'
              }}>
                {user.photoProfil ? (
                  <img src={user.photoProfil} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  (user.prenom || user.nom || 'E').charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--primary)' }}>
                  {user.prenom ? `${user.prenom} ${user.nom}` : user.nom}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>ID: {user.identifiant}</div>
              </div>
            </div>

            <div className="desktop-only">
              <button 
                onClick={handleLogout}
                style={{ backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <LogIn size={14} /> Quitter
              </button>
            </div>

            {/* Bouton Hamburger Droite pour les liens rapides (Mobile Only) à l'extrême droite */}
            <button className="mobile-only-btn text-primary" onClick={() => setMobileFastNavOpen(!mobileFastNavOpen)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginLeft: '4px' }}>
              {mobileFastNavOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        <main className="dashboard-content" style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function EleveDashboard({ user }) {
  const [planning, setPlanning] = useState([]);
  const [className, setClassName] = useState('');
  const [allClubs, setAllClubs] = useState([]);
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);

  const [announcementsList, setAnnouncementsList] = useState([]);

  // Charger les données de l'élève
  useEffect(() => {
    // Planning
    fetch(`http://localhost:5000/api/classes/eleve/${user._id}/planning`)
      .then(res => res.json())
      .then(data => {
        if (data && data.emploiDuTemps) {
          setPlanning(data.emploiDuTemps);
          setClassName(data.className || '');
        }
      })
      .catch(err => console.error(err));

    // Clubs
    fetch('http://localhost:5000/api/clubs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAllClubs(data);
      })
      .catch(err => console.error(err));

    // Annonces
    fetch(`http://localhost:5000/api/announcements/user/${user._id}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAnnouncementsList(data);
      })
      .catch(err => console.error(err));
  }, [user._id]);

  // Jours utiles
  const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const todayDate = new Date();
  const tomorrowDate = new Date(todayDate);
  tomorrowDate.setDate(todayDate.getDate() + 1);

  const todayName = dayNames[todayDate.getDay()];
  const tomorrowName = dayNames[tomorrowDate.getDay()];

  // Filtrer séances d'aujourd'hui et demain
  const todaySessions = planning.filter(s => s.jour === todayName);
  const tomorrowSessions = planning.filter(s => s.jour === tomorrowName);

  const displayedAnnouncements = showAllAnnouncements ? announcementsList : announcementsList.slice(0, 5);

  // Extraire les événements de clubs prévus dans les 2 semaines à venir (à partir d'aujourd'hui)
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const twoWeeksLater = new Date(now);
  twoWeeksLater.setDate(now.getDate() + 14);
  twoWeeksLater.setHours(23, 59, 59, 999);

  const upcomingEvents = [];
  allClubs.forEach(club => {
    if (club.evenements && Array.isArray(club.evenements)) {
      club.evenements.forEach(ev => {
        const evDate = new Date(ev.date);
        if (evDate >= now && evDate <= twoWeeksLater) {
          upcomingEvents.push({ ...ev, clubNom: club.nom, clubIcon: club.icon });
        }
      });
    }
  });

  const eventsToDisplay = upcomingEvents;


  return (
    <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* HEADER DE BIENVENUE */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Espace Élève</span>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary)', margin: '4px 0 0 0' }}>
            Bienvenue, {
              user.prenom && user.nom 
                ? `${user.prenom} ${user.nom}` 
                : (user.prenom || user.nom || user.email || 'eleve@gmail.com')
            } ! 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '4px 0 0 0', fontSize: '14px' }}>
            {className ? `Classe : ${className}` : 'Élève du Collège Excellence School'} • Année Scolaire 2026-2027
          </p>
        </div>
      </div>

      {/* SEANCES DE AUJOURD'HUI ET DEMAIN */}
      <section style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          <div style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '10px', borderRadius: '14px' }}>
            <Clock size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>Séances d'Aujourd'hui et Demain</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Votre emploi du temps de cours pour les 48 prochaines heures</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          
          {/* Aujourd'hui */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} style={{ color: '#2563eb' }} /> Aujourd'hui ({todayName})
              </h3>
              <span style={{ fontSize: '11px', fontWeight: 'bold', backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 10px', borderRadius: '12px' }}>
                {todaySessions.length} cours
              </span>
            </div>

            {todaySessions.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {todaySessions.map((s, idx) => (
                  <div key={idx} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--primary)' }}>{s.matiere}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>👨‍🏫 {s.professeur?.nom ? `${s.professeur.prenom || ''} ${s.professeur.nom}` : 'Enseignant'}</div>
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#2563eb', backgroundColor: '#eff6ff', padding: '6px 12px', borderRadius: '8px' }}>
                      {s.heureDebut} - {s.heureFin}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '14px' }}>
                🏝️ Pas de cours programmés aujourd'hui ({todayName})
              </div>
            )}
          </div>

          {/* Demain */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} style={{ color: '#059669' }} /> Demain ({tomorrowName})
              </h3>
              <span style={{ fontSize: '11px', fontWeight: 'bold', backgroundColor: '#d1fae5', color: '#065f46', padding: '4px 10px', borderRadius: '12px' }}>
                {tomorrowSessions.length} cours
              </span>
            </div>

            {tomorrowSessions.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tomorrowSessions.map((s, idx) => (
                  <div key={idx} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--primary)' }}>{s.matiere}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>👨‍🏫 {s.professeur?.nom ? `${s.professeur.prenom || ''} ${s.professeur.nom}` : 'Enseignant'}</div>
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#059669', backgroundColor: '#ecfdf5', padding: '6px 12px', borderRadius: '8px' }}>
                      {s.heureDebut} - {s.heureFin}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '14px' }}>
                🏝️ Pas de cours programmés demain ({tomorrowName})
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ANNONCES OFFICIELLES */}
      <section style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '10px', borderRadius: '14px' }}>
              <FileText size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>Annonces Officielles du Collège</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Les dernières actualités et notes d'information destinées aux élèves</p>
            </div>
          </div>

          <button 
            onClick={() => setShowAllAnnouncements(!showAllAnnouncements)}
            style={{ 
              backgroundColor: '#f1f5f9', 
              color: 'var(--primary)', 
              border: '1px solid #cbd5e1', 
              padding: '8px 18px', 
              borderRadius: '12px', 
              fontSize: '13px', 
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {showAllAnnouncements ? 'Réduire' : `Afficher toutes (${announcementsList.length})`}
          </button>
        </div>

        {displayedAnnouncements.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {displayedAnnouncements.map((ann, idx) => (
              <div key={ann._id || idx} style={{ backgroundColor: '#fdfaf5', border: '1px solid #f3e8d3', borderRadius: '14px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--primary)', backgroundColor: '#ffffff', border: '1px solid #ecdcb9', padding: '4px 10px', borderRadius: '8px', whiteSpace: 'nowrap', marginTop: '2px' }}>
                    {ann.createdAt ? new Date(ann.createdAt).toLocaleDateString('fr-FR') : (ann.date || 'Récents')}
                  </span>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '15px', color: 'var(--primary)' }}>{ann.titre}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{ann.detail}</div>
                  </div>
                </div>

                <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: ann.priorite === 'haute' ? '#fee2e2' : '#e0f2fe', color: ann.priorite === 'haute' ? '#ef4444' : '#0284c7', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  {ann.categorie || 'Info'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Aucune annonce officielle diffusée pour le moment.
          </div>
        )}
      </section>

      {/* EVENEMENTS CLUBS (LES 2 PROCHAINES SEMAINES) */}
      <section style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          <div style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '10px', borderRadius: '14px' }}>
            <Award size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>Événements Clubs (2 Prochaines Semaines)</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Calendrier des activités et ateliers prévus prochainement</p>
          </div>
        </div>

        {eventsToDisplay.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {eventsToDisplay.map((ev, idx) => (
              <div key={ev._id || idx} style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '28px' }}>{ev.clubIcon || '🏆'}</span>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '15px', color: 'var(--primary)' }}>{ev.titre}</div>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--secondary)' }}>{ev.clubNom}</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)', backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <span>📅 {ev.date} {ev.heure ? `à ${ev.heure}` : ''}</span>
                  <span>📍 {ev.lieu || 'Collège'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Aucun événement de club enregistré au cours des 2 dernières semaines.
          </div>
        )}
      </section>

      {/* TOUS LES CLUBS DISPONIBLES */}
      <section style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          <div style={{ backgroundColor: '#f3e8ff', color: '#9333ea', padding: '10px', borderRadius: '14px' }}>
            <Users size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>Tous les Clubs & Workshops Disponibles</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Explorez les ateliers scolaires et choisissez votre passion</p>
          </div>
        </div>

        {allClubs.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {allClubs.map((club) => (
              <div key={club._id} style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '32px' }}>{club.icon || '🏆'}</span>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--primary)', margin: 0 }}>{club.nom}</h3>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--secondary)', backgroundColor: '#fdfaf5', padding: '2px 8px', borderRadius: '6px' }}>
                        {club.type}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 16px 0', lineHeight: '1.4' }}>
                    {club.description || 'Club dynamique pour les élèves du Collège Excellence.'}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <span>👥 {club.membres ? club.membres.length : 0} membres</span>
                  <span style={{ color: '#059669', fontWeight: 'bold' }}>Ouvert aux inscriptions</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Aucun club disponible pour le moment.
          </div>
        )}
      </section>

    </div>
  );
}

function DashboardPage() {
  const userText = localStorage.getItem('lycee_user');
  const user = userText ? JSON.parse(userText) : {};

  const isDirectionRole = user.role === 'admin' || user.role === 'directeur' || user.role === 'direction' || user.role === 'administratif';

  const [announcementsList, setAnnouncementsList] = useState([]);
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);

  const [stats, setStats] = useState({ totalEleves: '...', totalProfs: '...', totalEquipe: '...', totalClasses: '...', tauxPresence: '...' });

  useEffect(() => {
    if (user._id && user.role !== 'eleve') {
      fetch(`http://localhost:5000/api/announcements/user/${user._id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setAnnouncementsList(data);
        })
        .catch(err => console.error("Erreur chargement annonces:", err));

      if (isDirectionRole) {
        fetch('http://localhost:5000/api/stats')
          .then(res => res.json())
          .then(data => {
            if (data && data.totalEleves !== undefined) setStats(data);
          })
          .catch(err => console.error("Erreur chargement stats:", err));
      }
    }
  }, [user._id, user.role, isDirectionRole]);

  if (user.role === 'eleve') {
    return <EleveDashboard user={user} />;
  }

  const displayedAnnouncements = showAllAnnouncements ? announcementsList : announcementsList.slice(0, 5);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Tableau de Bord</h1>
          <p className="text-muted">Bienvenue dans votre espace sécurisé.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-bold">{user.nom || 'Utilisateur'}</div>
            <div className="text-sm text-muted capitalize">{user.role || 'Inconnu'}</div>
          </div>
          <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{user.nom ? user.nom.charAt(0).toUpperCase() : 'U'}</div>
        </div>
      </div>

      {isDirectionRole ? (
        <div className="grid grid-cols-5 gap-3 mb-8">
          <div className="card p-4" style={{ padding: '16px' }}>
            <div className="text-muted mb-1 font-bold text-[10px] uppercase tracking-wider">Total Élèves</div>
            <div className="text-3xl font-black text-primary">{stats.totalEleves}</div>
            <Link to="/dashboard/users-list" className="text-primary font-bold hover:underline flex items-center gap-1 mt-2 text-[10px] uppercase opacity-80">Gérer Les Élèves →</Link>
          </div>
          <div className="card p-4" style={{ padding: '16px' }}>
            <div className="text-muted mb-1 font-bold text-[10px] uppercase tracking-wider">Professeurs</div>
            <div className="text-3xl font-black text-primary">{stats.totalProfs}</div>
            <Link to="/dashboard/users-list" className="text-primary font-bold hover:underline flex items-center gap-1 mt-2 text-[10px] uppercase opacity-80">Personnel Scolaire →</Link>
          </div>
          <div className="card p-4" style={{ padding: '16px' }}>
            <div className="text-muted mb-1 font-bold text-[10px] uppercase tracking-wider">Équipe Scolarité</div>
            <div className="text-3xl font-black text-primary">{stats.totalEquipe}</div>
            <Link to="/dashboard/users-list" className="text-primary font-bold hover:underline flex items-center gap-1 mt-2 text-[10px] uppercase opacity-80">Direction & Admin →</Link>
          </div>
          <div className="card p-4" style={{ padding: '16px' }}>
            <div className="text-muted mb-1 font-bold text-[10px] uppercase tracking-wider">Nb classes</div>
            <div className="text-3xl font-black text-primary">{stats.totalClasses}</div>
            <Link to="/dashboard/classes" className="text-primary font-bold hover:underline flex items-center gap-1 mt-2 text-[10px] uppercase opacity-80">Trombinoscope →</Link>
          </div>
          <div className="card p-4" style={{ padding: '16px' }}>
            <div className="text-muted mb-1 font-bold text-[10px] uppercase tracking-wider">Présence Globale</div>
            <div className="text-3xl font-black text-secondary">{stats.tauxPresence}%</div>
            <div className="text-muted flex items-center gap-1 mt-2 text-[9px] opacity-80">Temps réel</div>
          </div>
        </div>
      ) : user.role === 'professeur' ? (
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="text-muted mb-2 text-sm font-bold uppercase tracking-wider">Mes Classes</div>
            <Link to="/dashboard/classes" className="text-primary font-bold hover:underline flex items-center gap-2 mt-2">Voir mes élèves →</Link>
          </div>
          <div className="card">
            <div className="text-muted mb-2 text-sm font-bold uppercase tracking-wider">Mon Emploi du Temps</div>
            <Link to="/dashboard/planning" className="text-primary font-bold hover:underline flex items-center gap-2 mt-2">Consulter →</Link>
          </div>
          <div className="card">
            <div className="text-muted mb-2 text-sm font-bold uppercase tracking-wider">Présences</div>
            <Link to="/dashboard/presences" className="text-primary font-bold hover:underline flex items-center gap-2 mt-2">Faire l'appel →</Link>
          </div>
        </div>
      ) : user.role === 'parent' ? (
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="text-muted mb-2 text-sm font-bold uppercase tracking-wider">Mes Enfants</div>
            <Link to="/dashboard/dossiers-enfants" className="text-primary font-bold hover:underline flex items-center gap-2 mt-2">Dossiers scolaires →</Link>
          </div>
          <div className="card">
            <div className="text-muted mb-2 text-sm font-bold uppercase tracking-wider">Emplois du Temps</div>
            <Link to="/dashboard/planning" className="text-primary font-bold hover:underline flex items-center gap-2 mt-2">Consulter →</Link>
          </div>
          <div className="card">
            <div className="text-muted mb-2 text-sm font-bold uppercase tracking-wider">Messagerie</div>
            <Link to="/dashboard/messagerie" className="text-primary font-bold hover:underline flex items-center gap-2 mt-2">Contacter l'école →</Link>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-8">
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="text-xl font-bold m-0 flex items-center gap-2">
              <FileText style={{ color: 'var(--secondary)' }} size={24} /> 
              Annonces Officielles
            </h3>
            <button 
              onClick={() => setShowAllAnnouncements(!showAllAnnouncements)}
              style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 'bold' }}
            >
              {showAllAnnouncements ? 'Réduire' : `Afficher tout (${announcementsList.length})`}
            </button>
          </div>
          <div style={{ padding: '24px', backgroundColor: '#fdfaf5', minHeight: '200px' }}>
            {displayedAnnouncements.length > 0 ? (
              <div className="flex flex-col gap-4">
                {displayedAnnouncements.map((ann, idx) => (
                  <div key={ann._id || idx} style={{ borderBottom: '1px solid #ecdcb9', paddingBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div className="font-bold flex items-center gap-2 text-primary">
                        {ann.titre}
                        {ann.priorite === 'haute' && <span style={{ fontSize: '10px', backgroundColor: '#fee2e2', color: '#ef4444', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>Urgent</span>}
                      </div>
                      <div className="text-sm text-muted mt-1">{ann.detail}</div>
                      <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--secondary)', marginTop: '8px' }}>
                        📅 {new Date(ann.createdAt).toLocaleDateString('fr-FR')} • 📌 {ann.categorie || 'Information'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Aucune annonce pour le moment.
              </div>
            )}
          </div>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Accès Rapides</h3>
          <div className="grid grid-cols-2 gap-4">
            {isDirectionRole ? (
              <>
                <Link to="/dashboard/classes" className="btn btn-outline py-4 flex items-center justify-center gap-2 hover:bg-gray-50"><Users /> Classes</Link>
                <Link to="/dashboard/users-list" className="btn btn-outline py-4 flex items-center justify-center gap-2 hover:bg-gray-50"><Settings /> Comptes</Link>
                <Link to="/dashboard/annonces" className="btn btn-outline py-4 flex items-center justify-center gap-2 hover:bg-gray-50"><FileText /> Annonces</Link>
                <Link to="/dashboard/clubs" className="btn btn-outline py-4 flex items-center justify-center gap-2 hover:bg-gray-50"><Award /> Clubs</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard/planning" className="btn btn-outline py-4 flex items-center justify-center gap-2 hover:bg-gray-50"><Clock /> Mon Planning</Link>
                <Link to="/dashboard/mon-profil" className="btn btn-outline py-4 flex items-center justify-center gap-2 hover:bg-gray-50"><User /> Mon Profil</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardUsersList() {
  const [activeTab, setActiveTab] = useState('directeurs');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ nom: '', email: '', telephone: '', matieres: '' });
  const [bulletinData, setBulletinData] = useState(null);

  const handleViewBulletin = async (enfant) => {
    try {
      const res = await fetch(`http://localhost:5000/api/classes/eleve/${enfant._id}/planning`);
      const data = await res.json();
      const className = res.ok ? data.className : "INCONNUE";
      setBulletinData({ eleve: enfant, className, emploiDuTemps: data.emploiDuTemps });
    } catch {
      setBulletinData({ eleve: enfant, className: "INCONNUE" });
    }
  };

  const fetchUsers = () => {
    fetch('http://localhost:5000/api/auth/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur de chargement des utilisateurs", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/auth/users/${id}`, { method: 'DELETE' });
      if (res.ok) fetchUsers();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      nom: user.nom || '',
      email: user.email || '',
      telephone: user.telephone || '',
      matieres: user.matieres ? user.matieres.join(', ') : ''
    });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      const matieresArray = editForm.matieres.split(',').map(m => m.trim()).filter(m => m !== '');
      const res = await fetch(`http://localhost:5000/api/auth/users/${editingUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editForm, matieres: matieresArray })
      });
      if (res.ok) {
        setEditingUser(null);
        fetchUsers();
      }
    } catch (err) {
      alert("Erreur modification");
    }
  };

  const safeUsers = Array.isArray(users) ? users : [];

  const dDirecteurs = safeUsers.filter(u => u.role === 'directeur');
  const dAdmins = safeUsers.filter(u => u.role === 'administratif'); // excludes super admin
  const dProfs = safeUsers.filter(u => u.role === 'professeur' || u.role === 'prof');
  const dParents = safeUsers.filter(u => u.role === 'parent');

  if (loading) {
    return <div className="p-8 text-center text-muted">Chargement des utilisateurs en cours...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Annuaire des Comptes</h1>
          <p className="text-muted">Consultez et gérez tous les utilisateurs de la plateforme.</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab('directeurs')} className={`btn ${activeTab === 'directeurs' ? 'btn-primary' : 'btn-outline'}`}>Directeurs ({dDirecteurs.length})</button>
        <button onClick={() => setActiveTab('administratifs')} className={`btn ${activeTab === 'administratifs' ? 'btn-primary' : 'btn-outline'}`}>Administratifs ({dAdmins.length})</button>
        <button onClick={() => setActiveTab('profs')} className={`btn ${activeTab === 'profs' ? 'btn-primary' : 'btn-outline'}`}>Professeurs ({dProfs.length})</button>
        <button onClick={() => setActiveTab('parents')} className={`btn ${activeTab === 'parents' ? 'btn-primary' : 'btn-outline'}`}>Parents & Élèves ({dParents.length})</button>
      </div>

      <div className="card p-0 overflow-hidden">
        {/* Directeurs */}
        {activeTab === 'directeurs' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Comptes Direction</h2>
            {dDirecteurs.length === 0 && <p className="text-muted">Aucun directeur trouvé.</p>}
            <div className="grid gap-4">
              {dDirecteurs.map((dir, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: 'var(--background)', border: '2px solid var(--secondary)' }}>
                  <div>
                    <div className="font-bold text-lg text-primary">{dir.nom} <span className="text-sm font-normal text-muted ml-2">ID: {dir.identifiant}</span></div>
                    <div className="text-muted text-sm">{dir.email} • {dir.telephone}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(dir)} className="btn btn-outline text-sm py-2">Modifier</button>
                    <button onClick={() => handleDelete(dir._id)} className="btn btn-outline text-sm py-2 bg-white text-red-500 border-red-200 hover:bg-red-50">Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Administrateurs */}
        {activeTab === 'administratifs' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Comptes Administratifs</h2>
            {dAdmins.length === 0 && <p className="text-muted">Aucun administratif trouvé.</p>}
            <div className="grid gap-4">
              {dAdmins.map((admin, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border-color)' }}>
                  <div>
                    <div className="font-bold text-lg">{admin.nom} <span className="text-sm font-normal text-muted ml-2">ID: {admin.identifiant}</span></div>
                    <div className="text-muted text-sm">{admin.email} • {admin.telephone}</div>
                  </div>
                  <div className="flex gap-2">
                    {admin.role !== 'admin' && ( // Empêcher la suppression du Super Admin racine depuis l'UI pour sécurité
                      <>
                        <button onClick={() => handleEdit(admin)} className="btn btn-outline text-sm py-2">Modifier</button>
                        <button onClick={() => handleDelete(admin._id)} className="btn btn-outline text-sm py-2 bg-white text-red-500 border-red-200 hover:bg-red-50">Supprimer</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professeurs */}
        {activeTab === 'profs' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Comptes Professeurs</h2>
            {dProfs.length === 0 && <p className="text-muted">Aucun professeur trouvé.</p>}
            <div className="grid gap-4">
              {dProfs.map((prof, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border-color)' }}>
                  <div>
                    <div className="font-bold text-lg">{prof.nom} <span className="text-sm font-normal text-muted ml-2">ID: {prof.identifiant}</span></div>
                    <div className="text-muted text-sm mb-1">{prof.email}</div>
                    <div className="inline-block px-2 py-1 bg-white text-secondary font-bold text-xs rounded border border-gray-200">Matière(s) : {prof.matieres && prof.matieres.length > 0 ? prof.matieres.join(', ') : 'Non spécifié'}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(prof)} className="btn btn-outline text-sm py-2">Modifier</button>
                    <button onClick={() => handleDelete(prof._id)} className="btn btn-outline text-sm py-2 bg-white text-red-500 border-red-200 hover:bg-red-50">Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Parents et Enfants */}
        {activeTab === 'parents' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Familles (Parents et Élèves)</h2>
            {dParents.length === 0 && <p className="text-muted">Aucun parent trouvé.</p>}
            <div className="grid gap-6">
              {dParents.map((parent, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                  {/* Parent Header */}
                  <div className="p-4 flex justify-between items-center" style={{ backgroundColor: 'var(--background)' }}>
                    <div>
                      <div className="font-bold text-lg text-primary">Tuteur : {parent.nom} <span className="text-sm font-normal text-muted ml-2">ID: {parent.identifiant}</span></div>
                      <div className="text-muted text-sm">{parent.email} • {parent.telephone || 'Non renseigné'}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(parent)} className="btn btn-outline text-sm py-2 bg-white">Modifier Parent</button>
                      <button onClick={() => handleDelete(parent._id)} className="btn btn-outline text-sm py-2 bg-white text-red-500 border-red-200 hover:bg-red-50">Suppr. (Pack total)</button>
                    </div>
                  </div>
                  {/* Enfants List */}
                  <div className="p-4 bg-white border-t border-gray-100">
                    <div className="text-sm font-bold text-secondary mb-3 uppercase">Élèves rattachés ({parent.enfants ? parent.enfants.length : 0}) :</div>
                    <div className="grid gap-3">
                      {parent.enfants && parent.enfants.map((enfant, i) => (
                        <div key={i} className="flex justify-between items-center p-3 rounded" style={{ backgroundColor: '#fdfaf5', border: '1px dashed var(--secondary)' }}>
                          <div>
                            <div className="font-bold text-primary">{enfant.nom}</div>
                            <div className="text-sm text-muted">{enfant.niveauEtude || 'Non défini'} • ID: {enfant.identifiant}</div>
                          </div>
                          <button onClick={() => handleViewBulletin(enfant)} className="text-sm font-bold text-primary hover:text-secondary underline">Bulletin</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {editingUser && createPortal(
        <div 
          style={{ position: 'fixed', inset: 0, top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', zIndex: 2147483647, backgroundColor: 'rgba(0, 0, 0, 0.45)', backdropFilter: 'blur(3px)' }}
          onClick={() => setEditingUser(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ width: '520px', maxWidth: '95vw', maxHeight: '90vh', backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', position: 'relative', border: '1px solid #d1d5db' }}
          >
            {/* ====== HEADER ====== */}
            <div style={{ backgroundColor: '#f0f7fb', padding: '24px 24px 20px 24px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid #e0eff8' }}>
              <button 
                onClick={() => setEditingUser(null)} 
                style={{ position: 'absolute', top: '16px', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={24} />
              </button>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0' }}>Modifier Compte</h3>
              <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0 0' }}>ID: {editingUser.identifiant}</p>
            </div>

            {/* ====== BODY ====== */}
            <div style={{ padding: '24px', overflowY: 'auto' }}>
              <form onSubmit={submitEdit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: 0 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Nom Complet</label>
                  <input type="text" className="input-field w-full" value={editForm.nom} onChange={e => setEditForm({ ...editForm, nom: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Email</label>
                  <input type="email" className="input-field w-full" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Téléphone</label>
                  <input type="text" className="input-field w-full" value={editForm.telephone} onChange={e => setEditForm({ ...editForm, telephone: e.target.value })} />
                </div>
                
                {(editingUser.role === 'professeur' || editingUser.role === 'prof') && (
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Matières enseignées</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxHeight: '160px', overflowY: 'auto', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#f8fafc' }}>
                      {OFFICIAL_SUBJECTS.map(subj => {
                        const matList = editForm.matieres ? editForm.matieres.split(',').map(m => m.trim()).filter(Boolean) : [];
                        const isChecked = matList.includes(subj);
                        return (
                          <label key={subj} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#475569' }}>
                            <input type="checkbox" checked={isChecked} onChange={(e) => {
                              if (e.target.checked) setEditForm({...editForm, matieres: [...matList, subj].join(', ')});
                              else setEditForm({...editForm, matieres: matList.filter(m => m !== subj).join(', ')});
                            }} />
                            {subj}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* ====== FOOTER ====== */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                  <button type="button" onClick={() => setEditingUser(null)} className="btn btn-outline" style={{ borderRadius: '9999px', padding: '8px 20px' }}>Annuler</button>
                  <button type="submit" className="btn btn-primary" style={{ borderRadius: '9999px', padding: '8px 24px' }}>Enregistrer</button>
                </div>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )}
      
      <BulletinModal bulletinData={bulletinData} onClose={() => setBulletinData(null)} />

    </div>
  );
}

function DashboardAdminUsers() {
  const [roleSelection, setRoleSelection] = useState('administratif');
  const [formData, setFormData] = useState({ prenom: '', nom: '', email: '', telephone: '', motDePasse: '', manuelMatiere: '' });
  const [checkboxes, setCheckboxes] = useState([]);
  const [enfants, setEnfants] = useState([{ nom: '', niveau: '7ème année' }]);
  const [status, setStatus] = useState({ type: '', message: '' });

  const loggedUser = JSON.parse(localStorage.getItem('lycee_user') || '{}');
  const isAdministratif = loggedUser.role === 'administratif';

  const resetForm = () => {
    setFormData({ prenom: '', nom: '', email: '', telephone: '', motDePasse: '', manuelMatiere: '' });
    setCheckboxes([]);
    setEnfants([{ nom: '', niveau: '7ème année' }]);
    setStatus({ type: '', message: '' });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckbox = (subject) => {
    if (checkboxes.includes(subject)) {
      setCheckboxes(checkboxes.filter(c => c !== subject));
    } else {
      setCheckboxes([...checkboxes, subject]);
    }
  };

  const handleEnfantChange = (index, field, value) => {
    const newEnfants = [...enfants];
    newEnfants[index][field] = value;
    setEnfants(newEnfants);
  };

  const addEnfant = () => setEnfants([...enfants, { nom: '', niveau: '7ème année' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('http://localhost:5000/api/auth/admin-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleSelection,
          ...formData,
          checkboxes,
          enfants
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: 'error', message: data.message || 'Erreur lors de la création.' });
      } else {
        setStatus({ type: 'success', message: `Succès ! Compte ${roleSelection} créé. Identifiant: ${data.user.identifiant}` });
        setFormData({ prenom: '', nom: '', email: '', telephone: '', motDePasse: '', manuelMatiere: '' });
        setCheckboxes([]);
        setEnfants([{ nom: '', niveau: '7ème année' }]);
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Erreur de connexion au serveur.' });
    }
  };

  // Subjects are imported globally from OFFICIAL_SUBJECTS

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Création de Comptes</h1>
          <p className="text-muted">Interface d'administration centrale (Super Admin)</p>
        </div>
      </div>

      <div className="card max-w-3xl mb-8 border-t-0 p-0 overflow-hidden flex">
        {!isAdministratif && (
          <button onClick={() => { setRoleSelection('directeur'); resetForm(); }} className={`flex-1 py-4 font-bold text-center border-r border-gray-200 ${roleSelection === 'directeur' ? 'bg-primary text-white' : 'text-muted hover:bg-gray-50'}`}>Directeur</button>
        )}
        <button onClick={() => { setRoleSelection('administratif'); resetForm(); }} className={`flex-1 py-4 font-bold text-center ${roleSelection === 'administratif' ? 'bg-primary text-white' : 'text-muted hover:bg-gray-50'}`}>Administratif</button>
        <button onClick={() => { setRoleSelection('prof'); resetForm(); }} className={`flex-1 py-4 font-bold text-center border-l border-r border-gray-200 ${roleSelection === 'prof' ? 'bg-primary text-white' : 'text-muted hover:bg-gray-50'}`}>Professeur</button>
        <button onClick={() => { setRoleSelection('parent'); resetForm(); }} className={`flex-1 py-4 font-bold text-center ${roleSelection === 'parent' ? 'bg-primary text-white' : 'text-muted hover:bg-gray-50'}`}>Parents (Pack)</button>
      </div>

      <div className="card max-w-3xl border-t-4" style={{ borderTopColor: 'var(--secondary)' }}>
        <h2 className="text-2xl font-bold mb-6 text-primary">Nouveau compte {roleSelection === 'directeur' ? 'Directeur' : roleSelection === 'administratif' ? 'Administratif' : roleSelection === 'prof' ? 'Professeur' : 'Parent & Enfants'}</h2>

        {status.message && (
          <div className="p-4 mb-6 rounded text-white font-bold" style={{ backgroundColor: status.type === 'error' ? '#ef4444' : '#10b981' }}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="input-group"><label className="input-label">Prénom</label><input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required className="input-field" placeholder="Prénom" /></div>
            <div className="input-group"><label className="input-label">Nom</label><input type="text" name="nom" value={formData.nom} onChange={handleChange} required className="input-field" placeholder="Nom" /></div>
          </div>

          <div className="input-group mb-4"><label className="input-label">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-field" placeholder="adresse@domaine.com" /></div>

          {(roleSelection === 'administratif' || roleSelection === 'directeur' || roleSelection === 'parent') && (
            <div className="input-group mb-4"><label className="input-label">Téléphone</label><input type="text" name="telephone" value={formData.telephone} onChange={handleChange} className="input-field" placeholder="Numéro de contact" /></div>
          )}

          {roleSelection === 'prof' && (
            <div className="input-group mb-4">
              <label className="input-label">Matière(s) enseignée(s)</label>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#fdfaf5', border: '1px solid var(--border-color)' }}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 max-h-56 overflow-y-auto">
                  {OFFICIAL_SUBJECTS.map(sub => (
                    <label key={sub} className="flex items-center gap-2 cursor-pointer text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      <input type="checkbox" checked={checkboxes.includes(sub)} onChange={() => handleCheckbox(sub)} /> {sub}
                    </label>
                  ))}
                </div>
                <div className="mt-2 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <label className="text-sm font-bold mb-1 block">Autre matière (saisie manuelle) :</label>
                  <input type="text" name="manuelMatiere" value={formData.manuelMatiere} onChange={handleChange} className="input-field" placeholder="Ex: Philosophie..." style={{ backgroundColor: 'white' }} />
                </div>
              </div>
            </div>
          )}

          <div className="input-group mb-6"><label className="input-label">Mot de passe</label><input type="password" name="motDePasse" value={formData.motDePasse} onChange={handleChange} required className="input-field" placeholder="Mot de passe sécurisé" /></div>

          {roleSelection === 'parent' && (
            <div className="mt-8 mb-6 border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
              <h3 className="font-bold text-lg mb-4 text-secondary">2. Informations de(s) l'Élève(s) lié(s)</h3>
              {enfants.map((enfant, idx) => (
                <div key={idx} className="p-4 mb-4 rounded-lg" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border-color)' }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="input-group"><label className="input-label">Nom complet de l'élève</label><input type="text" value={enfant.nom} onChange={(e) => handleEnfantChange(idx, 'nom', e.target.value)} required className="input-field" placeholder="Nom de l'enfant" /></div>
                    <div className="input-group"><label className="input-label">Niveau d'étude</label>
                      <select className="input-field" value={enfant.niveau} onChange={(e) => handleEnfantChange(idx, 'niveau', e.target.value)} style={{ backgroundColor: 'white' }}>
                        <option value="7ème année">7ème année</option>
                        <option value="8ème année">8ème année</option>
                        <option value="9ème année">9ème année</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addEnfant} className="btn btn-outline text-sm"><span className="text-secondary font-bold mr-2">+</span> Ajouter un autre élève</button>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-8">
            <button type="button" onClick={resetForm} className="btn btn-outline">Annuler</button>
            <button type="submit" className="btn btn-primary">Créer le(s) compte(s)</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DashboardClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [formData, setFormData] = useState({ nom: '', niveau: '7ème année de base', anneeScolaire: '2026/2027' });

  const fetchClasses = () => {
    fetch('http://localhost:5000/api/classes')
      .then(res => res.json())
      .then(data => { setClasses(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  };

  useEffect(() => { fetchClasses(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing ? `http://localhost:5000/api/classes/${selectedClassId}` : 'http://localhost:5000/api/classes';
      const method = isEditing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        setIsEditing(false);
        setSelectedClassId(null);
        setFormData({ nom: '', niveau: '7ème année de base', anneeScolaire: '2026/2027' });
        fetchClasses();
      }
    } catch (err) {
      alert("Erreur lors de la sauvegarde de la classe");
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette classe définitivement ?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/classes/${id}`, { method: 'DELETE' });
      if (res.ok) fetchClasses();
    } catch (err) { alert("Erreur de suppression"); }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setSelectedClassId(null);
    setFormData({ nom: '', niveau: '7ème année de base', anneeScolaire: '2026/2027' });
    setShowModal(true);
  };

  const openEditModal = (e, cls) => {
    e.stopPropagation();
    setIsEditing(true);
    setSelectedClassId(cls._id);
    setFormData({ nom: cls.nom, niveau: cls.niveau, anneeScolaire: cls.anneeScolaire });
    setShowModal(true);
  };

  if (loading) return <div className="p-8 text-center text-muted">Chargement des classes...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Gestion des Classes</h1>
          <p className="text-muted">Vue d'ensemble et configuration des classes d'élèves.</p>
        </div>
        <button onClick={openCreateModal} className="btn btn-primary">+ Nouvelle Classe</button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {classes.length === 0 && <p className="text-muted col-span-3">Aucune classe n'a été créée pour le moment.</p>}
        {classes.map(cls => (
          <div key={cls._id} className="card hover:-translate-y-1 transition-transform cursor-pointer" style={{ borderTop: '4px solid var(--secondary)' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-primary">{cls.nom}</h3>
              <div className="px-2 py-1 bg-secondary text-white text-xs font-bold rounded">{cls.anneeScolaire}</div>
            </div>
            <p className="text-muted mb-6">{cls.niveau}</p>
            <div className="flex justify-between items-center border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
              <div className="text-sm font-bold text-primary">{(cls.eleves && cls.eleves.length) || 0} Élèves inscrits</div>
              <div className="flex items-center gap-3">
                <button onClick={(e) => openEditModal(e, cls)} className="text-secondary hover:text-primary transition-colors" title="Modifier la classe"><Edit size={16} /></button>
                <button onClick={(e) => handleDelete(e, cls._id)} className="text-red-400 hover:text-red-600 transition-colors" title="Supprimer la classe"><Trash2 size={16} /></button>
                <Link onClick={(e) => e.stopPropagation()} to={`/dashboard/classes/${cls._id}`} className="text-sm font-bold text-secondary hover:underline pl-2 border-l" style={{ borderColor: 'var(--border-color)' }}>Détails ➔</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-primary">{isEditing ? 'Modifier la classe' : 'Créer une classe'}</h3>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="input-label">Nom de la classe</label>
                <input type="text" className="input-field" placeholder="Ex: 7ème A" required value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="input-label">Niveau d'étude</label>
                <select className="input-field" required value={formData.niveau} onChange={e => setFormData({ ...formData, niveau: e.target.value })}>
                  <option value="7ème année de base">7ème année de base</option>
                  <option value="8ème année de base">8ème année de base</option>
                  <option value="9ème année de base">9ème année de base</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="input-label">Année Scolaire</label>
                <input type="text" className="input-field" required value={formData.anneeScolaire} onChange={e => setFormData({ ...formData, anneeScolaire: e.target.value })} />
              </div>
              <div className="flex justify-end gap-3 text-sm">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">Annuler</button>
                <button type="submit" className="btn btn-primary">{isEditing ? 'Mettre à jour' : 'Créer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null);
  const [allEleves, setAllEleves] = useState([]);
  const [allProfs, setAllProfs] = useState([]);
  const [selectedEleveId, setSelectedEleveId] = useState('');
  const [newSeance, setNewSeance] = useState({ jour: 'Lundi', heureDebut: '08:00', heureFin: '10:00', matiere: '', professeur: '', salle: '' });

  const fetchDetails = () => {
    fetch('http://localhost:5000/api/classes')
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => c._id === id);
        if (found) setCls(found);
      });

    fetch('http://localhost:5000/api/auth/users')
      .then(res => res.json())
      .then(data => {
        const extractedEleves = [];
        const extractedProfs = [];
        data.forEach(user => {
          if (user.role === 'parent' && user.enfants) extractedEleves.push(...user.enfants);
          if (user.role === 'professeur' || user.role === 'prof') extractedProfs.push(user);
        });
        setAllEleves(extractedEleves);
        setAllProfs(extractedProfs);
      });
  };

  useEffect(() => { fetchDetails(); }, [id]);

  const handleAjouterEleve = async (e) => {
    e.preventDefault();
    if (!selectedEleveId) return;
    try {
      const res = await fetch(`http://localhost:5000/api/classes/${id}/eleves`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eleveId: selectedEleveId })
      });
      if (res.ok) {
        setSelectedEleveId('');
        fetchDetails();
      }
    } catch (err) { alert("Erreur ajout élève"); }
  };

  const handleRetirerEleve = async (eleveId) => {
    if (!window.confirm("Voulez-vous vraiment retirer cet élève de cette classe ?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/classes/${id}/eleves/${eleveId}`, { method: 'DELETE' });
      if (res.ok) fetchDetails();
    } catch (err) { alert("Erreur retrait élève"); }
  };

  const handleAddSeance = async (e) => {
    e.preventDefault();
    if (!newSeance.matiere || !newSeance.professeur) return alert("Veuillez remplir tous les champs, y compris le professeur.");
    const currentSchedule = cls.emploiDuTemps || [];
    const updatedSchedule = [...currentSchedule, newSeance];

    try {
      const res = await fetch(`http://localhost:5000/api/classes/${id}/emploiDuTemps`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emploiDuTemps: updatedSchedule })
      });
      const data = await res.json();
      if (res.ok) {
        setNewSeance({ jour: 'Lundi', heureDebut: '08:00', heureFin: '10:00', matiere: '', professeur: '', salle: '' });
        fetchDetails();
      } else {
        alert("Erreur: " + data.message);
      }
    } catch (err) { alert("Erreur réseau: impossible de mettre à jour l'emploi du temps"); }
  };

  const handleRemoveSeance = async (idx) => {
    if (!window.confirm("Supprimer cette séance ?")) return;
    const updatedSchedule = [...(cls.emploiDuTemps || [])];
    updatedSchedule.splice(idx, 1);
    try {
      const res = await fetch(`http://localhost:5000/api/classes/${id}/emploiDuTemps`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emploiDuTemps: updatedSchedule })
      });
      if (res.ok) fetchDetails();
    } catch (err) { }
  };

  if (!cls) return <div className="p-8 text-center text-muted">Chargement des détails...</div>;

  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const emploiDuTempsGlobal = cls.emploiDuTemps || [];
  const allUniqueMatieres = Array.from(new Set(allProfs.flatMap(p => p.matieres || [])));

  return (
    <div>
      <div className="flex gap-4 items-center mb-8">
        <button onClick={() => navigate(-1)} className="btn btn-outline px-4 py-2 text-sm">← Retour</button>
        <div>
          <h1 className="text-4xl font-bold mb-1 text-primary">{cls.nom}</h1>
          <p className="text-muted">{cls.niveau} • Année {cls.anneeScolaire}</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Section Emploi du Temps (Full Width) */}
        <div className="card">
          <div className="flex justify-between items-center mb-6 border-b pb-4 shrink-0">
            <h2 className="text-2xl font-bold text-primary flex items-center"><Clock size={24} className="mr-2" /> Emploi du Temps</h2>
          </div>

          {emploiDuTempsGlobal.length === 0 ? (
            <p className="text-muted italic text-center py-8">L'emploi du temps n'est pas encore configuré pour cette classe.</p>
          ) : (
            <div className="grid grid-cols-6 gap-4">
              {jours.map(jour => {
                const seances = emploiDuTempsGlobal.filter(s => s.jour === jour).sort((a, b) => a.heureDebut.localeCompare(b.heureDebut));
                return (
                  <div key={jour} className="flex flex-col h-full">
                    <div className="font-bold text-center text-sm bg-primary text-white py-2 px-3 rounded-t uppercase">{jour}</div>
                    <div className="border border-t-0 p-3 flex-col flex gap-3 flex-1 rounded-b" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--background)' }}>
                      {seances.length === 0 && <div className="text-center text-xs text-muted py-4 italic">Heure creuse</div>}
                      {seances.map((s, i) => {
                        const globalIndex = emploiDuTempsGlobal.findIndex(gs => gs === s);
                        return (
                          <div key={i} className="text-sm flex flex-col group p-2 rounded bg-white relative shadow-sm border" style={{ borderColor: 'var(--border-color)' }}>
                            <button onClick={() => handleRemoveSeance(globalIndex)} className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all text-xs" title="Supprimer la séance">✖</button>
                            <div className="font-bold text-secondary text-xs mb-1 mb-1">{s.heureDebut} - {s.heureFin}</div>
                            <div className="font-bold text-primary leading-tight mb-2">{s.matiere}</div>
                            <div className="text-xs text-muted flex flex-col gap-1 mt-auto">
                              <div className="flex items-center gap-1 truncate"><UserPlus size={12} className="shrink-0" /> <span>{s.professeur && typeof s.professeur === 'object' ? s.professeur.nom : 'Inconnu'}</span></div>
                              <div className="bg-[#fdfaf5] border rounded px-1.5 py-0.5 inline-block w-fit font-bold mt-1 text-[10px]" style={{borderColor: '#e4d4b4'}}>Salle : {s.salle || 'À définir'}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <h3 className="font-bold text-primary mb-4 text-sm uppercase">Ajouter une nouvelle séance</h3>
            <form onSubmit={handleAddSeance} className="flex gap-3 items-end bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-inner">
              <div className="flex-[0.8]">
                <label className="input-label text-[11px] mb-1">Jour</label>
                <select className="input-field py-2 text-sm" value={newSeance.jour} onChange={e => setNewSeance({ ...newSeance, jour: e.target.value })}>
                  {jours.map(j => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>
              <div className="flex-[0.6]">
                <label className="input-label text-[11px] mb-1">Début (HH:MM)</label>
                <input type="time" className="input-field py-2 text-sm" required value={newSeance.heureDebut} onChange={e => setNewSeance({ ...newSeance, heureDebut: e.target.value })} />
              </div>
              <div className="flex-[0.6]">
                <label className="input-label text-[11px] mb-1">Fin (HH:MM)</label>
                <input type="time" className="input-field py-2 text-sm" required value={newSeance.heureFin} onChange={e => setNewSeance({ ...newSeance, heureFin: e.target.value })} />
              </div>
              <div className="flex-[0.5]">
                <label className="input-label text-[11px] mb-1">Salle</label>
                <input type="text" className="input-field py-2 text-sm" placeholder="Ex: S1" required value={newSeance.salle} onChange={e => setNewSeance({ ...newSeance, salle: e.target.value })} />
              </div>
              <div className="flex-[1]">
                <label className="input-label text-[11px] mb-1">Matière</label>
                <select className="input-field py-2 text-sm" required value={newSeance.matiere} onChange={e => setNewSeance({ ...newSeance, matiere: e.target.value, professeur: '' })}>
                  <option value="">-- Sélectionnez --</option>
                  {OFFICIAL_SUBJECTS.map((m, idx) => (
                    <option key={idx} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="flex-[1.2]">
                <label className="input-label text-[11px] mb-1">Professeur Assigné</label>
                <select className="input-field py-2 text-sm truncate" required disabled={!newSeance.matiere} value={newSeance.professeur} onChange={e => setNewSeance({ ...newSeance, professeur: e.target.value })}>
                  <option value="">-- Sélectionnez un prof --</option>
                  {allProfs.filter(p => (p.matieres || []).includes(newSeance.matiere)).map(p => (
                    <option key={p._id} value={p._id}>{p.nom}</option>
                  ))}
                </select>
              </div>
              <div>
                <button type="submit" className="btn btn-secondary py-2 text-sm whitespace-nowrap">Intégrer</button>
              </div>
            </form>
          </div>
        </div>

        {/* Section Liste des élèves */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6 text-primary flex items-center"><Users size={24} className="mr-2" /> Trombinoscope & Élèves inscrits</h2>

          <form onSubmit={handleAjouterEleve} className="flex gap-4 mb-8 p-4 rounded-xl" style={{ backgroundColor: '#fdfaf5', border: '1px dashed var(--secondary)' }}>
            <select className="input-field flex-1" style={{ backgroundColor: 'white' }} value={selectedEleveId} onChange={e => setSelectedEleveId(e.target.value)}>
              <option value="">-- Sélectionnez un élève de l'établissement à intégrer --</option>
              {allEleves.filter(el => !(cls.eleves || []).find(ce => ce._id === el._id)).map(el => (
                <option key={el._id} value={el._id}>{el.nom} (ID: {el.identifiant})</option>
              ))}
            </select>
            <button type="submit" className="btn btn-secondary whitespace-nowrap">Intégrer l'élève</button>
          </form>

          <div className="grid grid-cols-3 gap-4">
            {(!cls.eleves || cls.eleves.length === 0) && (
              <div className="col-span-3 py-12 text-center text-muted italic">Aucun élève inscrit dans cette classe pour le moment.</div>
            )}
            {cls.eleves && cls.eleves.map(eleve => (
              <div key={eleve._id} className="flex items-center gap-4 p-4 rounded-lg hover:shadow-md transition-shadow bg-white" style={{ border: '1px solid var(--border-color)' }}>
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shrink-0">
                  {eleve.nom.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-primary truncate" title={eleve.nom}>{eleve.nom}</div>
                  <div className="text-xs text-muted font-mono">{eleve.identifiant}</div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button className="text-[10px] uppercase font-bold bg-white text-primary border border-primary px-2 py-1 rounded hover:bg-primary hover:text-white transition-colors">Dossier</button>
                  <button onClick={() => handleRetirerEleve(eleve._id)} className="text-[10px] uppercase font-bold bg-white text-red-500 border border-red-200 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition-colors">Retirer</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

function ContactPage() {
  return (
    <div className="container py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--primary)' }}>Contactez-nous</h1>
        <p className="text-xl text-muted">L'équipe du Collège Excellence School est à votre disposition.</p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Nos Coordonnées</h2>
          <div className="flex-col flex gap-8">
            <div className="flex items-center gap-4">
              <div className="text-secondary"><BookOpen size={32} /></div>
              <div>
                <div className="font-bold text-lg">Adresse</div>
                <div className="text-muted">Rue El Nésri (Églantiers) , Monastir, Tunisia</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-secondary"><Phone size={32} /></div>
              <div>
                <div className="font-bold text-lg">Téléphone</div>
                <div className="text-muted">73 442 221</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-secondary"><MessageSquare size={32} /></div>
              <div>
                <div className="font-bold text-lg">Email</div>
                <div className="text-muted">excellenceschoolmonastir2026@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Envoyer un message</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group mb-4">
              <label className="input-label">Nom complet</label>
              <input type="text" className="input-field" placeholder="Votre nom" />
            </div>
            <div className="input-group mb-4">
              <label className="input-label">Email / Téléphone</label>
              <input type="text" className="input-field" placeholder="Vos coordonnées" />
            </div>
            <div className="input-group mb-4">
              <label className="input-label">Message</label>
              <textarea className="input-field" rows="4" placeholder="Votre demande..."></textarea>
            </div>
            <button className="btn btn-primary w-full py-3">Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function DashboardDossiersEnfants() {
  const userText = localStorage.getItem('lycee_user');
  const user = userText ? JSON.parse(userText) : null;
  const [enfants, setEnfants] = useState([]);
  const [planningData, setPlanningData] = useState(null);
  const [bulletinData, setBulletinData] = useState(null);
  const [suiviData, setSuiviData] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEnfant, setNewEnfant] = useState({ prenom: '', nom: '', email: '', niveauEtude: '7ème année de base', motDePasse: '' });
  const [createMsg, setCreateMsg] = useState('');

  const [editingEnfant, setEditingEnfant] = useState(null);
  const [editFormData, setEditFormData] = useState({ prenom: '', nom: '', email: '', niveauEtude: '7ème année de base', motDePasse: '' });
  const [editMsg, setEditMsg] = useState('');

  const handleOpenEditModal = (enfant) => {
    // Si l'élève a nom sous forme "Prenom Nom"
    let prenom = enfant.prenom || '';
    let nom = enfant.nom || '';
    if (!prenom && nom.includes(' ')) {
      const parts = nom.split(' ');
      prenom = parts[0];
      nom = parts.slice(1).join(' ');
    }
    setEditingEnfant(enfant);
    setEditFormData({
      prenom: prenom,
      nom: nom,
      email: enfant.email || '',
      niveauEtude: enfant.niveauEtude || '7ème année de base',
      motDePasse: ''
    });
    setEditMsg('');
  };

  const handleUpdateEnfant = async (e) => {
    e.preventDefault();
    if (!editingEnfant) return;
    try {
      const res = await fetch(`http://localhost:5000/api/auth/users/${editingEnfant._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData)
      });
      const data = await res.json();
      if (res.ok) {
        const updatedChild = data.eleve || data.user;
        if (updatedChild) {
          setEnfants(enfants.map(e => e._id === editingEnfant._id ? updatedChild : e));
        }
        setEditMsg("Dossier enfant modifié avec succès !");
        setTimeout(() => {
          setEditingEnfant(null);
          setEditMsg('');
        }, 1200);
      } else {
        alert(data.message || "Erreur lors de la modification");
      }
    } catch(err) {
      alert("Erreur réseau : " + err.message);
    }
  };

  const handleCreateEnfant = async (e) => {
    e.preventDefault();
    if (!user || !user._id) {
       alert("Oups: Votre profil n'est pas complètement chargé (Identifiant unique manquant). Veuillez vous déconnecter et vous reconnecter.");
       return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/auth/users/${user._id}/create-enfant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEnfant)
      });
      const textData = await res.text();
      let data;
      try {
        data = JSON.parse(textData);
      } catch (parseErr) {
        alert("Attention: Le serveur ne reconnait pas la nouvelle fonctionnalité.");
        return;
      }
      
      if (res.ok) {
        setCreateMsg(`Succès ! Profil enfant créé. Conservez précieusement son identifiant de connexion : ${data.eleve.identifiant}`);
        setEnfants([...enfants, data.eleve]);
        setNewEnfant({ prenom: '', nom: '', email: '', niveauEtude: '7ème année de base', motDePasse: '' });
      } else {
        alert(data.message || "Erreur serveur : " + res.status);
      }
    } catch(err) {
      alert("Erreur réseau ou connexion serveur impossible : " + err.message);
    }
  };

  const fetchEnfants = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5000/api/auth/users/${user._id}/enfants`);
      const data = await res.json();
      if (res.ok) setEnfants(data);
    } catch(err) { console.error(err); }
  };

  useEffect(() => { fetchEnfants(); }, []);

  const handleViewBulletin = async (enfant) => {
    setPlanningData(null);
    setSuiviData(null);
    try {
      const res = await fetch(`http://localhost:5000/api/classes/eleve/${enfant._id}/planning`);
      const data = await res.json();
      const className = res.ok ? data.className : "INCONNUE";
      setBulletinData({ eleve: enfant, className, emploiDuTemps: data.emploiDuTemps });
    } catch {
      setBulletinData({ eleve: enfant, className: "INCONNUE" });
    }
  };

  const handleViewPlanning = async (enfant) => {
    setBulletinData(null);
    setSuiviData(null);
    try {
      const res = await fetch(`http://localhost:5000/api/classes/eleve/${enfant._id}/planning`);
      const data = await res.json();
      if (res.ok) {
        setPlanningData({ eleve: enfant, className: data.className, emploiDuTemps: data.emploiDuTemps });
      } else {
        alert(data.message);
      }
    } catch(err) { alert("Erreur lors de la récupération du planning"); }
  };

  const handleViewSuivi = async (enfant) => {
    setPlanningData(null);
    setBulletinData(null);
    try {
      const res = await fetch(`http://localhost:5000/api/classes/suivi/eleve/${enfant._id}`);
      const list = res.ok ? await res.json() : [];
      setSuiviData({
        ...enfant,
        absences: list.filter(item => item.etat === 'Absent' || item.etat === 'Retard'),
        exclusions: list.filter(item => item.etat === 'Exclu'),
        remarques: list.filter(item => item.etat === 'Remarque')
      });
    } catch(err) {
      setSuiviData({ ...enfant, absences:[], exclusions:[], remarques:[] });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-primary flex items-center"><Heart className="mr-3" size={32} /> Dossiers Enfants</h1>
          <p className="text-muted">Consultez et créez les dossiers scolaires de vos enfants.</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary"><UserPlus size={18} className="mr-2" /> Créer un compte enfant</button>
      </div>

      {showAddForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4 text-primary">Nouveau dossier élève</h2>
          {createMsg && <div className="p-4 mb-4 text-green-800 rounded font-bold" style={{backgroundColor: '#dcfce7'}}>{createMsg}</div>}
          <form onSubmit={handleCreateEnfant} className="grid grid-cols-2 gap-4">
            <div className="input-group">
              <label className="input-label">Prénom de l'enfant</label>
              <input type="text" className="input-field" required value={newEnfant.prenom} onChange={e => setNewEnfant({...newEnfant, prenom: e.target.value})} placeholder="Ex: Ahmed" />
            </div>
            <div className="input-group">
              <label className="input-label">Nom de l'enfant</label>
              <input type="text" className="input-field" required value={newEnfant.nom} onChange={e => setNewEnfant({...newEnfant, nom: e.target.value})} placeholder="Ex: Ben Ali" />
            </div>
            <div className="input-group">
              <label className="input-label">Niveau d'étude</label>
              <select className="input-field" value={newEnfant.niveauEtude} onChange={e => setNewEnfant({...newEnfant, niveauEtude: e.target.value})}>
                <option value="7ème année de base">7ème année de base</option>
                <option value="8ème année de base">8ème année de base</option>
                <option value="9ème année de base">9ème année de base</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Email de l'enfant (optionnel)</label>
              <input type="email" className="input-field" value={newEnfant.email} onChange={e => setNewEnfant({...newEnfant, email: e.target.value})} placeholder="Ex: ahmed.benali@gmail.com" />
            </div>
            <div className="input-group col-span-2">
              <label className="input-label">Mot de passe pour l'enfant (min 6 car.)</label>
              <input type="password" className="input-field" required minLength="6" value={newEnfant.motDePasse} onChange={e => setNewEnfant({...newEnfant, motDePasse: e.target.value})} placeholder="••••••••" />
            </div>
            <div className="col-span-2 mt-2">
              <button type="submit" className="btn btn-secondary">Enregistrer l'enfant</button>
              <button type="button" onClick={() => { setShowAddForm(false); setCreateMsg(''); }} className="btn btn-outline ml-4">Fermer</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL DE MODIFICATION DU DOSSIER ENFANT */}
      {editingEnfant && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h2 className="text-xl font-bold text-primary flex items-center"><Edit size={20} className="mr-2" /> Modifier le dossier : {editingEnfant.nom}</h2>
              <button onClick={() => setEditingEnfant(null)} className="text-gray-400 hover:text-gray-800"><X size={24} /></button>
            </div>
            {editMsg && <div className="p-3 mb-4 text-green-800 rounded font-bold text-sm bg-green-100">{editMsg}</div>}
            <form onSubmit={handleUpdateEnfant} className="grid grid-cols-2 gap-4">
              <div className="input-group">
                <label className="input-label">Prénom de l'enfant</label>
                <input type="text" className="input-field" required value={editFormData.prenom} onChange={e => setEditFormData({...editFormData, prenom: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Nom de l'enfant</label>
                <input type="text" className="input-field" required value={editFormData.nom} onChange={e => setEditFormData({...editFormData, nom: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Niveau d'étude</label>
                <select className="input-field" value={editFormData.niveauEtude} onChange={e => setEditFormData({...editFormData, niveauEtude: e.target.value})}>
                  <option value="7ème année de base">7ème année de base</option>
                  <option value="8ème année de base">8ème année de base</option>
                  <option value="9ème année de base">9ème année de base</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Email (optionnel)</label>
                <input type="email" className="input-field" value={editFormData.email} onChange={e => setEditFormData({...editFormData, email: e.target.value})} placeholder="Ex: eleve@gmail.com" />
              </div>
              <div className="input-group col-span-2">
                <label className="input-label">Nouveau mot de passe (laisser vide pour ne pas changer)</label>
                <input type="password" className="input-field" minLength="6" value={editFormData.motDePasse} onChange={e => setEditFormData({...editFormData, motDePasse: e.target.value})} placeholder="Nouveau mot de passe..." />
              </div>
              <div className="col-span-2 mt-4 flex justify-end gap-3 border-t pt-4">
                <button type="button" onClick={() => setEditingEnfant(null)} className="btn btn-outline">Annuler</button>
                <button type="submit" className="btn btn-secondary">Enregistrer les modifications</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <div>
          {enfants.length === 0 ? (
            <div className="card text-center py-12 text-muted italic">
              Aucun enfant n'est actuellement rattaché à votre compte. Vous pouvez en créer un ci-dessus.
            </div>
          ) : (
            <div className="grid gap-4">
              {enfants.map(enfant => (
                <div key={enfant._id} className="card flex items-center gap-6" style={{ borderLeft: '4px solid var(--secondary)' }}>
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl shrink-0">
                    {(enfant.nom || 'E').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary mb-1">{enfant.nom || 'Élève'}</div>
                    <div className="text-muted flex gap-4 text-sm">
                      <span className="flex items-center"><span className="font-bold mr-1">ID:</span> {enfant.identifiant}</span>
                      <span className="flex items-center"><span className="font-bold mr-1">Niveau:</span> {enfant.niveauEtude || 'Non défini'}</span>
                      {enfant.email && <span className="flex items-center"><span className="font-bold mr-1">Email:</span> {enfant.email}</span>}
                    </div>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button onClick={() => handleOpenEditModal(enfant)} className="btn py-2 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 font-bold shadow-sm"><Edit size={16} className="mr-2"/>Modifier</button>
                    <button onClick={() => handleViewSuivi(enfant)} className="btn py-2 bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 font-bold shadow-sm"><ShieldCheck size={16} className="mr-2"/>Absences & Suivi</button>
                    <button onClick={() => handleViewPlanning(enfant)} className="btn btn-secondary py-2"><Clock size={16} className="mr-2"/>Planning</button>
                    <button onClick={() => handleViewBulletin(enfant)} className="btn btn-outline py-2"><FileText size={16} className="mr-2"/>Bulletin</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {planningData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-blue-50 p-6 border-b flex justify-between items-center" style={{borderColor: 'var(--border-color)'}}>
              <div>
                <h2 className="text-2xl font-bold text-primary flex items-center"><Clock className="mr-2" /> Emploi du Temps : {planningData.eleve.nom}</h2>
                <div className="text-sm font-bold text-secondary mt-1">Classe : {planningData.className}</div>
              </div>
              <button onClick={() => setPlanningData(null)} className="text-gray-400 hover:text-gray-800 transition-colors"><X size={28}/></button>
            </div>
            <div className="p-6 overflow-y-auto w-full">
              {planningData.emploiDuTemps.length === 0 ? (
                <p className="text-center italic text-muted py-8">Aucun emploi du temps n'est encore configuré pour cette classe.</p>
              ) : (
                <div className="grid grid-cols-6 gap-4">
                  {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map(jour => {
                    const seances = planningData.emploiDuTemps.filter(s => s.jour === jour).sort((a,b) => a.heureDebut.localeCompare(b.heureDebut));
                    return (
                      <div key={jour} className="flex flex-col h-full">
                        <div className="font-bold text-center text-sm bg-primary text-white py-2 px-3 rounded-t uppercase">{jour}</div>
                        <div className="border border-t-0 p-3 flex-col flex gap-3 flex-1 rounded-b" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--background)'}}>
                          {seances.length === 0 && <div className="text-center text-xs text-muted py-4 italic">-</div>}
                          {seances.map((s,i) => (
                            <div key={i} className="text-sm flex flex-col p-2 rounded bg-white relative shadow-sm border border-gray-100">
                               <div className="font-bold text-secondary text-[11px] mb-1">{s.heureDebut} - {s.heureFin}</div>
                               <div className="font-bold text-primary leading-tight mb-2">{s.matiere}</div>
                               <div className="text-[10px] text-muted flex flex-col gap-1 mt-auto">
                                 <div className="flex items-center gap-1 truncate"><Users size={10} className="shrink-0" /> {s.professeur?.nom || 'Inconnu'}</div>
                                 <div className="bg-[#fdfaf5] border rounded px-1.5 py-0.5 inline-block w-fit font-bold mt-1" style={{borderColor: '#e4d4b4'}}>Salle : {s.salle || 'À définir'}</div>
                               </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <BulletinModal bulletinData={bulletinData} onClose={() => setBulletinData(null)} />

      {suiviData && (
        <div className="fixed inset-0 bg-black/50 z-[70] flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-indigo-50 p-6 border-b flex justify-between items-center" style={{borderColor: 'var(--border-color)'}}>
              <div>
                <h2 className="text-2xl font-bold text-indigo-900 flex items-center"><ShieldCheck className="mr-2" /> Dossier d'Absences et de Suivi : {suiviData.nom}</h2>
                <div className="text-sm font-bold text-indigo-700 mt-1">Matricule : {suiviData.identifiant}</div>
              </div>
              <button onClick={() => setSuiviData(null)} className="text-gray-400 hover:text-gray-800 transition-colors"><X size={28}/></button>
            </div>
            <div className="p-6 overflow-y-auto w-full grid grid-cols-1 gap-8 bg-gray-50/30">
              
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center border-b pb-2"><Calendar className="mr-2"/> Liste des Absences</h3>
                <div className="bg-gray-50 border rounded-lg overflow-hidden">
                  <table className="w-full text-left bg-white">
                    <thead className="bg-[#fdfaf5] border-b text-gray-700">
                      <tr><th className="p-3">Date</th><th className="p-3">Heure</th><th className="p-3">Matière</th><th className="p-3">Professeur</th></tr>
                    </thead>
                    <tbody>
                      {!suiviData.absences || suiviData.absences.length === 0 ? (
                        <tr><td colSpan="4" className="p-8 text-center text-muted italic">Félicitations, aucune absence n'est enregistrée pour le moment.</td></tr>
                      ) : (
                        suiviData.absences.map((rec, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-3">{rec.dateStr} {rec.etat === 'Retard' && <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold">Retard</span>}</td>
                            <td className="p-3">{rec.heure}</td>
                            <td className="p-3 font-bold">{rec.matiere}</td>
                            <td className="p-3">{rec.professeurNom}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center border-b pb-2"><UserX className="mr-2"/> Liste des Exclusions</h3>
                <div className="bg-gray-50 border rounded-lg overflow-hidden">
                  <table className="w-full text-left bg-white">
                    <thead className="bg-[#fdfaf5] border-b text-gray-700">
                      <tr><th className="p-3">Date</th><th className="p-3">Heure</th><th className="p-3">Matière</th><th className="p-3">Professeur</th></tr>
                    </thead>
                    <tbody>
                      {!suiviData.exclusions || suiviData.exclusions.length === 0 ? (
                        <tr><td colSpan="4" className="p-8 text-center text-muted italic">Aucune exclusion n'a été signalée pour cet élève.</td></tr>
                      ) : (
                        suiviData.exclusions.map((rec, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-3">{rec.dateStr}</td>
                            <td className="p-3">{rec.heure}</td>
                            <td className="p-3 font-bold">{rec.matiere}</td>
                            <td className="p-3">{rec.professeurNom}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center border-b pb-2"><MessageSquare className="mr-2"/> Notes et Remarques Disciplinaires</h3>
                <div className="bg-gray-50 border rounded-lg overflow-hidden">
                  <table className="w-full text-left bg-white">
                    <thead className="bg-[#fdfaf5] border-b text-gray-700">
                      <tr><th className="p-3 w-40">Date</th><th className="p-3 w-48">Auteur</th><th className="p-3">Remarque / Note</th></tr>
                    </thead>
                    <tbody>
                      {!suiviData.remarques || suiviData.remarques.length === 0 ? (
                        <tr><td colSpan="3" className="p-8 text-center text-muted italic">Le dossier comportemental de l'élève est vierge.</td></tr>
                      ) : (
                        suiviData.remarques.map((rec, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-3">{rec.dateStr}</td>
                            <td className="p-3 font-bold">{rec.professeurNom}</td>
                            <td className="p-3">{rec.commentaire || 'Aucun commentaire'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function DashboardPresences() {
  const userText = localStorage.getItem('lycee_user');
  const user = userText ? JSON.parse(userText) : null;
  const isProf = user && (user.role === 'professeur' || user.role === 'prof');

  const [classes, setClasses] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({});

  const getDateForDay = (dayName) => {
    const jours = { 'Lundi': 1, 'Mardi': 2, 'Mercredi': 3, 'Jeudi': 4, 'Vendredi': 5, 'Samedi': 6, 'Dimanche': 0 };
    const targetDay = jours[dayName];
    if (targetDay === undefined) return new Date().toLocaleDateString('fr-FR');
    
    const today = new Date();
    const currentDay = today.getDay();
    const currentDayAdjusted = currentDay === 0 ? 7 : currentDay;
    const targetDayAdjusted = targetDay === 0 ? 7 : targetDay;
    
    const diff = targetDayAdjusted - currentDayAdjusted;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);
    
    return targetDate.toLocaleDateString('fr-FR');
  };

  const loadAttendance = async (session) => {
    if (!session) return;
    const dateStr = getDateForDay(session.jour);
    const profId = typeof session.professeur === 'object' ? session.professeur?._id : session.professeur;
    try {
      const res = await fetch(`http://localhost:5000/api/classes/suivi/search?dateStr=${dateStr}&heure=${session.heureDebut} - ${session.heureFin}&professeur=${profId}&matiere=${session.matiere}`);
      const data = await res.json();
      const attMap = {};
      session.classe.eleves.forEach(e => attMap[e._id] = 'Présent'); // default
      if (res.ok && data.length > 0) {
        data.forEach(record => {
          if (record.eleve) attMap[record.eleve] = record.etat;
        });
      }
      setAttendance(attMap);
    } catch (err) {
      console.error("Erreur chargement présences", err);
    }
  };

  const handleSelectSession = (s) => {
    setSelectedSession(s);
    if(s) loadAttendance(s);
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/classes')
      .then(res => res.json())
      .then(data => {
        setClasses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center text-muted">Chargement des données...</div>;

  const getSessions = () => {
    let sessions = [];
    const joursOrdre = { 'Lundi': 1, 'Mardi': 2, 'Mercredi': 3, 'Jeudi': 4, 'Vendredi': 5, 'Samedi': 6 };
    
    classes.forEach(cls => {
      if (cls.emploiDuTemps) {
        cls.emploiDuTemps.forEach(s => {
          const profId = typeof s.professeur === 'object' ? s.professeur?._id : s.professeur;
          if (isProf && profId !== user._id) return;
          sessions.push({ ...s, classe: cls, jourOrdre: joursOrdre[s.jour] || 7 });
        });
      }
    });
    
    return sessions.sort((a, b) => {
      if (a.jourOrdre !== b.jourOrdre) return a.jourOrdre - b.jourOrdre;
      return a.heureDebut.localeCompare(b.heureDebut);
    });
  };

  const allSessions = getSessions();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 text-primary flex items-center"><Users className="mr-3" size={32} /> Classes & Présences</h1>
      <p className="text-muted mb-8">Sélectionnez une séance pour faire l'appel et gérer les absences.</p>
      
      {!selectedSession ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {allSessions.map((seance, idx) => (
             <div onClick={() => handleSelectSession(seance)} key={idx} className="card hover:border-secondary cursor-pointer transition-colors border-t-4" style={{borderTopColor: 'var(--primary)'}}>
               <div className="flex justify-between items-start mb-2">
                 <h3 className="text-xl font-bold text-primary truncate" title={seance.classe.nom}>{seance.classe.nom}</h3>
                 <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded shrink-0">{seance.jour}</span>
               </div>
               <div className="text-muted font-bold mb-2">{seance.matiere}</div>
               <div className="text-muted text-sm flex items-center gap-2 mb-4"><Clock size={14}/> {seance.heureDebut} - {seance.heureFin}</div>
               <div className="text-xs font-bold text-secondary bg-[#fdfaf5] border border-[#e4d4b4] rounded p-1 inline-block">
                 {seance.classe.eleves?.length || 0} Élèves inscrits
               </div>
             </div>
           ))}
           {allSessions.length === 0 && <p className="text-muted col-span-3">Aucune séance n'est associée à votre profil pour le moment.</p>}
         </div>
      ) : (
        <div className="animate-fade-in-up">
          <button onClick={() => setSelectedSession(null)} className="btn btn-outline mb-6 text-sm py-2">← Retour aux séances</button>
          
          <div className="card shadow-lg" style={{borderLeft: '4px solid var(--secondary)'}}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-primary">Cahier d'Appel : {selectedSession.classe.nom}</h2>
                <div className="text-sm text-muted mt-1 font-bold">{selectedSession.matiere} • {selectedSession.heureDebut} à {selectedSession.heureFin}</div>
              </div>
              <div className="text-sm font-bold text-muted bg-gray-100 px-3 py-1 rounded border shadow-inner">
                Séance du {selectedSession.jour} ({getDateForDay(selectedSession.jour)})
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-2" style={{borderColor: 'var(--border-color)'}}>
                    <th className="py-3 px-2 font-bold text-primary">Nom & Prénom de l'élève</th>
                    <th className="py-3 px-2 font-bold text-primary text-center">Matricule</th>
                    <th className="py-3 px-2 font-bold text-primary text-center bg-gray-50 rounded-t">État de présence</th>
                  </tr>
                </thead>
                <tbody>
                  {!selectedSession.classe.eleves || selectedSession.classe.eleves.length === 0 ? (
                    <tr><td colSpan="3" className="py-8 text-center italic text-muted">Aucun élève inscrit dans cette classe.</td></tr>
                  ) : (
                    selectedSession.classe.eleves.map(eleve => (
                      <tr key={eleve._id} className="border-b border-gray-100 hover:bg-[#fdfaf5] transition-colors">
                        <td className="py-3 px-2 font-bold">{eleve.nom}</td>
                        <td className="py-3 px-2 text-muted text-sm font-mono text-center">{eleve.identifiant}</td>
                        <td className="py-3 px-2 bg-gray-50/50">
                          <div className="flex gap-4 justify-center">
                            {['Présent', 'Absent', 'Retard', 'Exclu'].map(etat => (
                              <label key={etat} className={`flex items-center gap-1 text-sm cursor-pointer font-bold ${etat==='Présent'?'hover:text-green-600':etat==='Absent'?'hover:text-red-500':etat==='Retard'?'hover:text-orange-500':'hover:text-purple-600'}`}>
                                <input type="radio" checked={attendance[eleve._id] === etat} onChange={() => setAttendance({...attendance, [eleve._id]: etat})} className={`w-4 h-4 cursor-pointer accent-${etat==='Présent'?'green-600':etat==='Absent'?'red-600':etat==='Retard'?'orange-500':'purple-600'}`} /> {etat}
                              </label>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {selectedSession.classe.eleves && selectedSession.classe.eleves.length > 0 && (
              <div className="mt-8 pt-4 border-t flex justify-end" style={{borderColor: 'var(--border-color)'}}>
                <button className="btn btn-primary shadow-md hover:shadow-lg transition-transform hover:-translate-y-1" onClick={async () => {
                  const dateStr = getDateForDay(selectedSession.jour);
                  const profId = typeof selectedSession.professeur === 'object' ? selectedSession.professeur?._id : selectedSession.professeur;
                  const records = selectedSession.classe.eleves.map(e => ({
                    eleve: e._id,
                    eleveNom: e.nom,
                    professeur: profId,
                    professeurNom: typeof selectedSession.professeur === 'object' ? selectedSession.professeur?.nom : (user ? user.nom : 'Admin'),
                    matiere: selectedSession.matiere,
                    heure: `${selectedSession.heureDebut} - ${selectedSession.heureFin}`,
                    etat: attendance[e._id] || 'Présent',
                    dateStr
                  }));
                  try {
                    await fetch('http://localhost:5000/api/classes/suivi', {
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify(records)
                    });
                    alert(`L'appel de la séance de ${selectedSession.matiere} (${selectedSession.classe.nom}) a été sauvegardé avec succès !`);
                    setSelectedSession(null);
                  } catch (err) {
                    alert("Erreur réseau: impossible d'enregistrer l'appel");
                  }
                }}>Confirmer et soumettre l'appel</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardPlanning() {
  const userText = localStorage.getItem('lycee_user');
  const user = userText ? JSON.parse(userText) : null;
  const isProf = user && (user.role === 'professeur' || user.role === 'prof');

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/classes')
      .then(res => res.json())
      .then(data => {
        setClasses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center text-muted">Chargement de l'emploi du temps...</div>;

  const getSessionsByDay = () => {
    let days = { 'Lundi': [], 'Mardi': [], 'Mercredi': [], 'Jeudi': [], 'Vendredi': [], 'Samedi': [] };
    
    classes.forEach(cls => {
      if (cls.emploiDuTemps) {
        cls.emploiDuTemps.forEach(s => {
          const profId = typeof s.professeur === 'object' ? s.professeur?._id : s.professeur;
          // Filter if prof
          if (isProf && profId !== user._id) return;
          
          // Filter if eleve (only show class the eleve is enrolled in)
          const isEleve = user && user.role === 'eleve';
          if (isEleve) {
            const isInClass = cls.eleves && cls.eleves.some(e => {
              const eId = typeof e === 'object' ? e._id : e;
              return String(eId) === String(user._id);
            });
            if (!isInClass) return;
          }

          if (days[s.jour]) {
            days[s.jour].push({ ...s, classe: cls });
          }
        });
      }
    });

    Object.keys(days).forEach(j => {
      days[j].sort((a,b) => a.heureDebut.localeCompare(b.heureDebut));
    });

    return days;
  };

  const schedule = getSessionsByDay();
  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-4xl font-bold mb-2 text-primary flex items-center"><Clock className="mr-3" size={32} /> Mon Emploi du Temps</h1>
           <p className="text-muted">Consultez vos horaires de cours de la semaine par date, matière et salle.</p>
        </div>
      </div>
      
      <div className="card p-0 overflow-hidden border-t-4" style={{borderTopColor: 'var(--secondary)'}}>
        <div className="overflow-x-auto">
           <table className="w-full text-center border-collapse min-w-[900px]">
             <thead>
               <tr>
                 {jours.map(j => <th key={j} className="border p-3 bg-primary text-white font-bold w-1/6" style={{borderColor: 'var(--border-color)'}}>{j}</th>)}
               </tr>
             </thead>
             <tbody>
               <tr>
                 {jours.map(jour => {
                   const seances = schedule[jour];
                   return (
                     <td key={jour} className="border align-top p-2 bg-gray-50/50" style={{borderColor: 'var(--border-color)', height: '400px', minWidth: '150px'}}>
                       {seances.length === 0 ? (
                         <div className="text-muted italic text-xs py-10 opacity-60">Aucun cours</div>
                       ) : (
                         <div className="flex flex-col gap-3">
                           {seances.map((s, idx) => (
                             <div key={idx} className="bg-white border rounded shadow-sm p-3 text-left hover:shadow-md transition-shadow relative overflow-hidden group" style={{borderColor: '#e4d4b4'}}>
                               <div className="absolute top-0 left-0 w-1 h-full bg-secondary transition-all group-hover:w-2"></div>
                               <div className="text-xs font-bold text-gray-500 mb-1 flex items-center"><Clock size={12} className="mr-1"/> {s.heureDebut} - {s.heureFin}</div>
                               <div className="font-bold text-primary mb-1 truncate" title={s.classe.nom}>{s.classe.nom}</div>
                               <div className="text-sm font-bold text-secondary my-1 truncate" title={s.matiere}>{s.matiere}</div>
                               <div className="text-[10px] text-muted flex items-center bg-[#fdfaf5] border rounded px-1.5 py-0.5 inline-block w-fit mt-1" style={{borderColor: '#e4d4b4'}}>
                                 Salle : {s.salle || 'À définir'}
                               </div>
                             </div>
                           ))}
                         </div>
                       )}
                     </td>
                   );
                 })}
               </tr>
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}

function DashboardMessagerie() {
  const userText = localStorage.getItem('lycee_user');
  const currentUser = userText ? JSON.parse(userText) : null;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/messages/utilisateurs')
      .then(r => r.json())
      .then(data => setUsers(data.filter(u => u._id !== currentUser?._id)));
  }, []);

  const loadMessages = (otherUserId) => {
    if (!currentUser) return;
    fetch(`http://localhost:5000/api/messages/${currentUser._id}/conversation/${otherUserId}`)
      .then(r => r.json())
      .then(data => setMessages(data));
  };

  useEffect(() => {
    if (selectedUser) {
      loadMessages(selectedUser._id);
      const interval = setInterval(() => loadMessages(selectedUser._id), 3000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    try {
      await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expediteur: currentUser._id,
          destinataire: selectedUser._id,
          contenu: messageText
        })
      });
      setMessageText("");
      loadMessages(selectedUser._id);
    } catch(err) {
      console.error(err);
    }
  };

  const msStyles = {
    container: { display: 'flex', height: 'calc(100vh - 100px)', backgroundColor: '#fafafa', borderRadius: '4px', border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' },
    sidebar: { width: '320px', backgroundColor: '#fff', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' },
    sidebarHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 10px', backgroundColor: '#fff' },
    sidebarHeaderTabs: { display: 'flex', gap: '20px' },
    tabActive: { color: '#3498db', fontWeight: 'bold', borderBottom: '2px solid #3498db', paddingBottom: '5px', background: 'none', border: 'none', cursor: 'pointer', borderTop: 'none', borderLeft: 'none', borderRight: 'none' },
    tabInactive: { color: '#bbb', fontWeight: 'bold', paddingBottom: '5px', background: 'none', border: 'none', cursor: 'pointer' },
    searchBar: { display: 'flex', padding: '10px 24px', backgroundColor: '#fff' },
    searchInput: { flex: 1, padding: '8px 12px', border: '1px solid #e5e5e5', borderRadius: '4px', outline: 'none', fontSize: '13px', backgroundColor: '#fcfcfc' },
    userList: { flex: 1, overflowY: 'auto' },
    userItem: (isActive) => ({ display: 'flex', padding: '16px 24px', cursor: 'pointer', backgroundColor: isActive ? '#f8fdfa' : '#fff', alignItems: 'center', gap: '16px', transition: 'background 0.2s' }),
    avatarWrapper: { position: 'relative', width: '44px', height: '44px' },
    avatar: { width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#f0f4f8', color: '#555', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', overflow: 'hidden' },
    avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
    statusDot: { position: 'absolute', top: '2px', right: '0px', width: '10px', height: '10px', backgroundColor: '#34d08c', borderRadius: '50%', border: '2px solid #fff' },
    userContent: { flex: 1, minWidth: 0 },
    userTopLine: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' },
    userName: { fontWeight: 'bold', color: '#333', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    userTime: { fontSize: '11px', color: '#bbb' },
    userSubLine: { fontSize: '12px', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    chatArea: { flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fcfcfc' },
    chatHeader: { padding: '16px 32px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' },
    chatTitle: { fontWeight: 'bold', color: '#333', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' },
    chatIcons: { display: 'flex', gap: '16px', color: '#b0b0b0' },
    messagesView: { flex: 1, padding: '32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' },
    messageRow: (isMe) => ({ display: 'flex', gap: '16px', justifyContent: isMe ? 'flex-end' : 'flex-start', alignItems: 'center', width: '100%', marginBottom: '10px' }),
    msgAvatar: { width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#666', border: '1px solid #eee', overflow: 'hidden' },
    msgBubble: (isMe) => ({ padding: '12px 20px', borderRadius: '30px', backgroundColor: isMe ? '#3498db' : '#fff', color: isMe ? '#fff' : '#555', maxWidth: '65%', borderTopLeftRadius: isMe ? '30px' : '4px', borderBottomRightRadius: isMe ? '4px' : '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', fontSize: '14px', lineHeight: '1.4', border: isMe ? 'none' : '1px solid #eaebec' }),
    inputForm: { padding: '24px 32px', backgroundColor: '#fcfcfc', display: 'flex', justifyContent: 'center' },
    inputWrap: { display: 'flex', alignItems: 'center', width: '100%', maxWidth: '900px', backgroundColor: '#fff', border: '1px solid #eaebec', borderRadius: '30px', padding: '6px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
    inputBox: { flex: 1, border: 'none', padding: '10px 12px', outline: 'none', backgroundColor: 'transparent', fontSize: '14px', color: '#555' },
    sendBtn: { backgroundColor: '#3498db', color: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s' }
  };

  return (
    <div style={msStyles.container}>
      {/* Sidebar */}
      <div style={msStyles.sidebar}>
         <div style={msStyles.sidebarHeader}>
           <div style={msStyles.sidebarHeaderTabs}>
               <button style={msStyles.tabActive}>Chat</button>
               <button style={msStyles.tabInactive}>NEW</button>
           </div>
           <div style={{color: '#999'}} >
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
           </div>
         </div>
         <div style={msStyles.searchBar}>
           <input type="text" placeholder="Filter..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={msStyles.searchInput} />
         </div>
         <div style={msStyles.userList}>
           {users.filter(u => u.nom.toLowerCase().includes(searchQuery.toLowerCase()) || u.role.toLowerCase().includes(searchQuery.toLowerCase())).map(u => (
             <div onClick={() => setSelectedUser(u)} key={u._id} style={msStyles.userItem(selectedUser?._id === u._id)}>
               <div style={msStyles.avatarWrapper}>
                 <div style={msStyles.avatar}>
                   {u.photoProfil ? <img src={u.photoProfil} alt="Avatar" style={msStyles.avatarImg} /> : u.nom.charAt(0).toUpperCase()}
                 </div>
                 {u.isOnline && <div style={msStyles.statusDot}></div>}
               </div>
               <div style={msStyles.userContent}>
                 <div style={msStyles.userTopLine}>
                   <div style={msStyles.userName} className="capitalize">{u.nom}</div>
                   <div style={msStyles.userTime}>2 min</div>
                 </div>
                 <div style={msStyles.userSubLine} className="capitalize">{u.role}</div>
               </div>
             </div>
           ))}
           {users.length === 0 && <div style={{padding: '30px', textAlign: 'center', color: '#aaa', fontStyle: 'italic', fontSize: '14px'}}>Loading...</div>}
         </div>
      </div>
      
      {/* Chat Area */}
      <div style={msStyles.chatArea}>
        {!selectedUser ? (
           <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc'}}>
             <MessageSquare size={48} style={{opacity: 0.3, marginBottom: '20px'}} />
             <p style={{fontSize: '15px', color: '#888'}}>Sélectionnez une conversation</p>
           </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            {/* Chat Header */}
            <div style={msStyles.chatHeader}>
              <div style={msStyles.chatTitle}>
                <div style={{...msStyles.msgAvatar, width: '32px', height: '32px'}}>
                  {selectedUser.photoProfil ? <img src={selectedUser.photoProfil} alt="Avatar" style={msStyles.avatarImg} /> : selectedUser.nom.charAt(0).toUpperCase()}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                    <span className="capitalize">{selectedUser.nom}</span>
                    {selectedUser.isOnline && <span style={{width: '6px', height: '6px', backgroundColor: '#34d08c', borderRadius: '50%', display: 'inline-block'}}></span>}
                  </div>
                  <span style={{fontSize: '11px', color: '#999', fontWeight: 'normal'}}>
                    {selectedUser.isOnline ? 'En ligne' : 'Déconnecté(e)'}
                  </span>
                </div>
              </div>
              <div style={msStyles.chatIcons}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1.5"></circle><circle cx="12" cy="5" r="1.5"></circle><circle cx="12" cy="19" r="1.5"></circle></svg>
              </div>
            </div>
            
            {/* Messages View */}
            <div style={msStyles.messagesView}>
              {messages.length === 0 && <div style={{textAlign: 'center', marginTop: 'auto', marginBottom: 'auto'}}><span style={{color: '#999', fontSize: '13px'}}>Début de la conversation</span></div>}
              
              {messages.map((msg, index) => {
                const isMe = msg.expediteur === currentUser._id;
                return (
                  <div key={msg._id || index} style={msStyles.messageRow(isMe)}>
                    {!isMe && (
                      <div style={msStyles.msgAvatar}>
                        {selectedUser.photoProfil ? <img src={selectedUser.photoProfil} alt="Avatar" style={msStyles.avatarImg} /> : selectedUser.nom.charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    <div style={msStyles.msgBubble(isMe)}>
                       <span style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>{msg.contenu}</span>
                    </div>

                    {isMe && (
                      <div style={msStyles.msgAvatar}>
                        {currentUser.nom.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={sendMessage} style={msStyles.inputForm}>
              <div style={msStyles.inputWrap}>
                <input type="text" value={messageText} onChange={e => setMessageText(e.target.value)} placeholder="Type your message ..." style={msStyles.inputBox} />
                <button type="button" style={{color: '#aaa', border: 'none', background: 'none', cursor: 'pointer', padding: '0 10px'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                </button>
                <button type="submit" disabled={!messageText.trim()} style={{...msStyles.sendBtn, opacity: !messageText.trim() ? 0.5 : 1}}>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '2px'}}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddClub, setShowAddClub] = useState(false);
  const [newClub, setNewClub] = useState({ nom: '', type: 'Workshop Tech', icon: '🎵', description: '', responsable: '' });
  const [selectedClub, setSelectedClub] = useState(null);
  const [activeTab, setActiveTab] = useState('participants'); // 'participants' | 'events'
  const [classesList, setClassesList] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [openClasses, setOpenClasses] = useState({});
  const [newEvent, setNewEvent] = useState({ titre: '', date: '', heure: '', lieu: '', description: '' });

  const API_BASE = 'http://localhost:5000';

  const fetchClubs = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/clubs`);
      if (res.ok) {
        const data = await res.json();
        setClubs(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/classes`);
      if (res.ok) {
        const data = await res.json();
        setClassesList(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClubs();
    fetchClasses();
  }, []);

  const openClubModal = (club) => {
    setSelectedClub(club);
    setActiveTab('participants');
    // Extract array of member IDs cleanly as string IDs
    const memberIds = club.membres ? club.membres.map(m => (typeof m === 'object' && m !== null) ? (m._id ? m._id.toString() : m.toString()) : m.toString()) : [];
    setSelectedMembers(memberIds);
  };

  const toggleStudentMember = (eleveId) => {
    const targetId = eleveId.toString();
    setSelectedMembers(prev => {
      if (prev.includes(targetId)) {
        return prev.filter(id => id !== targetId);
      } else {
        return [...prev, targetId];
      }
    });
  };

  const handleSaveMembers = async () => {
    if (!selectedClub) return;
    try {
      const res = await fetch(`${API_BASE}/api/clubs/${selectedClub._id}/members`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membres: selectedMembers })
      });
      if (res.ok) {
        const updated = await res.json();
        setSelectedClub(updated);
        const freshMemberIds = updated.membres ? updated.membres.map(m => (typeof m === 'object' && m !== null) ? (m._id ? m._id.toString() : m.toString()) : m.toString()) : [];
        setSelectedMembers(freshMemberIds);
        alert("Enregistrement réussi ! Les modifications sont bien sauvegardées.");
        await fetchClubs();
      } else {
        const errData = await res.json().catch(() => ({}));
        alert("Erreur lors de la mise à jour des membres : " + (errData.message || res.statusText));
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau lors de la sauvegarde.");
    }
  };

  const handleCreateClub = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newClub,
        icon: newClub.icon || '🎵'
      };
      const res = await fetch(`${API_BASE}/api/clubs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const contentType = res.headers.get('content-type');
      let data = {};
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      }

      if (res.ok) {
        alert("Club créé avec succès !");
        setNewClub({ nom: '', type: 'Workshop Tech', icon: '🎵', description: '', responsable: '' });
        setShowAddClub(false);
        fetchClubs();
      } else {
        alert("Erreur serveur (" + res.status + "): " + (data.message || "Impossible de créer le club."));
      }
    } catch (err) {
      console.error("Create club error:", err);
      alert("Erreur réseau: " + err.message);
    }
  };

  const handleDeleteClub = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce club ?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/clubs/${id}`, { method: 'DELETE' });
      if (res.ok) fetchClubs();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!selectedClub) return;
    try {
      const res = await fetch(`${API_BASE}/api/clubs/${selectedClub._id}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
      if (res.ok) {
        const updated = await res.json();
        setSelectedClub(updated);
        setNewEvent({ titre: '', date: '', heure: '', lieu: '', description: '' });
        fetchClubs();
      }
    } catch (err) {
      alert("Erreur lors de l'ajout de l'événement");
    }
  };

  const handleDeleteEvent = async (clubId, eventId) => {
    try {
      const res = await fetch(`${API_BASE}/api/clubs/${clubId}/events/${eventId}`, { method: 'DELETE' });
      if (res.ok) {
        const updated = await res.json();
        setSelectedClub(updated);
        fetchClubs();
      }
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const toggleClassAccordion = (classId) => {
    setOpenClasses(prev => ({ ...prev, [classId]: !prev[classId] }));
  };

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award style={{ color: '#f59e0b' }} size={32} /> Gestion des Clubs & Workshops
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0 0' }}>Espace réservé à la Direction et à l'Administration pour gérer la vie associative, participants et ateliers.</p>
        </div>
        <button 
          onClick={() => setShowAddClub(!showAddClub)} 
          style={{ backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.2)' }}
        >
          <UserPlus size={18} /> Nouveau Club / Workshop
        </button>
      </div>

      {showAddClub && (
        <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#1e293b' }}>Créer un nouveau Club ou Atelier</h3>
          <form onSubmit={handleCreateClub} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '6px' }}>Nom du Club / Workshop</label>
              <input type="text" required value={newClub.nom} onChange={e => setNewClub({...newClub, nom: e.target.value})} placeholder="Ex: Club Robotique & IA" style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '6px' }}>Type / Catégorie</label>
              <select value={newClub.type} onChange={e => setNewClub({...newClub, type: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <option>Workshop Tech</option>
                <option>Club Sportif</option>
                <option>Atelier Culture</option>
                <option>Comité Étudiant</option>
                <option>Club de réflexion</option>
                <option>Atelier Musique</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '6px' }}>Icône Emoji du club</label>
              <select value={newClub.icon} onChange={e => setNewClub({...newClub, icon: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <option value="🎵">🎵 Musique</option>
                <option value="💃">💃 Danse</option>
                <option value="⚽">⚽ Sport</option>
                <option value="🎭">🎭 Théâtre</option>
                <option value="🥾">🥾 Randonnée</option>
                <option value="🎨">🎨 Peinture</option>
                <option value="🛠️">🛠️ Bricolage</option>
                <option value="📐">📐 Mathématiques</option>
                <option value="💻">💻 Informatique</option>
                <option value="🤖">🤖 Robotique</option>
              </select>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '6px' }}>Responsable / Encadrant</label>
              <input type="text" value={newClub.responsable} onChange={e => setNewClub({...newClub, responsable: e.target.value})} placeholder="Ex: Prof. Ben Salem" style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button type="submit" style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Enregistrer</button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des clubs sous forme de cartes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {clubs.map((club) => (
          <div key={club._id} style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                    {club.icon || '🏆'}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#1e293b' }}>{club.nom}</h3>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#d97706', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>{club.type}</span>
                  </div>
                </div>
                <button onClick={() => handleDeleteClub(club._id)} style={{ backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>

              {club.responsable && (
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                  👨‍🏫 Responsable : <strong>{club.responsable}</strong>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', marginBottom: '16px' }}>
                <div style={{ color: '#0369a1', backgroundColor: '#e0f2fe', padding: '8px', borderRadius: '8px', fontWeight: 'bold' }}>
                  👥 {club.membres ? club.membres.length : 0} Élèves inscrits
                </div>
                <div style={{ color: '#15803d', backgroundColor: '#dcfce7', padding: '8px', borderRadius: '8px', fontWeight: 'bold' }}>
                  📅 {club.evenements ? club.evenements.length : 0} Événements
                </div>
              </div>
            </div>

            <button 
              onClick={() => openClubModal(club)} 
              style={{ width: '100%', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', padding: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Users size={16} /> Ouvrir l'espace du Club
            </button>
          </div>
        ))}
      </div>

      {/* Modal / Panel d'administration du club sélectionné avec 2 PARTIES */}
      {selectedClub && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            
            {/* Header du Modal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', pb: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>{selectedClub.icon}</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>
                    {selectedClub.nom}
                  </h3>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Espace d'administration des participants et événements du club.</p>
                </div>
              </div>
              <button onClick={() => setSelectedClub(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
            </div>

            {/* Onglets PARTIE 1 & PARTIE 2 */}
            <div style={{ display: 'flex', gap: '12px', borderBottom: '2px solid #e2e8f0', marginBottom: '20px' }}>
              <button 
                onClick={() => setActiveTab('participants')}
                style={{ 
                  padding: '10px 16px', 
                  fontWeight: 'bold', 
                  fontSize: '14px', 
                  border: 'none', 
                  borderBottom: activeTab === 'participants' ? '3px solid #3b82f6' : '3px solid transparent',
                  color: activeTab === 'participants' ? '#3b82f6' : '#64748b',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Users size={18} /> Partie 1 : Élèves Participants par Classe
              </button>
              <button 
                onClick={() => setActiveTab('events')}
                style={{ 
                  padding: '10px 16px', 
                  fontWeight: 'bold', 
                  fontSize: '14px', 
                  border: 'none', 
                  borderBottom: activeTab === 'events' ? '3px solid #f59e0b' : '3px solid transparent',
                  color: activeTab === 'events' ? '#f59e0b' : '#64748b',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Calendar size={18} /> Partie 2 : Liste des Events & Workshops
              </button>
            </div>

            {/* CONTENU PARTIE 1 : ÉLÈVES PARTICIPANTS PAR CLASSE */}
            {activeTab === 'participants' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', backgroundColor: '#eff6ff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#1e40af', fontSize: '14px' }}>Cochez les élèves membres de ce club</div>
                    <div style={{ fontSize: '12px', color: '#3b82f6' }}>Chaque élève coché aura la mention "INSCRIT" dans son profil.</div>
                  </div>
                  <button 
                    onClick={handleSaveMembers}
                    style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                  >
                    💾 Enregistrer l'inscription
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {classesList.length === 0 && (
                    <p style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic' }}>Aucune classe enregistrée.</p>
                  )}
                  {classesList.map((cls) => {
                    const isOpen = openClasses[cls._id] ?? true; // Open by default
                    const elevesInClass = cls.eleves || [];
                    const countInscribedInClass = elevesInClass.filter(e => selectedMembers.includes(e._id)).length;

                    return (
                      <div key={cls._id} style={{ border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden' }}>
                        {/* En-tête Accordéon Classe */}
                        <div 
                          onClick={() => toggleClassAccordion(cls._id)}
                          style={{ backgroundColor: '#f8fafc', padding: '12px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#0f172a' }}>🏫 Classe : {cls.nom}</span>
                            <span style={{ fontSize: '11px', backgroundColor: '#e2e8f0', color: '#475569', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                              {cls.niveau || '8ème année'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 'bold' }}>
                              {countInscribedInClass} / {elevesInClass.length} inscrits
                            </span>
                            <span style={{ fontSize: '14px', color: '#64748b' }}>{isOpen ? '▼' : '▶'}</span>
                          </div>
                        </div>

                        {/* Liste Déroulante Multichoix des Élèves */}
                        {isOpen && (
                          <div style={{ padding: '12px 16px', backgroundColor: 'white', borderTop: '1px solid #e2e8f0' }}>
                            {elevesInClass.length === 0 ? (
                              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, fontStyle: 'italic' }}>Aucun élève affecté à cette classe.</p>
                            ) : (
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
                                {elevesInClass.map((eleve) => {
                                  const eleveStrId = eleve._id ? eleve._id.toString() : eleve.toString();
                                  const isChecked = selectedMembers.some(id => id.toString() === eleveStrId);
                                  return (
                                    <label 
                                      key={eleve._id} 
                                      style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '10px', 
                                        padding: '8px 10px', 
                                        borderRadius: '8px', 
                                        border: `1px solid ${isChecked ? '#93c5fd' : '#f1f5f9'}`, 
                                        backgroundColor: isChecked ? '#eff6ff' : '#f8fafc',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                      }}
                                    >
                                      <input 
                                        type="checkbox" 
                                        checked={isChecked}
                                        onChange={() => toggleStudentMember(eleve._id)}
                                        style={{ width: '16px', height: '16px', accentColor: '#2563eb', cursor: 'pointer' }}
                                      />
                                      <span style={{ fontSize: '13px', fontWeight: isChecked ? 'bold' : 'normal', color: isChecked ? '#1e40af' : '#334155' }}>
                                        {eleve.prenom} {eleve.nom}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CONTENU PARTIE 2 : LISTE DES EVENTS & WORKSHOPS */}
            {activeTab === 'events' && (
              <div>
                {/* Formulaire ajout événement */}
                <form onSubmit={handleAddEvent} style={{ backgroundColor: '#fffbe6', border: '1px solid #fef08a', padding: '16px', borderRadius: '12px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#854d0e' }}>➕ Planifier un Titre Event / Activité, Date & Heure</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#713f12', display: 'block', marginBottom: '4px' }}>Titre de l'événement / Activité</label>
                      <input type="text" required placeholder="Ex: Compétition Inter-collège" value={newEvent.titre} onChange={e => setNewEvent({...newEvent, titre: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#713f12', display: 'block', marginBottom: '4px' }}>Date de l'événement</label>
                      <input type="date" required value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#713f12', display: 'block', marginBottom: '4px' }}>Heure de début</label>
                      <input type="text" placeholder="Ex: 14h30" value={newEvent.heure} onChange={e => setNewEvent({...newEvent, heure: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#713f12', display: 'block', marginBottom: '4px' }}>Lieu</label>
                      <input type="text" placeholder="Ex: Salle Informatique" value={newEvent.lieu} onChange={e => setNewEvent({...newEvent, lieu: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
                    </div>
                  </div>
                  <button type="submit" style={{ backgroundColor: '#d97706', color: 'white', border: 'none', borderRadius: '6px', padding: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '4px' }}>+ Enregistrer Événement / Workshop</button>
                </form>

                {/* Liste des événements existants */}
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>Events & Workshops Planifiés</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(!selectedClub.evenements || selectedClub.evenements.length === 0) && (
                    <p style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>Aucun événement planifié pour ce club.</p>
                  )}
                  {selectedClub.evenements && selectedClub.evenements.map((ev) => (
                    <div key={ev._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '10px' }}>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#1e293b' }}>{ev.titre}</div>
                        <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px', display: 'flex', gap: '12px' }}>
                          <span>📅 <strong>Date :</strong> {ev.date}</span>
                          {ev.heure && <span>⏰ <strong>Heure :</strong> {ev.heure}</span>}
                          {ev.lieu && <span>📍 <strong>Lieu :</strong> {ev.lieu}</span>}
                        </div>
                      </div>
                      <button onClick={() => handleDeleteEvent(selectedClub._id, ev._id)} style={{ backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '8px 12px', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

function DashboardMonProfil() {
  const userText = localStorage.getItem('lycee_user');
  const user = userText ? JSON.parse(userText) : null;
  const [points, setPoints] = useState(0);
  const [stats, setStats] = useState({ absences: 0, retards: 0, exclus: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ email: user?.email || '', motDePasse: '', photoProfil: user?.photoProfil || '', fileName: null });
  const [showPassword, setShowPassword] = useState(false);
  const [classeName, setClasseName] = useState('');
  const [dbClubs, setDbClubs] = useState([]);

  useEffect(() => {
    if(!user) return;
    const fetchPoints = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/classes/suivi/eleve/${user._id}`);
        if (res.ok) {
          const list = await res.json();
          let total = 0;
          let a = 0, r = 0, e = 0;
          list.forEach(item => {
            if (item.etat === 'Présent') total += 3;
            else if (item.etat === 'Absent') { total -= 3; a++; }
            else if (item.etat === 'Retard') { total -= 1; r++; }
            else if (item.etat === 'Exclu') { total -= 10; e++; }
          });
          setPoints(total);
          setStats({ absences: a, retards: r, exclus: e });
        }
      } catch (err) {}
    };
    
    const fetchClass = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/classes/eleve/${user._id}/planning`);
        if (res.ok) {
          const data = await res.json();
          if (data.className) setClasseName(data.className);
        }
      } catch (err) {}
    };
    
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/user/${user._id}`);
        if (res.ok) {
          const freshUser = await res.json();
          const merged = { ...user, ...freshUser };
          if (JSON.stringify(user) !== JSON.stringify(merged)) {
            localStorage.setItem('lycee_user', JSON.stringify(merged));
          }
        }
      } catch (err) {}
    };

    const fetchAllClubs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/clubs');
        if (res.ok) {
          const data = await res.json();
          setDbClubs(data);
        }
      } catch (err) {}
    };

    fetchPoints();
    fetchClass();
    fetchUserProfile();
    fetchAllClubs();
  }, [user?._id]);

  if (!user) return null;

  const rawPrenom = user?.prenom || '';
  const rawNom = user?.nom || '';
  const isEmailName = rawPrenom.includes('@') || rawNom.includes('@');
  const displayEmail = user?.email || (isEmailName ? (rawPrenom.includes('@') ? rawPrenom : rawNom) : 'Non renseigné');
  const displayName = isEmailName ? 'Élève' : `${rawPrenom} ${rawNom}`.trim() || 'Étudiant Anonyme';
  const displayInitial = displayName.charAt(0).toUpperCase();

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setEditForm({...editForm, photoProfil: ev.target.result, fileName: file.name});
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/update-profile/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      
      if (!res.ok) {
        throw new Error('Erreur lors de la mise à jour (Backend)');
      }
      
      const updatedUserDB = await res.json();
      
      // Merge with safe properties (local config)
      const updatedUser = { ...user, ...updatedUserDB };
      localStorage.setItem('lycee_user', JSON.stringify(updatedUser));
      alert("Profil mis à jour avec succès !");
      window.location.reload(); // Refresh to apply changes globally
    } catch (error) {
      console.error("Storage error:", error);
      alert("Erreur réseau: impossible de mettre à jour le profil (le serveur est-il en ligne ? ou la taille de l'image est trop grande pour la base de données).");
    }
  };

  return (
    <>
    <div className="animate-fade-in-up section-fade-in relative">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Mon Profil</h1>
      
      {/* Profil Élève - Rectangle plein format */}
      <div className="card mb-6 border-l-4 p-8 relative" style={{ borderLeftColor: '#3b82f6', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
         <h2 className="text-xl font-bold border-b pb-4 mb-6 flex items-center gap-2"><User size={24} className="text-blue-500"/> Profil {user.role === 'eleve' ? 'Élève' : user.role === 'professeur' ? 'Enseignant' : user.role === 'parent' ? 'Famille' : 'Administration'}</h2>
         <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
            
            {/* Variables de nettoyage de données */}
            {(() => {
               return (
                  <>
                     {/* Photo / Avatar */}
                     <div className="flex items-center justify-center text-white text-5xl font-extrabold shadow-md shrink-0" 
                          style={{ 
                             width: '128px',
                             height: '128px',
                             overflow: 'hidden',
                             background: user?.photoProfil ? 'transparent' : 'linear-gradient(135deg, #0ea5e9, #2563eb)',
                             border: '4px solid #c69c4e',
                             borderRadius: '50%'
                          }}>
                        {user?.photoProfil ? (
                           <img src={user.photoProfil} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                        ) : (
                           displayInitial
                        )}
                     </div>
                     
                     {/* Informations */}
                     <div className="flex-1 space-y-4">
                        <div className="text-3xl font-black text-slate-800">{displayName}</div>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                           
                           {/* Info box 1 */}
                           <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '8px', minWidth: '180px', flex: '1 1 0', border: '1px solid #f1f5f9' }}>
                             <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Email</div>
                             <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155', wordBreak: 'break-all' }}>{displayEmail}</div>
                           </div>
                           
                           {/* Info box 2 */}
                           <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '8px', minWidth: '180px', flex: '1 1 0', border: '1px solid #f1f5f9' }}>
                             <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>ID Utilisateur</div>
                             <div style={{ display: 'inline-block', fontSize: '14px', fontWeight: '900', color: '#2563eb', backgroundColor: '#dbeafe', padding: '2px 8px', borderRadius: '4px' }}>{user.identifiant}</div>
                           </div>
                           
                           {/* Info box 3 */}
                           {user.role === 'eleve' && (
                             <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '8px', minWidth: '150px', flex: '1 1 0', border: '1px solid #f1f5f9' }}>
                               <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Niveau</div>
                               <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>
                                  {user.niveauEtude || 'Non renseigné'}
                               </div>
                             </div>
                           )}

                           {/* Info box 4 */}
                           {user.role === 'eleve' && (
                             <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '8px', minWidth: '150px', flex: '1 1 0', border: '1px solid #f1f5f9' }}>
                               <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Classe</div>
                               <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>
                                  {classeName || 'Non affectée'}
                               </div>
                             </div>
                           )}

                           {user.role === 'professeur' && (
                             <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '8px', minWidth: '150px', flex: '1 1 0', border: '1px solid #f1f5f9' }}>
                               <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Matières Enseignées</div>
                               <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>
                                  {user.matieres && user.matieres.length > 0 ? user.matieres.join(', ') : 'Non renseigné'}
                               </div>
                             </div>
                           )}

                           {user.role !== 'eleve' && user.role !== 'professeur' && (
                             <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '8px', minWidth: '150px', flex: '1 1 0', border: '1px solid #f1f5f9' }}>
                               <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Rôle Système</div>
                               <div style={{ fontSize: '14px', fontWeight: '900', color: '#2563eb', textTransform: 'capitalize' }}>
                                  {user.role}
                               </div>
                             </div>
                           )}
                           
                        </div>
                     </div>
                  </>
               );
            })()}
            
            {/* Bouton Modifier */}
            <div className="shrink-0 flex flex-col justify-center mt-4 md:mt-0 w-full md:w-auto relative" style={{ zIndex: 50 }}>
               <button onClick={() => setIsEditing(true)} className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                 <Edit size={18} /> <span className="md:hidden lg:inline">Modifier profil</span>
               </button>
            </div>
         </div>
      </div>

      {/* Grille 2x2 des autres sections */}
      {user.role === 'eleve' && (
      <div className="grid grid-cols-2 gap-6">
          
          {/* Rectangle : Agenda & Devoirs */}
          <div className="card p-6 border-l-4" style={{ order: 3, borderLeftColor: '#ef4444', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
             <h2 className="text-lg font-bold border-b pb-3 mb-4 flex items-center gap-2"><Calendar size={20} className="text-red-500"/> Agenda & Devoirs</h2>
             
             {/* Liste des devoirs (Générée Dynmiquement avec tri intelligent max 30) */}
             {/* Liste des devoirs (Générée Dynamiquement avec bandes absolues garanties ! max 30) */}
             <div className="flex flex-col gap-3" style={{ marginTop: '1rem' }}>
                 
                 {/* En-tête de Table Simulator (Flexbox Garanti) */}
                 <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest pb-2 px-3 border-b border-slate-100 flex items-center">
                    <div style={{ flex: 1, paddingLeft: '1.5rem' }}>Devoir / Examen</div>
                    <div style={{ width: '90px', textAlign: 'center' }}>Date</div>
                    <div style={{ width: '60px', textAlign: 'right' }}>Heure</div>
                 </div>

                 {(() => {
                    const today = new Date();
                    const agendaData = [
                       { matiere: "Mathématiques", type: "Devoir", dateStr: "2026-09-22", heure: "08h00" },
                       { matiere: "SVT", type: "Examen", dateStr: "2026-09-27", heure: "10h00" },
                       { matiere: "Physique", type: "Devoir", dateStr: "2026-10-16", heure: "14h00" },
                       { matiere: "Français", type: "Examen", dateStr: "2026-09-10", heure: "10h00" },
                       { matiere: "Anglais", type: "Devoir", dateStr: "2026-09-21", heure: "09h00" },
                       { matiere: "Histoire", type: "Examen", dateStr: "2026-08-30", heure: "15h00" }
                    ];

                    let urgents = []; let futurs = []; let passes = [];
                    agendaData.forEach(item => {
                       const d = new Date(item.dateStr);
                       const diffTime = d - today;
                       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                       
                       if (diffDays >= 0 && diffDays <= 10) urgents.push({...item, diffDays, status: 'urgent'});
                       else if (diffDays > 10) futurs.push({...item, diffDays, status: 'futur'});
                       else passes.push({...item, diffDays, status: 'passe'});
                    });

                    urgents.sort((a,b) => a.diffDays - b.diffDays);
                    futurs.sort((a,b) => a.diffDays - b.diffDays);
                    passes.sort((a,b) => b.diffDays - a.diffDays);

                    const finalList = [...urgents, ...futurs, ...passes].slice(0, 30);

                    return finalList.map((item, idx) => {
                       let divBg, bandColor, badgeBg, badgeColor, textColor, textDeco;
                       
                       if (item.status === 'urgent') {
                          divBg = '#fef2f2'; bandColor = '#ef4444'; badgeBg = '#fee2e2'; badgeColor = '#dc2626'; textColor = '#1e293b'; textDeco = 'none';
                       } else if (item.status === 'futur') {
                          divBg = '#fff7ed'; bandColor = '#f97316'; badgeBg = '#ffedd5'; badgeColor = '#ea580c'; textColor = '#1e293b'; textDeco = 'none';
                       } else {
                          divBg = '#f0fdf4'; bandColor = '#10b981'; badgeBg = '#d1fae5'; badgeColor = '#059669'; textColor = '#64748b'; textDeco = 'line-through';
                       }

                       const formattedDate = new Date(item.dateStr).toLocaleDateString('fr-FR');

                       return (
                          <div key={idx} className="relative flex items-center pr-3 py-3 rounded-lg shadow-sm transition-colors overflow-hidden" 
                               style={{ backgroundColor: divBg, display: 'flex', width: '100%' }}>
                             {/* La bande ABSOLUE ineffaçable */}
                             <div className="absolute top-0 bottom-0 left-0 w-2" style={{ backgroundColor: bandColor }}></div>
                             
                             <div className="font-bold flex items-center flex-wrap gap-2" style={{ flex: 1, paddingLeft: '1.5rem', color: textColor }}>
                                {item.matiere} 
                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full inline-block whitespace-nowrap" style={{ backgroundColor: badgeBg, color: badgeColor }}>{item.type}</span>
                             </div>
                             <div className="font-semibold" style={{ width: '90px', textAlign: 'center', color: textColor, textDecoration: textDeco }}>{formattedDate}</div>
                             <div className="font-black" style={{ width: '60px', textAlign: 'right', color: textColor }}>{item.heure}</div>
                          </div>
                       );
                    });
                 })()}
             </div>
          </div>

          {/* Rectangle : Vie Scolaire */}
          <div className="card p-6 border-l-4 flex flex-col" style={{ order: 1, borderLeftColor: '#6366f1', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
             <h2 className="text-lg font-bold border-b pb-3 mb-6 flex items-center gap-2"><FileText size={20} className="text-indigo-500"/> Vie Scolaire <span className="ml-auto text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded">2026-2027</span></h2>
             
             <div className="space-y-4 flex-1">
               {/* Ligne Absences */}
               <div className="flex items-center justify-between bg-red-50 rounded-xl p-4 border border-red-100">
                  <div className="flex items-center gap-3">
                     <span className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100 text-red-500"><UserX size={20}/></span>
                     <span className="font-bold text-slate-700 text-sm uppercase tracking-wide">Absences</span>
                  </div>
                  <div className="text-3xl font-black text-red-600">{stats?.absences || 0}</div>
               </div>

               {/* Ligne Retards */}
               <div className="flex items-center justify-between bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                  <div className="flex items-center gap-3">
                     <span className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-600"><Clock size={20}/></span>
                     <span className="font-bold text-slate-700 text-sm uppercase tracking-wide">Retards</span>
                  </div>
                  <div className="text-3xl font-black text-yellow-600">{stats?.retards || 0}</div>
               </div>

               {/* Ligne Exclusions */}
               <div className="flex items-center justify-between bg-slate-100 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-3">
                     <span className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-200 text-slate-600"><X size={20}/></span>
                     <span className="font-bold text-slate-700 text-sm uppercase tracking-wide">Exclusions</span>
                  </div>
                  <div className="text-3xl font-black text-slate-600">{stats?.exclus || 0}</div>
               </div>
             </div>
             
             <p className="mt-6 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wide border-t border-slate-100 pt-4">
               Données calculées en temps réel à partir de l'historique de présence.
             </p>
          </div>

          {/* Rectangle : Clubs et Workshop */}
          <div className="card p-6 border-l-4" style={{ order: 2, borderLeftColor: '#f59e0b', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
             <h2 className="text-lg font-bold border-b pb-3 mb-4 flex items-center gap-2"><Users size={20} className="text-orange-500"/> Clubs et Workshop</h2>
             <div className="space-y-2.5 overflow-y-auto max-h-[350px] pr-2">
                {(() => {
                  const palette = [
                    { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af', badgeBg: '#3b82f6' },
                    { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534', badgeBg: '#22c55e' },
                    { bg: '#faf5ff', border: '#e9d5ff', text: '#6b21a8', badgeBg: '#a855f7' },
                    { bg: '#fff7ed', border: '#ffedd5', text: '#9a3412', badgeBg: '#f97316' },
                    { bg: '#fdf2f8', border: '#fbcfe8', text: '#9d174d', badgeBg: '#ec4899' },
                    { bg: '#f0f9ff', border: '#bae6fd', text: '#075985', badgeBg: '#0ea5e9' }
                  ];

                  const defaultClubs = [
                    { nom: "Club Robotique", type: "Workshop Tech", icon: "💻", memberRole: "Participant actif" },
                    { nom: "Équipe de Foot", type: "Club Sportif", icon: "⚽", memberRole: "Ailier droit" },
                    { nom: "Théâtre & Art dramatique", type: "Atelier Culture", icon: "🎭", memberRole: null },
                    { nom: "Conseil de Vie Collégienne", type: "Comité Étudiant", icon: "📢", memberRole: "Délégué suppléant" },
                    { nom: "Club d'Échecs", type: "Club de réflexion", icon: "♟️", memberRole: null },
                    { nom: "Chorale du Collège", type: "Atelier Musique", icon: "🎵", memberRole: null }
                  ];

                  const clubsToDisplay = dbClubs && dbClubs.length > 0 ? dbClubs : defaultClubs;

                  return clubsToDisplay.map((club, idx) => {
                    const isMember = club.membres ? club.membres.some(m => {
                      const mId = (typeof m === 'object' && m !== null) ? (m._id ? m._id.toString() : m.toString()) : m.toString();
                      return mId === user._id.toString();
                    }) : !!club.memberRole;
                    const theme = palette[idx % palette.length];

                    return (
                      <div key={club._id || idx} style={{ padding: '12px 14px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.bg, border: `1px solid ${theme.border}`, marginBottom: '10px' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                             <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: `1px solid ${theme.border}` }}>
                                {club.icon || '🏆'}
                             </div>
                             <div>
                                 <div style={{ fontSize: '14px', fontWeight: '800', color: theme.text }}>{club.nom}</div>
                                 <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{club.type}</div>
                             </div>
                         </div>
                         {isMember ? (
                             <div>
                                 <span style={{ backgroundColor: theme.badgeBg, color: 'white', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', padding: '5px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                     <CheckCircle size={12} strokeWidth={3} /> INSCRIT
                                 </span>
                             </div>
                         ) : (
                             <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', paddingRight: '4px' }}>
                                 n'est pas inscrit
                             </div>
                         )}
                      </div>
                    );
                  });
                })()}
             </div>
          </div>

          {/* Rectangle : Mes Progrès, Notes & Groupes */}
          <div className="card p-6 border-l-4 flex flex-col" style={{ order: 4, borderLeftColor: '#10b981', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
             <h2 className="text-lg font-bold border-b pb-3 mb-4 flex items-center gap-2"><Activity size={20} className="text-emerald-500"/> Mes Progrès, Notes & Groupes</h2>
             
             {/* Comparaison des notes inter-semestres */}
             <div className="mb-6 flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr>
                         <th className="text-[11px] font-black text-slate-400 uppercase tracking-widest pb-3 px-2 border-b border-slate-100">Matière</th>
                         <th className="text-[11px] font-black text-slate-400 uppercase tracking-widest pb-3 px-2 border-b border-slate-100 text-center">Sem. 1</th>
                         <th className="text-[11px] font-black text-slate-400 uppercase tracking-widest pb-3 px-2 border-b border-slate-100 text-center">Sem. 2</th>
                         <th className="text-[11px] font-black text-slate-400 uppercase tracking-widest pb-3 px-2 border-b border-slate-100 text-right">Évolution</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      
                      {/* Matière 1 */}
                      <tr className="hover:bg-slate-50 transition-colors">
                         <td className="py-3 px-2 font-bold flex items-center gap-3">
                            <span className="bg-emerald-100 text-emerald-600 w-7 h-7 rounded-lg flex items-center justify-center text-xs shadow-sm">M</span> Maths
                         </td>
                         <td className="py-3 px-2 text-center text-slate-500 font-semibold">12.5</td>
                         <td className="py-3 px-2 text-center font-bold text-slate-800">15.0</td>
                         <td className="py-3 px-2 text-right">
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full inline-flex items-center gap-1 shadow-sm"><ChevronRight size={12} className="-rotate-90"/> +2.5</span>
                         </td>
                      </tr>
                      
                      {/* Matière 2 */}
                      <tr className="hover:bg-slate-50 transition-colors">
                         <td className="py-3 px-2 font-bold flex items-center gap-3">
                            <span className="bg-blue-100 text-blue-600 w-7 h-7 rounded-lg flex items-center justify-center text-xs shadow-sm">F</span> Français
                         </td>
                         <td className="py-3 px-2 text-center text-slate-500 font-semibold">14.0</td>
                         <td className="py-3 px-2 text-center font-bold text-slate-800">14.0</td>
                         <td className="py-3 px-2 text-right">
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded-full inline-flex items-center gap-1 shadow-sm">= 0.0</span>
                         </td>
                      </tr>
                      
                      {/* Matière 3 */}
                      <tr className="hover:bg-slate-50 transition-colors">
                         <td className="py-3 px-2 font-bold flex items-center gap-3">
                            <span className="bg-purple-100 text-purple-600 w-7 h-7 rounded-lg flex items-center justify-center text-xs shadow-sm">H</span> Histoire
                         </td>
                         <td className="py-3 px-2 text-center text-slate-500 font-semibold">16.00</td>
                         <td className="py-3 px-2 text-center font-bold text-slate-800">14.50</td>
                         <td className="py-3 px-2 text-right">
                            <span className="text-xs font-bold text-red-500 bg-red-100 px-2 py-1 rounded-full inline-flex items-center gap-1 shadow-sm"><ChevronRight size={12} className="rotate-90"/> -1.50</span>
                         </td>
                      </tr>
                      
                      {/* Moyenne du Semestre (Ligne de Résultat) */}
                      <tr className="bg-slate-100 font-extrabold border-t-2 border-slate-200">
                         <td className="py-3 px-2 flex items-center gap-3 text-slate-800">
                            <span className="bg-slate-800 text-white w-7 h-7 rounded-lg flex items-center justify-center text-xs shadow-sm">Σ</span> Moyenne du Semestre
                         </td>
                         <td className="py-3 px-2 text-center text-slate-700">14.17</td>
                         <td className="py-3 px-2 text-center text-emerald-700">14.50</td>
                         <td className="py-3 px-2 text-right">
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 border border-emerald-200 px-2 py-1 rounded-full inline-flex items-center gap-1 shadow-sm"><ChevronRight size={12} className="-rotate-90"/> +0.33</span>
                         </td>
                      </tr>

                   </tbody>
                </table>
             </div>

             {/* Évaluation Avancement par Courbe */}
             <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-center relative">
                <div className="flex justify-between items-end mb-4">
                   <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Moyenne Générale</div>
                      <div className="font-extrabold text-2xl text-slate-800">14.5<span className="text-sm text-slate-400 font-medium">/20</span></div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-black text-emerald-500 uppercase tracking-wide">Évaluation</div>
                      <div className="font-bold text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">En progression constante</div>
                   </div>
                </div>
                
                <svg viewBox="0 0 100 40" className="w-full h-auto overflow-visible mt-2">
                   {/* Grid lines */}
                   <path d="M 0,10 L 100,10 M 0,25 L 100,25" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2,2" />
                   
                   <path d="M 10,35 L 35,25 L 65,15 L 90,10" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                   <path d="M 10,35 L 35,25 L 65,15 L 90,10 L 90,40 L 10,40 Z" fill="rgba(16, 185, 129, 0.08)" />
                   
                   <circle cx="10" cy="35" r="3" fill="white" stroke="#10b981" strokeWidth="1.5" />
                   <circle cx="35" cy="25" r="3" fill="white" stroke="#10b981" strokeWidth="1.5" />
                   <circle cx="65" cy="15" r="3" fill="white" stroke="#10b981" strokeWidth="1.5" />
                   <circle cx="90" cy="10" r="4" fill="#10b981" className="animate-pulse" />
                   
                   {/* Tooltip-like texts */}
                   <text x="10" y="45" fontSize="6" fill="#94a3b8" textAnchor="middle" fontWeight="bold">S1-M1</text>
                   <text x="35" y="45" fontSize="6" fill="#94a3b8" textAnchor="middle" fontWeight="bold">S1-M2</text>
                   <text x="65" y="45" fontSize="6" fill="#94a3b8" textAnchor="middle" fontWeight="bold">S2-M1</text>
                   <text x="90" y="45" fontSize="6" fill="#10b981" textAnchor="middle" fontWeight="black">Actuel</text>
                </svg>
             </div>
          </div>
      </div>
      )}
    </div>
    
    {/* VRAIE FENÊTRE MODALE : Petite taille, design premium, avec Dark Background garanti */}
    {isEditing && createPortal(
       <div 
          style={{ position: 'fixed', inset: 0, top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', zIndex: 2147483647, backgroundColor: 'rgba(0, 0, 0, 0.45)', backdropFilter: 'blur(3px)' }}
          onClick={() => setIsEditing(false)}
       >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ width: '520px', maxWidth: '95vw', backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', position: 'relative', border: '1px solid #d1d5db' }}
          >
             
             {/* ====== HEADER & AVATAR ====== */}
             <div style={{ backgroundColor: '#f0f7fb', padding: '24px 24px 20px 24px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid #e0eff8' }}>
                <button 
                  onClick={() => setIsEditing(false)} 
                  style={{ position: 'absolute', top: '16px', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                   <X size={24} />
                </button>
                
                <h3 style={{ margin: '0 0 20px 0', fontSize: '22px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', fontStyle: 'italic', letterSpacing: '0.5px' }}>
                   Modifier Profil Élève
                </h3>
                
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                   <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid #69c3c1', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                     {editForm.photoProfil ? (
                        <img src={editForm.photoProfil} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                     ) : (
                        <User size={50} color="#94a3b8" />
                     )}
                   </div>
                   <div style={{ position: 'absolute', bottom: '0px', right: '0px', backgroundColor: '#205c93', color: 'white', padding: '6px', borderRadius: '50%', border: '2px solid white', display: 'flex' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                   </div>
                </div>
                
                <input type="file" id="photo-upload-input" style={{ display: 'none' }} accept="image/*" onChange={handlePhotoUpload} />
                <button 
                  onClick={() => document.getElementById('photo-upload-input').click()}
                  style={{ backgroundColor: '#3471a8', color: 'white', border: 'none', borderRadius: '24px', padding: '7px 20px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginBottom: '8px' }}
                >
                   <span style={{ fontSize: '14px', fontWeight: '900' }}>↑</span> IMPORTER PHOTO PROFIL
                </button>
                <div style={{ fontSize: '12px', color: '#475569' }}>
                   {editForm.fileName ? `Fichier: ${editForm.fileName} ✅` : `Fichier: [aucun fichier sélectionné] 📷 📁`}
                </div>
             </div>
             
             {/* ====== BODY ====== */}
             <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* SECTION 1: EMAIL */}
                <div style={{ backgroundColor: '#f0f7fb', borderRadius: '12px', padding: '16px' }}>
                   <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase' }}>Section 1: Email</h4>
                   <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                         <input 
                           type="email" 
                           value={editForm.email} 
                           onChange={(e) => setEditForm({...editForm, email: e.target.value})} 
                           style={{ width: '100%', boxSizing: 'border-box', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px 32px 8px 12px', fontSize: '14px', outline: 'none', color: '#334155' }} 
                           placeholder="Nouvel Email:" 
                         />
                         <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '14px' }}>✉</span>
                      </div>
                      <button style={{ backgroundColor: '#3471a8', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                         <Edit size={14}/> Enregistrer mon email
                      </button>
                   </div>
                   <div style={{ marginTop: '8px', fontSize: '12px', color: '#475569' }}>
                      Email actuel: [{displayEmail}]
                   </div>
                </div>
                
                {/* SECTION 2: MOT DE PASSE */}
                <div style={{ backgroundColor: '#f0f7fb', borderRadius: '12px', padding: '16px' }}>
                   <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase' }}>Section 2: Mot de Passe</h4>
                   
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ position: 'relative' }}>
                         <input 
                           type={showPassword ? "text" : "password"} 
                           value={editForm.motDePasse} 
                           onChange={(e) => setEditForm({...editForm, motDePasse: e.target.value})} 
                           style={{ width: '100%', boxSizing: 'border-box', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px 100px 8px 12px', fontSize: '14px', outline: 'none', color: '#334155' }} 
                           placeholder="Nouveau mot de passe:" 
                         />
                         <div 
                           onClick={() => setShowPassword(!showPassword)}
                           style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', fontWeight: 'bold', color: '#64748b', cursor: 'pointer', userSelect: 'none' }}
                         >
                            {showPassword ? "🔓 Hide 👁" : "🔒 Show 👁"}
                         </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                         <input 
                           type={showPassword ? "text" : "password"} 
                           style={{ flex: 1, backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px 12px', fontSize: '14px', outline: 'none', color: '#334155' }} 
                           placeholder="Confirmer nouveau mot de passe:" 
                         />
                         <button style={{ backgroundColor: '#3471a8', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                            <CheckCircle size={14}/> Changer le mot de passe
                         </button>
                      </div>
                   </div>
                   
                   {/* Security Strength Bar */}
                   <div style={{ marginTop: '16px' }}>
                      <div style={{ display: 'flex', width: '50%', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px', gap: '2px' }}>
                         <div style={{ flex: 1, backgroundColor: '#ef4444', borderRadius: '3px' }}></div>
                         <div style={{ flex: 1, backgroundColor: '#f97316', borderRadius: '3px' }}></div>
                         <div style={{ flex: 1, backgroundColor: '#eab308', borderRadius: '3px' }}></div>
                         <div style={{ flex: 1, backgroundColor: '#22c55e', borderRadius: '3px' }}></div>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#16a34a', marginBottom: '4px' }}>Sécurité: Forte</div>
                      <div style={{ fontSize: '12px', color: '#475569' }}>Minimum 8 caractères, dont une majuscule et un chiffre.</div>
                   </div>
                </div>
             </div>
             
             {/* ====== FOOTER BUTTONS ====== */}
             <div style={{ padding: '0 24px 24px 24px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button 
                  onClick={handleSaveProfile} 
                  style={{ backgroundColor: '#2b6ab0', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                   ENREGISTRER LES MODIFICATIONS
                </button>
                <button 
                  onClick={() => setIsEditing(false)} 
                  style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 24px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                   <X size={18}/> ANNULER
                </button>
             </div>
          </div>
       </div>,
       document.body
    )}
    </>
  );
}

function DashboardAnnonces() {
  const userText = localStorage.getItem('lycee_user');
  const user = userText ? JSON.parse(userText) : {};
  const [announcements, setAnnouncements] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const [form, setForm] = useState({
    titre: '',
    detail: '',
    categorie: 'Vie Scolaire',
    priorite: 'normale',
  });

  const [selectedTargets, setSelectedTargets] = useState(['tous_eleves']);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const loadData = async () => {
    // Annonces
    fetch('http://localhost:5000/api/announcements')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAnnouncements(data);
      })
      .catch(err => console.error("Erreur chargement annonces:", err));

    // Classes
    fetch('http://localhost:5000/api/classes')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setClasses(data);
        } else {
          setClasses([]);
        }
      })
      .catch(err => {
        console.error("Erreur chargement classes:", err);
        setClasses([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTargetCheckbox = (type) => {
    if (selectedTargets.includes(type)) {
      setSelectedTargets(selectedTargets.filter(t => t !== type));
    } else {
      setSelectedTargets([...selectedTargets, type]);
    }
  };

  const handleClassCheckbox = (classId) => {
    if (selectedClasses.includes(classId)) {
      setSelectedClasses(selectedClasses.filter(c => c !== classId));
    } else {
      setSelectedClasses([...selectedClasses, classId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    if (selectedTargets.length === 0) {
      setStatusMsg({ type: 'error', text: 'Veuillez cocher au moins un public cible (destinataire).' });
      return;
    }

    const requiresClass = selectedTargets.includes('eleves_classe') || selectedTargets.includes('parents_classe');
    if (requiresClass && selectedClasses.length === 0) {
      setStatusMsg({ type: 'error', text: 'Veuillez cocher au moins une classe spécifique.' });
      return;
    }

    try {
      const validUserId = (user && user._id && typeof user._id === 'string' && user._id.match(/^[0-9a-fA-F]{24}$/)) ? user._id : null;
      const res = await fetch('http://localhost:5000/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titre: form.titre,
          detail: form.detail,
          categorie: form.categorie,
          priorite: form.priorite,
          cibleTypes: selectedTargets,
          cibleClasseIds: selectedClasses,
          createurId: validUserId
        })
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMsg({ type: 'success', text: 'Annonce publiée avec succès !' });
        setForm({
          titre: '',
          detail: '',
          categorie: 'Vie Scolaire',
          priorite: 'normale'
        });
        setSelectedTargets(['tous_eleves']);
        setSelectedClasses([]);
        loadData();
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Erreur lors de la publication.' });
      }
    } catch (err) {
      console.error("Erreur publication annonce:", err);
      setStatusMsg({ type: 'error', text: `Erreur: ${err.message || err.toString()}` });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette annonce ?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/announcements/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAnnouncements(announcements.filter(a => a._id !== id));
      }
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  const getCibleLabels = (ann) => {
    const types = ann.cibleTypes || (ann.cibleType ? [ann.cibleType] : []);
    const classObjs = ann.cibleClasseIds && ann.cibleClasseIds.length > 0 ? ann.cibleClasseIds : (ann.cibleClasseId ? [ann.cibleClasseId] : []);
    const classNames = classObjs.map(c => typeof c === 'object' ? c.nom : c).filter(Boolean).join(', ');

    const labels = types.map(t => {
      switch (t) {
        case 'tous_parents': return '👨‍👩‍👧 Tous les Parents';
        case 'tous_eleves': return '🎓 Tous les Élèves';
        case 'tous_profs': return '👨‍🏫 Tous les Professeurs';
        case 'eleves_classe': return `🎓 Élèves (${classNames || 'Classe'})`;
        case 'parents_classe': return `👨‍👩‍👧 Parents (${classNames || 'Classe'})`;
        default: return t;
      }
    });

    return labels.join(' | ') || 'Tous';
  };

  const requiresClassSection = selectedTargets.includes('eleves_classe') || selectedTargets.includes('parents_classe');

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-primary flex items-center gap-3">
            <FileText size={32} /> Gestion des Annonces
          </h1>
          <p className="text-muted">Publiez et ciblez vos notes d'information pour la communauté scolaire</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire de création */}
        <div className="card lg:col-span-1 border-t-4" style={{ borderTopColor: 'var(--primary)' }}>
          <h2 className="text-xl font-bold mb-4 text-primary">Publier une Annonce</h2>

          {statusMsg.text && (
            <div className={`p-4 mb-4 rounded font-bold text-sm ${statusMsg.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {statusMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="input-group">
              <label className="input-label">Titre de l'annonce</label>
              <input type="text" required className="input-field" value={form.titre} onChange={e => setForm({...form, titre: e.target.value})} placeholder="Ex: Réunion Parents-Professeurs" />
            </div>

            <div className="input-group">
              <label className="input-label">Détails / Message</label>
              <textarea required rows="4" className="input-field" value={form.detail} onChange={e => setForm({...form, detail: e.target.value})} placeholder="Contenu explicatif de l'annonce..."></textarea>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="input-group">
                <label className="input-label">Catégorie</label>
                <select className="input-field" value={form.categorie} onChange={e => setForm({...form, categorie: e.target.value})}>
                  <option value="Vie Scolaire">Vie Scolaire</option>
                  <option value="Pédagogie">Pédagogie</option>
                  <option value="Administration">Administration</option>
                  <option value="Transport">Transport</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Priorité</label>
                <select className="input-field" value={form.priorite} onChange={e => setForm({...form, priorite: e.target.value})}>
                  <option value="normale">Normale</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="haute">Haute (Urgent)</option>
                </select>
              </div>
            </div>

            {/* CHOIX MULTIPLES DESTINATAIRES */}
            <div className="input-group border-t pt-4 mt-2">
              <label className="input-label font-bold text-secondary mb-2 block">Public Cible (Sélection Multiple)</label>
              <div className="flex flex-col gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                  <input type="checkbox" checked={selectedTargets.includes('tous_eleves')} onChange={() => handleTargetCheckbox('tous_eleves')} /> 🎓 Tous les élèves
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                  <input type="checkbox" checked={selectedTargets.includes('tous_parents')} onChange={() => handleTargetCheckbox('tous_parents')} /> 👨‍👩‍👧 Tous les parents
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                  <input type="checkbox" checked={selectedTargets.includes('tous_profs')} onChange={() => handleTargetCheckbox('tous_profs')} /> 👨‍🏫 Tous les professeurs
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer text-blue-800 border-t pt-2 mt-1">
                  <input type="checkbox" checked={selectedTargets.includes('eleves_classe')} onChange={() => handleTargetCheckbox('eleves_classe')} /> 🏫 Élèves de classe(s) spécifique(s)
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer text-blue-800">
                  <input type="checkbox" checked={selectedTargets.includes('parents_classe')} onChange={() => handleTargetCheckbox('parents_classe')} /> 🏠 Parents de classe(s) spécifique(s)
                </label>
              </div>
            </div>

            {/* SELECTION MULTIPLE DE CLASSES SI CHECKED */}
            {requiresClassSection && (
              <div className="input-group bg-blue-50 p-4 rounded-lg border border-blue-200">
                <label className="input-label text-blue-900 font-bold mb-2 block">Cocher la ou les Classe(s) concernée(s)</label>
                {!Array.isArray(classes) || classes.length === 0 ? (
                  <div className="text-xs text-red-600 font-bold italic">Aucune classe disponible dans le système. Allez dans 'Gestion des Classes' pour en créer.</div>
                ) : (
                  <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto bg-white p-3 rounded border border-blue-100">
                    {classes.map(c => (
                      <label key={c._id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input type="checkbox" checked={selectedClasses.includes(c._id)} onChange={() => handleClassCheckbox(c._id)} />
                        <span className="font-bold text-gray-800">{c.nom}</span>
                        <span className="text-xs text-gray-500">({c.niveau})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button type="submit" className="btn btn-primary mt-2 flex items-center justify-center gap-2">
              <CheckCircle size={18} /> Publier l'annonce
            </button>
          </form>
        </div>

        {/* Liste des annonces publiées */}
        <div className="card lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-primary">Annonces Publiées ({announcements.length})</h2>

          {loading ? (
            <div className="text-center py-12 text-muted">Chargement des annonces...</div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-12 text-muted italic">Aucune annonce publiée pour le moment.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {announcements.map(ann => (
                <div key={ann._id} className="p-4 rounded-xl border bg-gray-50 flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-lg text-primary">{ann.titre}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">{ann.categorie}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${ann.priorite === 'haute' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-700'}`}>
                        {ann.priorite.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">{ann.detail}</p>

                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500 bg-white p-2 rounded border border-gray-200 w-fit">
                      <span className="text-secondary">{getCibleLabels(ann)}</span>
                      <span>•</span>
                      <span>{new Date(ann.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>

                  <button onClick={() => handleDelete(ann._id)} className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="activities" element={<EmptyPage title="Activités" description="Clubs, événements culturels, sorties scolaires et projets pédagogiques." />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="annonces" element={<DashboardAnnonces />} />
          <Route path="clubs" element={<DashboardClubs />} />
          <Route path="users-list" element={<DashboardUsersList />} />
          <Route path="users" element={<DashboardAdminUsers />} />
          <Route path="classes" element={<DashboardClasses />} />
          <Route path="paiements" element={<DashboardPaiements />} />
          <Route path="classes/:id" element={<DashboardClassDetail />} />
          
          {/* Missing Features routing placed here to avoid navigation crashes */}
          <Route path="dossiers-enfants" element={<DashboardDossiersEnfants />} />
          <Route path="notes-bulletins" element={<EmptyPage title="Bulletins & Notes" description="Interface en cours de construction pour consulter les résultats scolaires." />} />
          <Route path="planning" element={<DashboardPlanning />} />
          <Route path="presences" element={<DashboardPresences />} />
          <Route path="notes-devoirs" element={<EmptyPage title="Notes & Devoirs" description="Interface d'évaluation et communication du travail à faire." />} />
          <Route path="messagerie" element={<DashboardMessagerie />} />
          <Route path="mon-profil" element={<DashboardMonProfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
