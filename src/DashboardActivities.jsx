import React, { useState, useEffect } from 'react';
import { Plus, X, Image as ImageIcon, Trash2, Edit, Calendar, MapPin } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function DashboardActivities() {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [formData, setFormData] = useState({ titre: '', type: '', date: '', lieu: '' });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/activities');
      const data = await res.json();
      setActivities(Array.isArray(data) ? data : []);
    } catch(err) { console.error(err); }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenEdit = (act) => {
    setEditingId(act._id);
    setFormData({ titre: act.titre, type: act.type, date: act.date, lieu: act.lieu });
      setPreviewImage(act.image);
      setPreviewPhotos(act.photos || []);
      setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm("Supprimer cette activité ?")) {
      try {
        await fetch(`http://localhost:5000/api/activities/${id}`, { method: 'DELETE' });
        fetchActivities();
      } catch(err) { console.error(err); }
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const colors = ['#3a8c6e', '#e3ad44', '#3d739e', '#8b5cf6', '#ec4899'];
    const newColor = colors[activities.length % colors.length]; // fallback

    const payload = {
      titre: formData.titre,
      type: formData.type,
      date: formData.date,
      lieu: formData.lieu,
      image: previewImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80',
      photos: previewPhotos,
      // only assign new color if creating
    };
    if (!editingId) payload.borderColor = newColor;

    try {
      if (editingId) {
        await fetch(`http://localhost:5000/api/activities/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch('http://localhost:5000/api/activities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      closeModal();
      fetchActivities();
    } catch(err) { console.error(err); }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ titre: '', type: '', date: '', lieu: '' });
    setPreviewImage(null);
    setPreviewPhotos([]);
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhotos(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setPreviewPhotos(previewPhotos.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '24px', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 8px 0', borderBottom: 'none' }}>Activités de l'Établissement</h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '15px' }}>Gérez les événements, ateliers et tournois de manière créative.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0f172a', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}
        >
          <Plus size={20} /> Nouvelle Activité
        </button>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '750px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8fafc' }}>
            <tr style={{ color: '#334155', fontSize: '14.5px' }}>
              <th style={{ padding: '16px 24px', fontWeight: 'bold', width: '100px' }}>Image</th>
              <th style={{ padding: '16px 24px', fontWeight: 'bold' }}>Nom de l'Activité</th>
              <th style={{ padding: '16px 24px', fontWeight: 'bold', width: '22%' }}>Type</th>
              <th style={{ padding: '16px 24px', fontWeight: 'bold', width: '25%' }}>Date & Lieu</th>
              <th style={{ padding: '16px 24px', fontWeight: 'bold', width: '120px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((act) => (
              <tr key={act._id} style={{ borderTop: '2px solid #ffffff', backgroundColor: '#fbf8ec' }}>
                <td style={{ padding: '16px 24px', verticalAlign: 'middle' }}>
                  <div style={{
                    width: '76px', height: '76px',
                    borderRadius: '50%',
                    padding: '3px',
                    background: 'linear-gradient(145deg, #ffdf73 0%, #b8860b 100%)',
                    boxShadow: '0 4px 10px rgba(184, 134, 11, 0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '100%', height: '100%',
                      borderRadius: '50%',
                      border: '2px solid #ffffff',
                      overflow: 'hidden',
                      backgroundColor: '#ffffff'
                    }}>
                      <img 
                        src={act.image} 
                        alt="" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', verticalAlign: 'middle' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', maxWidth: '350px' }}>{act.titre}</div>
                </td>
                <td style={{ padding: '20px 24px', verticalAlign: 'middle' }}>
                  <div style={{ fontSize: '15px', color: '#475569', fontWeight: '500', lineHeight: '1.4' }}>
                    {(act.type || '').split(' ').map((word, i) => <React.Fragment key={i}>{word}
                      {i < (act.type || '').split(' ').length - 1 && (act.type || '').length > 15 && i === 0 ? <br/> : ' '}
                    </React.Fragment>)}
                  </div>
                </td>
                <td style={{ padding: '20px 24px', verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14.5px', color: '#1f2937', marginBottom: '4px' }}>
                    <Calendar size={16} style={{ color: '#64748b' }} />
                    <span>{act.date} <span style={{ color: '#9ca3af' }}>/</span></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14.5px', color: '#1f2937' }}>
                    <MapPin size={16} style={{ color: '#64748b' }} />
                    <span>{act.lieu}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', verticalAlign: 'middle', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={() => handleOpenEdit(act)} style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(act._id)} style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {activities.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            Aucune activité pour le moment.
          </div>
        )}
      </div>

      {isModalOpen && createPortal(
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={closeModal}>
          <div 
            onClick={e => e.stopPropagation()}
            style={{ width: '560px', maxWidth: '95vw', backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
          >
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>{editingId ? "Modifier l'activité" : "Créer une nouvelle activité"}</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>{editingId ? "Ajustez les informations ci-dessous." : "Importez une belle affiche et renseignez les détails."}</p>
              </div>
              <button 
                onClick={closeModal}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdate} style={{ padding: '24px', overflowY: 'auto', maxHeight: 'calc(95vh - 75px)' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Affiche de l'activité (Image)</label>
                <div style={{ position: 'relative', width: '100%', height: '180px', borderRadius: '12px', border: '2px dashed #cbd5e1', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer' }}>
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                  {previewImage ? (
                    <img src={previewImage} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <>
                      <ImageIcon size={40} color="#9ca3af" style={{ marginBottom: '12px' }} />
                      <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Cliquez pour importer l'affiche principale</span>
                    </>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Photos de l'Activité (Galerie)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  {previewPhotos.map((photo, i) => (
                    <div key={i} style={{ position: 'relative', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                      <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button type="button" onClick={() => removePhoto(i)} style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer' }}>
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <div style={{ position: 'relative', height: '80px', borderRadius: '8px', border: '2px dashed #cbd5e1', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Plus size={24} color="#9ca3af" />
                    <input type="file" multiple accept="image/*" onChange={handlePhotosChange} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Titre (Nom de l'Activité)</label>
                <input 
                  type="text" 
                  autoFocus 
                  required 
                  value={formData.titre} 
                  onChange={e => setFormData({...formData, titre: e.target.value})} 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px' }} 
                  placeholder="Ex: Grand Tournoi Régional d'Échecs" 
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Type</label>
                <input 
                  type="text" 
                  required 
                  value={formData.type} 
                  onChange={e => setFormData({...formData, type: e.target.value})} 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px' }} 
                  placeholder="Ex: Compétition Inter-Écoles" 
                />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Date (Journée ou Période)</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.date} 
                    onChange={e => setFormData({...formData, date: e.target.value})} 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px' }} 
                    placeholder="Ex: 22-23 Mars 2024" 
                  />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Lieu</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.lieu} 
                    onChange={e => setFormData({...formData, lieu: e.target.value})} 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px' }} 
                    placeholder="Ex: Gymnase central" 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                <button type="button" onClick={closeModal} style={{ padding: '10px 24px', borderRadius: '9999px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', color: '#475569', fontWeight: '600', cursor: 'pointer' }}>Annuler</button>
                <button type="submit" style={{ padding: '10px 28px', borderRadius: '9999px', backgroundColor: '#0f172a', border: 'none', color: '#ffffff', fontWeight: '600', cursor: 'pointer' }}>{editingId ? 'Sauvegarder' : 'Publier l\'activité'}</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
