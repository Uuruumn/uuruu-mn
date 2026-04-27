'use client';
import { useState, useRef } from 'react';

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent, onSwipeLeft: () => void, onSwipeRight: () => void) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onSwipeLeft();
      else onSwipeRight();
    }
    touchStartX.current = null;
  };

  const goNext = () => setActiveIndex(i => (i + 1) % images.length);
  const goPrev = () => setActiveIndex(i => (i - 1 + images.length) % images.length);

  return (
    <>
      {/* メイン画像 - スワイプ対応 */}
      <div
        className="gallery-main"
        style={{ cursor: 'zoom-in', userSelect: 'none' }}
        onClick={() => setLightbox(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={e => handleTouchEnd(e, goNext, goPrev)}
      >
        <img src={images[activeIndex]} alt={title} />
      </div>

      {/* サムネイル - 横スクロール */}
      {images.length > 1 && (
        <div style={{
          display: 'flex',
          gap: 10,
          overflowX: 'auto',
          marginBottom: 14,
          paddingBottom: 6,
          scrollbarWidth: 'none',
        }}>
          {images.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`${title} ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              style={{
                flexShrink: 0,
                width: 80,
                height: 65,
                objectFit: 'cover',
                borderRadius: 12,
                cursor: 'pointer',
                border: i === activeIndex ? '3px solid var(--navy)' : '3px solid transparent',
                opacity: i === activeIndex ? 1 : 0.75,
                transition: '0.2s',
              }}
            />
          ))}
        </div>
      )}

      {/* フルスクリーン - スワイプ対応 */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={e => handleTouchEnd(e, goNext, goPrev)}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
        >
          {images.length > 1 && (
            <button onClick={e => { e.stopPropagation(); goPrev(); }} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: '1.8rem', width: 50, height: 50, borderRadius: '50%', cursor: 'pointer' }}>‹</button>
          )}
          <img src={images[activeIndex]} alt={title} onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 16 }} />
          {images.length > 1 && (
            <button onClick={e => { e.stopPropagation(); goNext(); }} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: '1.8rem', width: 50, height: 50, borderRadius: '50%', cursor: 'pointer' }}>›</button>
          )}
          <button onClick={() => setLightbox(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: '1.4rem', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer' }}>✕</button>
          <div style={{ position: 'absolute', bottom: 24, color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{activeIndex + 1} / {images.length}</div>
        </div>
      )}
    </>
  );
}