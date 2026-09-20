import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CreditCard, Search, User, Filter, AlertCircle, CheckCircle, Save, Settings, X, Edit, Plus, RefreshCw, Calendar, ShieldCheck, Star } from 'lucide-react';

export default function DashboardPaiements() {
  const [eleves, setEleves] = useState([]);
  const [classesData, setClassesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('Tous');
  const [selectedClass, setSelectedClass] = useState('Toutes');
  const [filterStatus, setFilterStatus] = useState('Tous');

  // Directeur config
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [fraisConfig, setFraisConfig] = useState({
    mensuel: { tarif: 150, dispo: true },
    trimestriel: { tarif: 420, dispo: true },
    annuel: { tarif: 1600, dispo: true }
  });

  const [selectedEleve, setSelectedEleve] = useState(null);
  const userText = localStorage.getItem('lycee_user');
  const currentUser = userText ? JSON.parse(userText) : null;
  const isDirecteur = currentUser?.role === 'directeur';

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); 
  const currentYear = currentDate.getFullYear();
  const acadStartYear = currentMonth >= 8 ? currentYear : currentYear - 1;
  const acadEndYear = acadStartYear + 1;
  const acadYearString = `${acadStartYear}-${acadEndYear}`;

  useEffect(() => {
    fetchElevesEtClasses();
    
    // Load config from local storage if exists
    const savedConfig = localStorage.getItem('paiement_frais_config_v2');
    if (savedConfig) {
      setFraisConfig(JSON.parse(savedConfig));
    }
  }, []);

  const fetchElevesEtClasses = async () => {
    try {
      setLoading(true);
      const [resEleves, resClasses] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/eleves`),
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/classes`)
      ]);
      const dataEleves = await resEleves.json();
      const dataClasses = await resClasses.json();
      
      setEleves(dataEleves);
      setClassesData(dataClasses);
    } catch (error) {
      console.error("Erreur API:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = () => {
    localStorage.setItem('paiement_frais_config_v2', JSON.stringify(fraisConfig));
    setIsConfigOpen(false);
  };

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    
    const newSysteme = selectedEleve.paymentInfo?.systeme || 'Non défini';
    const newEtat = selectedEleve.paymentInfo?.etat || 'En attente';
    const newHistory = selectedEleve.paymentInfo?.history || {};

    // 1️⃣ Mise à jour instantanée de l'interface (Optimistic UI Update) pour que la carte change tout de suite
    setEleves(prev => prev.map(el => {
      if (el._id === selectedEleve._id) {
        return { ...el, paymentInfo: { ...el.paymentInfo, systeme: newSysteme, etat: newEtat, history: newHistory } };
      }
      return el;
    }));
    
    setSelectedEleve(null); // On ferme la modale immédiatement pour la fluidité

    // 2️⃣ Mise à jour silencieuse en base de données
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/${selectedEleve._id}/payment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systeme: newSysteme,
          etat: newEtat,
          history: newHistory
        })
      });
      // Optionally re-sync with server later, but local state is already good
      fetchElevesEtClasses();
    } catch (error) {
      console.error("Erreur mise à jour:", error);
    }
  };

  const getStatusColor = (etat) => {
    if (etat === 'Payé') return 'badge-paye';
    if (etat === 'En attente') return 'badge-attente';
    if (etat === 'Non Payé' || etat === 'En retard') return 'badge-retard';
    return 'badge-system';
  };

  const getStatusIcon = (etat) => {
    if (etat === 'Payé') return <CheckCircle size={14} className="mr-1" />;
    if (etat === 'En attente') return <RefreshCw size={14} className="mr-1" />;
    return <AlertCircle size={14} className="mr-1" />;
  };

  const filteredEleves = eleves.filter(e => {
    const term = searchTerm.toLowerCase();
    const matchName = (e.prenom + ' ' + e.nom).toLowerCase().includes(term) || e.identifiant?.toLowerCase().includes(term);
    const expectedNiveau = e.niveauEtude || 'Non assigné';
    const matchNiveau = selectedNiveau === 'Tous' || expectedNiveau === selectedNiveau;
    const paymentStatus = e.paymentInfo?.etat || 'En attente';
    const matchStatus = filterStatus === 'Tous' || paymentStatus === filterStatus;
    
    let matchClassPill = true;
    if (selectedClass !== 'Toutes') {
      const classObj = classesData.find(c => c._id === selectedClass);
      if (classObj) {
        matchClassPill = classObj.eleves.some(el => {
          const id = typeof el === 'object' ? el._id : el;
          return id === e._id;
        });
      }
    }

    return matchName && matchNiveau && matchStatus && matchClassPill;
  });

  const handleNiveauChange = (niveau) => {
    setSelectedNiveau(niveau);
    setSelectedClass('Toutes'); // Reset class filter when niveau changes
  };

  const classesToDisplay = selectedNiveau === 'Tous' 
    ? classesData 
    : classesData.filter(c => c.niveau === selectedNiveau);

  return (
    <div className="app-background w-full">
      <style>{`
        .mesh-bg {
          background-color: #f8fafc;
          background-image: 
            radial-gradient(at 100% 0%, hsla(225,39%,30%,0.08) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(339,49%,30%,0.05) 0px, transparent 50%);
        }
        .app-background {
          background-color: #f4f6fb;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2394a3b8' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          min-height: calc(100vh - 60px);
          padding: 2rem 3rem;
        }

        .avatar-gold-container {
          width: 80px;
          height: 80px;
          border: 3px solid #d4af37;
          border-radius: 50%;
          padding: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          background: white; /* creates the gap */
        }
        
        .avatar-inner-circle {
          width: 100%;
          height: 100%;
          background-color: #94a3b8;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .minimal-card {
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 10px;
          gap: 12px;
          max-width: 200px;
          width: 100%;
          margin: 0 auto;
        }
        .minimal-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        }

        .tab-active {
          border-bottom: 3px solid #1e293b;
          color: #1e293b;
          font-weight: 700;
        }
        .tab-inactive {
          border-bottom: 3px solid transparent;
          color: #64748b;
          font-weight: 500;
        }
        .tab-inactive:hover {
          color: #334155;
        }

        .pill-active {
          background-color: #cbd5e1;
          color: #1e293b;
          border: 1px solid #94a3b8;
          font-weight: 600;
        }
        .pill-inactive {
          background-color: transparent;
          color: #64748b;
          border: 1px solid #cbd5e1;
          font-weight: 500;
        }
        .pill-inactive:hover {
          border-color: #94a3b8;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
          justify-items: center;
        }
        @media (min-width: 768px) {
          .dashboard-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        .badge-premium {
          padding: 6px 14px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .badge-paye { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); border: none; }
        .badge-attente { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); border: none; }
        .badge-retard { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); border: none; }
        .badge-system { background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; }
        
        .header-gradient {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: white;
          padding: 2.5rem 2rem;
          border-radius: 24px;
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.2);
          margin-bottom: 2rem;
        }
        
        .search-glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
        }
        
        .modal-glass {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 28px;
          box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }

        .pricing-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%);
          border-radius: 24px;
          padding: 1.5rem;
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.06);
        }
        .pricing-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 6px;
        }
        .pricing-card.mensuel::before { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
        .pricing-card.trimestriel::before { background: linear-gradient(90deg, #8b5cf6, #d946ef); }
        .pricing-card.annuel::before { background: linear-gradient(90deg, #f59e0b, #fcd34d); }
        
        .sleek-input {
          font-size: 1rem !important;
          font-weight: 700 !important;
          background: transparent !important;
          border: none !important;
          text-align: center;
          width: 50%;
          outline: none !important;
          box-shadow: none !important;
          transition: transform 0.2s;
        }
        
        .sleek-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          margin: 0.5rem 0;
          padding: 0.25rem 0.5rem;
          border-radius: 8px;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(200,200,200,0.5);
          transition: border-color 0.3s, background 0.3s;
        }
        .sleek-input-wrapper:focus-within {
          border-color: rgba(59, 130, 246, 0.6);
          background: white;
        }

        .avatar-glow {
          box-shadow: 0 0 0 4px white, 0 8px 20px rgba(0,0,0,0.15);
        }
      `}</style>

      <div className="w-full max-w-[1000px] mx-auto">
        {/* Header - EXACTLY AS MOCKUP */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[34px] font-extrabold text-[#0f172a] tracking-tight">Suivi des Paiements</h1>
          
          <div className="flex items-center gap-4">
            {isDirecteur && (
              <button 
                onClick={() => setIsConfigOpen(true)} 
                className="flex items-center gap-2 bg-[#5e7188] hover:bg-[#475569] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition"
              >
                <Settings size={16} />
                Gestion des Tarifs
              </button>
            )}
            <div className="relative w-80">
              <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Recherche"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-medium focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
              />
            </div>
          </div>
        </div>

        {/* Niveaux Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
          <button 
            onClick={() => handleNiveauChange('Tous')} 
            className={`pb-3 px-1 text-[16px] whitespace-nowrap ${selectedNiveau === 'Tous' ? 'tab-active' : 'tab-inactive'}`}
          >
            Tous les niveaux
          </button>
          <button 
            onClick={() => handleNiveauChange('7ème année')} 
            className={`pb-3 px-1 text-[16px] whitespace-nowrap ${selectedNiveau === '7ème année' ? 'tab-active' : 'tab-inactive'}`}
          >
            7ème année
          </button>
          <button 
            onClick={() => handleNiveauChange('8ème année')} 
            className={`pb-3 px-1 text-[16px] whitespace-nowrap ${selectedNiveau === '8ème année' ? 'tab-active' : 'tab-inactive'}`}
          >
            8ème année
          </button>
          <button 
            onClick={() => handleNiveauChange('9ème année')} 
            className={`pb-3 px-1 text-[16px] whitespace-nowrap ${selectedNiveau === '9ème année' ? 'tab-active' : 'tab-inactive'}`}
          >
            9ème année
          </button>
        </div>

        {/* Classes Pills and Pagination */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-wrap gap-2.5">
            <button 
              onClick={() => setSelectedClass('Toutes')}
              className={`px-5 py-1.5 rounded-full text-[13px] shadow-sm transition ${selectedClass === 'Toutes' ? 'pill-active' : 'pill-inactive'}`}
            >
              Toutes les classes
            </button>
            {classesToDisplay.map(c => (
              <button 
                key={c._id}
                onClick={() => setSelectedClass(c._id)}
                className={`px-5 py-1.5 rounded-full text-[13px] shadow-sm transition ${selectedClass === c._id ? 'pill-active' : 'pill-inactive'}`}
              >
                {c.nom}
              </button>
            ))}
          </div>
          
          <div className="hidden md:flex gap-1 items-center bg-transparent">
             <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 bg-white border border-gray-200 rounded text-sm">&lt;</button>
             <button className="w-8 h-8 flex items-center justify-center bg-[#1e293b] text-white rounded font-bold text-sm">1</button>
             <button className="w-8 h-8 flex items-center justify-center text-gray-500 bg-white border border-gray-100 hover:bg-gray-50 rounded text-sm">2</button>
             <button className="w-8 h-8 flex items-center justify-center text-gray-500 bg-white border border-gray-100 hover:bg-gray-50 rounded text-sm">3</button>
             <button className="w-8 h-8 flex items-center justify-center text-gray-500 bg-white border border-gray-100 hover:bg-gray-50 rounded text-sm">...</button>
          </div>
        </div>



      {loading ? (
        <div className="text-center py-20 text-gray-500 font-medium">Chargement des données...</div>
      ) : (
        <div className="dashboard-grid">
          {filteredEleves.map(eleve => (
            <div 
              key={eleve._id} 
              className="minimal-card cursor-pointer group"
              onClick={() => setSelectedEleve({...eleve})}
            >
              <div className="avatar-gold-container">
                <div className="avatar-inner-circle">
                  {eleve.photoProfil ? (
                    <img src={eleve.photoProfil} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-white uppercase opacity-70">
                      {(eleve.prenom?.[0] || '') + (eleve.nom?.[0] || '')}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="font-bold text-[#1e293b] text-[13px] text-center leading-tight mt-1">{eleve.prenom} {eleve.nom}</h3>
              
              {(() => {
                const etat = eleve.paymentInfo?.etat || 'Non Payé';
                let bgColor = '#f3f4f6';
                let textColor = '#4b5563';
                let displayText = etat;

                if (etat === 'Payé') {
                  bgColor = '#dcfce7'; 
                  textColor = '#16a34a';
                } 
                else if (etat === 'Crédit' || etat === 'En attente') {
                  bgColor = '#ffedd5'; // Orange-100
                  textColor = '#ea580c'; // Orange-600
                  displayText = 'Crédit';
                } 
                else if (etat === 'Non Payé' || etat === 'En retard') {
                  bgColor = '#fee2e2'; // Red-100
                  textColor = '#dc2626'; // Red-600
                }
                
                return (
                  <div style={{ backgroundColor: bgColor, color: textColor, padding: '4px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 'bold' }}>
                    {displayText}
                  </div>
                );
              })()}
            </div>
          ))}
          {filteredEleves.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-400">
              <Search className="mx-auto text-gray-300 mb-4" size={48}/>
              <p className="font-medium text-lg">Aucun élève trouvé.</p>
            </div>
          )}
        </div>
      )}

      {selectedEleve && createPortal(
        <div 
          style={{ position: 'fixed', inset: 0, top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', zIndex: 2147483647, backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', padding: '20px', boxSizing: 'border-box' }}
          onClick={() => setSelectedEleve(null)}
        >
          <div 
            style={{ width: '520px', maxWidth: '95vw', maxHeight: '90vh', backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', flexShrink: 0, justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', backgroundColor: '#ffffff' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Détails & Paiement Élève</h2>
              <button onClick={() => setSelectedEleve(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', padding: 0 }}>
                <X size={20} style={{ strokeWidth: 2 }}/>
              </button>
            </div>

            {/* Student Info Card (Edge-to-Edge Gray Block) */}
            <div style={{ backgroundColor: '#f8fafc', padding: '20px 24px', display: 'flex', flexShrink: 0, alignItems: 'center', gap: '20px', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', border: '3px solid #cfa344', padding: '3px', backgroundColor: '#ffffff', flexShrink: 0, boxSizing: 'border-box' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', color: '#9ca3af' }}>
                  {selectedEleve.photoProfil ? (
                    <img src={selectedEleve.photoProfil} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="eleve" />
                  ) : (
                    (selectedEleve.prenom?.[0]||'')+(selectedEleve.nom?.[0]||'')
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: '#111827', margin: '0 0 4px 0', lineHeight: 1.2 }}>{selectedEleve.prenom} {selectedEleve.nom}</h3>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>ID: {selectedEleve.identifiant}</p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>{selectedEleve.email || 'Email non fourni'}</p>
                <p style={{ fontSize: '12px', color: '#374151', margin: 0 }}>{selectedEleve.niveauEtude || 'Niveau non assigné'} - {selectedClass !== 'Toutes' ? classesData.find(c => c._id === selectedClass)?.nom || 'Classe B' : 'Classe B'}</p>
              </div>
            </div>

            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '24px', backgroundColor: '#ffffff' }}>
              <form onSubmit={handleUpdatePayment} style={{ margin: 0 }}>
                {/* Système de Paiement */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#111827', marginBottom: '8px' }}>Système de Paiement</label>
                  <div style={{ display: 'flex', padding: '3px', backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '9999px', gap: '4px' }}>
                    {['Mensuel', 'Trimestriel', 'Annuel']
                      .filter(sys => {
                        const key = sys.toLowerCase();
                        return fraisConfig[key]?.dispo ?? true;
                      })
                      .map(sys => {
                      const labels = { 'Mensuel': 'Par Mois', 'Trimestriel': 'Trimestre', 'Annuel': 'Annuel' };
                      const isSelected = (selectedEleve.paymentInfo?.systeme || 'Non défini') === sys;
                      return (
                        <button
                          key={sys}
                          type="button"
                          onClick={() => setSelectedEleve({...selectedEleve, paymentInfo: {...selectedEleve.paymentInfo, systeme: sys}})}
                          style={{ flex: 1, padding: '6px 0', fontSize: '13px', borderRadius: '9999px', fontWeight: 500, cursor: 'pointer', border: 'none', backgroundColor: isSelected ? '#5e7188' : 'transparent', color: isSelected ? '#ffffff' : '#4b5563' }}
                        >
                          {labels[sys]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* État du Paiement */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#111827', marginBottom: '8px' }}>État du Paiement</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {[{ dbVal: 'Non Payé', label: '🏷️ Pas encore', bgColor: '#fee2e2', color: '#dc2626', borderColor: '#fca5a5' },
                      { dbVal: 'Payé', label: '✓ Payé', bgColor: '#dcfce7', color: '#16a34a', borderColor: '#86efac' },
                      { dbVal: 'Crédit', label: '🪙 Crédit', bgColor: '#ffedd5', color: '#ea580c', borderColor: '#fdba74' }
                    ].map(etat => {
                      const isSelected = (selectedEleve.paymentInfo?.etat || 'En attente') === etat.dbVal;
                      return (
                        <button
                          key={etat.dbVal}
                          type="button"
                          onClick={() => setSelectedEleve({...selectedEleve, paymentInfo: {...selectedEleve.paymentInfo, etat: etat.dbVal}})}
                          style={{ flex: 1, padding: '6px 0', fontSize: '13px', borderRadius: '8px', fontWeight: 500, cursor: 'pointer', backgroundColor: isSelected ? etat.bgColor : '#f9fafb', color: isSelected ? etat.color : '#6b7280', border: `1px solid ${isSelected ? etat.borderColor : '#e5e7eb'}` }}
                        >
                          {etat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Échéancier / Historique des Paiements */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#111827', marginBottom: '8px' }}>
                    Échéancier de Paiement (Année {acadYearString})
                  </label>
                  <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      <table style={{ width: '100%', minWidth: '420px', textAlign: 'left', fontSize: '12px', borderCollapse: 'collapse', backgroundColor: '#ffffff' }}>
                        <thead style={{ backgroundColor: '#f8fafc', color: '#1f2937', fontWeight: 600, borderBottom: '1px solid #e5e7eb' }}>
                        <tr>
                          <th style={{ padding: '10px 16px', fontWeight: 600 }}>Période</th>
                          <th style={{ padding: '10px 16px', fontWeight: 600 }}>Échéance (Début)</th>
                          <th style={{ padding: '10px 16px', fontWeight: 600 }}>Montant (Configuré)</th>
                          <th style={{ padding: '10px 16px', fontWeight: 600 }}>Action / État</th>
                        </tr>
                      </thead>
                      <tbody style={{ color: '#374151', fontWeight: 500 }}>
                        {(() => {
                          const sys = selectedEleve.paymentInfo?.systeme || 'Non défini';
                          let schedule = [];
                          
                          if (sys === 'Mensuel') {
                            const mois = ['Septembre', 'Octobre', 'Novembre', 'Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août'];
                            schedule = mois.map((m, i) => ({
                              periode: `Mois: ${m}`,
                              date: `05 ${m} ${i < 4 ? acadStartYear : acadEndYear}`,
                              montant: (fraisConfig.mensuel?.tarif || 150) + ' TND'
                            }));
                          } 
                          else if (sys === 'Trimestriel') {
                            schedule = [
                              { periode: '1er Trimestre (Sep-Déc)', date: `15 Septembre ${acadStartYear}`, montant: (fraisConfig.trimestriel?.tarif || 420) + ' TND' },
                              { periode: '2ème Trimestre (Jan-Mar)', date: `15 Janvier ${acadEndYear}`, montant: (fraisConfig.trimestriel?.tarif || 420) + ' TND' },
                              { periode: '3ème Trimestre (Avr-Juin)', date: `15 Avril ${acadEndYear}`, montant: (fraisConfig.trimestriel?.tarif || 420) + ' TND' }
                            ];
                          }
                          else if (sys === 'Annuel') {
                            schedule = [
                              { periode: 'Année Scolaire complète', date: `30 Septembre ${acadStartYear}`, montant: (fraisConfig.annuel?.tarif || 1600) + ' TND' }
                            ];
                          }

                          if (schedule.length === 0) {
                            return (
                              <tr>
                                <td colSpan="4" style={{ padding: '16px', textAlign: 'center', color: '#9ca3af' }}>
                                  Veuillez assigner un système de paiement à cet élève.
                                </td>
                              </tr>
                            );
                          }

                          return schedule.map((row, idx) => {
                            const isMensuel = sys === 'Mensuel';
                            const periodEtat = selectedEleve.paymentInfo?.history?.[row.periode] || 'Non Payé';
                            
                            let btnBg = '#f3f4f6';
                            let btnColor = '#4b5563';
                            let btnText = 'Pas encore';
                            
                            if (periodEtat === 'Payé') {
                              btnBg = '#dcfce7'; btnColor = '#16a34a'; btnText = '✓ Payé';
                            } else if (periodEtat === 'Crédit') {
                              btnBg = '#ffedd5'; btnColor = '#ea580c'; btnText = '🪙 Crédit';
                            } else if (periodEtat === 'Non Payé') {
                              btnBg = '#fee2e2'; btnColor = '#dc2626'; btnText = '🏷️ Pas encore';
                            }

                            const togglePeriodEtat = () => {
                               const nextEtat = (periodEtat === 'Payé') ? 'Non Payé' : 'Payé';
                               const updatedHistory = { ...(selectedEleve.paymentInfo?.history || {}), [row.periode]: nextEtat };
                               setSelectedEleve({
                                  ...selectedEleve,
                                  paymentInfo: { ...selectedEleve.paymentInfo, history: updatedHistory, etat: nextEtat }
                               });
                            };

                            return (
                              <tr key={idx} style={idx !== schedule.length - 1 ? { borderBottom: '1px solid #f3f4f6' } : {}}>
                                <td style={{ padding: '12px 16px' }}>{row.periode}</td>
                                <td style={{ padding: '12px 16px', color: '#6b7280' }}>{row.date}</td>
                                <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>{row.montant}</td>
                                <td style={{ padding: '12px 16px' }}>
                                   {isMensuel ? (
                                      <button 
                                        type="button" 
                                        onClick={togglePeriodEtat}
                                        style={{ backgroundColor: btnBg, color: btnColor, padding: '4px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                                      >
                                        {btnText}
                                      </button>
                                   ) : (
                                      <span style={{ color: '#9ca3af', fontSize: '11px' }}>-</span>
                                   )}
                                </td>
                              </tr>
                            );
                          });
                        })()}
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                  <button type="submit" style={{ padding: '8px 24px', fontSize: '14px', fontWeight: 500, color: '#ffffff', backgroundColor: '#5e7188', border: '1px solid #5e7188', borderRadius: '8px', cursor: 'pointer' }}>
                    Enregistrer
                  </button>
                  <button type="button" onClick={() => setSelectedEleve(null)} style={{ padding: '8px 20px', fontSize: '14px', fontWeight: 500, color: '#374151', backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer' }}>
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )}
      {/* Modal de Configuration (Directeur) */}
      {isConfigOpen && isDirecteur && createPortal(
        <div 
          style={{ position: 'fixed', inset: 0, top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', zIndex: 2147483647, backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', padding: '20px', boxSizing: 'border-box' }}
          onClick={() => setIsConfigOpen(false)}
        >
          <div 
            style={{ width: '560px', maxWidth: '95vw', backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Gestion des Tarifs (Collège Monastir Moderne)</h2>
              <button onClick={() => setIsConfigOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', padding: 0 }}>
                <X size={20} style={{ strokeWidth: 2 }}/>
              </button>
            </div>
            
            <div style={{ textAlign: 'center', padding: '24px 20px 16px', backgroundColor: '#ffffff' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#334155', margin: '0 0 4px 0' }}>Systèmes de Tarification</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Année Scolaire {acadYearString}</p>
            </div>

            <div style={{ padding: '0 24px 24px', backgroundColor: '#ffffff' }}>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', textAlign: 'left', fontSize: '13px', borderCollapse: 'collapse', backgroundColor: '#ffffff' }}>
                  <thead style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600 }}>
                    <tr>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Mode de Paiement</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontWeight: 600, textAlign: 'center' }}>Statut / Disponibilité</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Tarif Actuel (TND)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['mensuel', 'trimestriel', 'annuel'].map((key, idx) => {
                      const labels = { mensuel: 'Mensuel (TND)', trimestriel: 'Trimestriel (TND)', annuel: 'Annuel (TND)' };
                      const isDispo = fraisConfig[key]?.dispo ?? true;
                      return (
                        <tr key={key} style={idx !== 2 ? { borderBottom: '1px solid #f1f5f9' } : {}}>
                          <td style={{ padding: '12px 16px', color: '#334155', fontWeight: 500 }}>{labels[key]}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <button
                              onClick={() => setFraisConfig(prev => ({...prev, [key]: {...prev[key], dispo: !prev[key].dispo}}))}
                              style={{ 
                                display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', 
                                borderRadius: '9999px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer',
                                backgroundColor: isDispo ? '#dcfce7' : '#fee2e2', 
                                color: isDispo ? '#16a34a' : '#dc2626', 
                                border: `1px solid ${isDispo ? '#86efac' : '#fca5a5'}` 
                              }}
                            >
                              {isDispo ? '✓ Disponible' : '✕ Non disponible'}
                            </button>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden', width: '110px' }}>
                              <div style={{ padding: '4px 8px', backgroundColor: '#f8fafc', color: '#94a3b8', borderRight: '1px solid #e2e8f0', flexShrink: 0 }}>
                                💵
                              </div>
                              <input 
                                type="number" 
                                value={fraisConfig[key]?.tarif || 0}
                                onChange={(e) => setFraisConfig(prev => ({...prev, [key]: {...prev[key], tarif: parseInt(e.target.value)||0}}))}
                                style={{ width: '100%', padding: '6px 8px', border: 'none', outline: 'none', fontSize: '13px', color: '#334155', fontWeight: 500 }}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '24px' }}>
                <button onClick={saveConfig} style={{ width: '100%', padding: '10px 0', fontSize: '14px', fontWeight: 'bold', color: '#ffffff', backgroundColor: '#5e7188', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  ✓ Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      </div>
    </div>
  );
}
