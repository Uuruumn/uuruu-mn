'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from '@/app/login/actions';

export function MobileMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // bodyのスクロールを止める
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 60 && !open) setOpen(true);
    if (diff < -60 && open) setOpen(false);
    touchStartX.current = null;
  };

  return (
    <>
      {/* ハンバーガーボタン */}
      <button
        onClick={() => setOpen(v => !v)}
        className="mobile-menu-btn"
        type="button"
      >
        ☰
      </button>

      {/* オーバーレイ */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 998,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* メニュー本体 - 常にDOM上に存在、transformで移動 */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '75vw',
          maxWidth: 300,
          background: '#fff',
          zIndex: 999,
          padding: '80px 24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
          transform: open ? 'translateX(0%)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* 閉じるボタン */}
        <button
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            fontSize: '1.1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >✕</button>

        <Link href="/" onClick={() => setOpen(false)} style={menuItemStyle}>Нүүр</Link>
        <Link href="/listings" onClick={() => setOpen(false)} style={menuItemStyle}>Зарууд</Link>
        <Link href="/info" onClick={() => setOpen(false)} style={menuItemStyle}>Мэдээлэл</Link>
        <Link href="/terms" onClick={() => setOpen(false)} style={menuItemStyle}>Үйлчилгээний нөхцөл</Link>
        <Link href="/favorites" onClick={() => setOpen(false)} style={menuItemStyle}>Хадгалсан зарууд</Link>

        {isLoggedIn ? (
          <>
            <Link href="/dashboard" onClick={() => setOpen(false)} style={menuItemStyle}>Миний зарууд</Link>
            <button
              onClick={async () => { setOpen(false); await signOut(); window.location.href = '/'; }}
              style={{ padding: '14px 0', color: '#ef4444', fontWeight: 600, fontSize: '1rem', background: 'none', border: 'none', borderBottom: '1px solid var(--border)', textAlign: 'left', cursor: 'pointer', width: '100%' }}
            >
              Гарах
            </button>
          </>
        ) : (
          <Link href="/login?mode=login" onClick={() => setOpen(false)} style={menuItemStyle}>Нэвтрэх</Link>
        )}
      </div>
    </>
  );
}

const menuItemStyle = {
  padding: '14px 0',
  borderBottom: '1px solid var(--border)',
  color: 'var(--text)',
  fontWeight: 500,
  fontSize: '1rem',
  textDecoration: 'none',
} as const;