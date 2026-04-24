'use client';
import { useState } from 'react';

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div className="gallery-main" style={{ cursor: 'zoom-in' }} onClick={() => setLightbox(true)}>
        <img src={images[activeIndex]} alt={title} />
      </div>

      {images.length > 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
          {images.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`${title} ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              style={{
                width: '100%', height: 120, objectFit: 'cover', borderRadius: 14,
                cursor: 'pointer',
                border: i === activeIndex ? '3px solid var(--navy)' : '3px solid transparent',
                opacity: i === activeIndex ? 1 : 0.75,
                transition: '0.2s',
              }}
            />
          ))}
        </div>
      )}

      {lightbox && (
        <div onClick={() => setLightbox(false)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          {images.length > 1 && (
            <button onClick={e => { e.stopPropagation(); setActiveIndex(i => (i - 1 + images.length) % images.length); }} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: '1.8rem', width: 50, height: 50, borderRadius: '50%', cursor: 'pointer' }}>‹</button>
          )}
          <img src={images[activeIndex]} alt={title} onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 16 }} />
          {images.length > 1 && (
            <button onClick={e => { e.stopPropagation(); setActiveIndex(i => (i + 1) % images.length); }} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: '1.8rem', width: 50, height: 50, borderRadius: '50%', cursor: 'pointer' }}>›</button>
          )}
          <button onClick={() => setLightbox(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: '1.4rem', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer' }}>✕</button>
          <div style={{ position: 'absolute', bottom: 24, color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{activeIndex + 1} / {images.length}</div>
        </div>
      )}
    </>
  );
}