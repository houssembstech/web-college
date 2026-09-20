import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Star, X, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function PublicActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [selectedAct, setSelectedAct] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const prevPhoto = (e) => {
    e.stopPropagation();
    if (selectedAct && selectedAct.photos && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    if (selectedAct && selectedAct.photos && lightboxIndex < selectedAct.photos.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/activities')
      .then(res => res.json())
      .then(data => setActivities(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="py-20 min-h-screen" style={{ backgroundColor: '#ffffff', maxWidth: '100vw', overflowX: 'hidden' }}>
      <div className="text-center mb-16 px-4">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-4">Activités</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Découvrez les événements, clubs et compétitions qui rythment la vie de nos élèves.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act) => (
            <div 
              key={act._id} 
              onClick={() => setSelectedAct(act)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '20px',
                backgroundColor: '#fdfaf5', // soft cream background from the image
                borderBottom: '4px solid #ffffff', 
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
              }}
            >
              {/* 1. Golden Image Ring */}
              <div style={{ marginRight: '16px', flexShrink: 0 }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  padding: '3px',
                  background: 'linear-gradient(145deg, #ffdf73 0%, #b8860b 100%)',
                  boxShadow: '0 8px 16px rgba(184, 134, 11, 0.25)'
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '3px solid #ffffff',
                    overflow: 'hidden',
                    backgroundColor: '#ffffff'
                  }}>
                    <img 
                      src={act.image} 
                      alt={act.titre} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                </div>
              </div>

              {/* 2. Text Details */}
              <div style={{ flex: '1', minWidth: 0 }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1f2937', margin: '0 0 4px 0', lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {act.titre}
                </h3>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#3a8c6e', marginBottom: '8px' }}>
                  {act.type}
                </div>
                
                {/* 3. Date & Lieu */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b' }}>
                    <Calendar size={14} /> 
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{act.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b' }}>
                    <MapPin size={14} /> 
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{act.lieu}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activities.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <Star size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl">Aucune activité n'est programmée pour le moment.</p>
          </div>
        )}
      </div>

      {selectedAct && createPortal(
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', padding: '20px' }} onClick={() => setSelectedAct(null)}>
          <div 
            onClick={e => e.stopPropagation()}
            style={{ width: '800px', maxWidth: '100%', maxHeight: '90vh', backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
          >
            {/* Header / Banner */}
            <div style={{ position: 'relative', height: '280px', width: '100%', backgroundColor: '#000' }}>
              <img src={selectedAct.image} alt={selectedAct.titre} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}></div>
              <button 
                onClick={() => setSelectedAct(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', borderRadius: '50%', padding: '8px', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
              >
                <X size={24} />
              </button>
              <div style={{ position: 'absolute', bottom: '24px', left: '32px', right: '32px' }}>
                <span style={{ display: 'inline-block', padding: '6px 16px', backgroundColor: selectedAct.borderColor || '#3a8c6e', color: '#fff', fontSize: '13px', fontWeight: 'bold', borderRadius: '9999px', marginBottom: '12px' }}>
                  {selectedAct.type}
                </span>
                <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#ffffff', margin: 0, lineHeight: '1.2' }}>{selectedAct.titre}</h2>
              </div>
            </div>

            {/* Content body with scrolling */}
            <div style={{ padding: '32px', overflowY: 'auto', flex: 1 }}>
              <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#f0f9ff', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Date de l'événement</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{selectedAct.date}</div>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fdf4ff', color: '#a21caf', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Lieu</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{selectedAct.lieu}</div>
                  </div>
                </div>
              </div>

              {selectedAct.photos && selectedAct.photos.length > 0 ? (
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', marginBottom: '20px' }}>Galerie Photos ({selectedAct.photos.length})</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                    {selectedAct.photos.map((photo, i) => (
                      <div 
                        key={i} 
                        onClick={() => setLightboxIndex(i)}
                        style={{ borderRadius: '12px', overflow: 'hidden', height: '160px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', cursor: 'pointer' }}
                      >
                        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                  <ImageIcon size={48} style={{ margin: '0 auto 12px auto', opacity: 0.2 }} />
                  <p style={{ margin: 0, fontSize: '16px' }}>Aucune autre photo ajoutée pour cette activité.</p>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Lightbox Portal */}
      {lightboxIndex !== null && selectedAct && selectedAct.photos && createPortal(
        <div 
          style={{ position: 'fixed', inset: 0, zIndex: 999999, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button 
            onClick={() => setLightboxIndex(null)}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '12px', zIndex: 10 }}
          >
            <X size={36} />
          </button>

          {/* Previous button */}
          {lightboxIndex > 0 && (
            <button 
              onClick={prevPhoto}
              style={{ position: 'absolute', left: '24px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '50%', padding: '12px', cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(4px)' }}
            >
              <ChevronLeft size={36} />
            </button>
          )}

          {/* Current Image */}
          <img 
            src={selectedAct.photos[lightboxIndex]} 
            alt="gallery" 
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90%', maxHeight: '90vh', objectFit: 'contain', userSelect: 'none' }} 
          />

          {/* Next button */}
          {lightboxIndex < selectedAct.photos.length - 1 && (
            <button 
              onClick={nextPhoto}
              style={{ position: 'absolute', right: '24px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '50%', padding: '12px', cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(4px)' }}
            >
              <ChevronRight size={36} />
            </button>
          )}

          {/* Counter */}
          <div style={{ position: 'absolute', bottom: '24px', color: '#fff', fontSize: '16px', fontWeight: 'bold', background: 'rgba(0,0,0,0.5)', padding: '6px 16px', borderRadius: '99px' }}>
            {lightboxIndex + 1} / {selectedAct.photos.length}
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
