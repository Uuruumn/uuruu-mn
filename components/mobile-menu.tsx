'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { signOut } from '@/app/login/actions';

export function MobileMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // スワイプ検知（ページ全体）
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 60 && !open) setOpen(true);   // 右スワイプで開く
    if (diff < -60 && open) setOpen(false);  // 左スワイプで閉じる
    touchStartX.current = null;
  };

  return (
    <>
      {/* スワイプ検知エリア（画面全体） */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ position: 'fixed', inset: 0, zIndex: open ? 0 : 99, pointerEvents: open ? 'none' : 'auto' }}
      />

      {/* ハンバーガーボタン */}
      <button
        onClick={() => setOpen(!open)}
        className="mobile-menu-btn"
        type="button"
        style={{ zIndex: 301, position: 'relative' }}
      >
        {open ? '✕' : '☰'}
      </button>

      {/* オーバーレイ（外側タップで閉じる） */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 299,
            transition: 'opacity 0.3s',
          }}
        />
      )}

      {/* メニュー本体（右からスライドイン） */}
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
          background: 'white',
          zIndex: 300,
          padding: '72px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          boxShadow: '-8px 0 32px rgba(15,23,42,0.15)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
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
              style={{ padding: '12px 0', color: '#ef4444', fontWeight: 600, fontSize: '1rem', background: 'none', border: 'none', borderBottom: '1px solid var(--border)', textAlign: 'left', cursor: 'pointer', width: '100%' }}
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
  padding: '12px 0',
  borderBottom: '1px solid var(--border)',
  color: 'var(--text)',
  fontWeight: 500,
  fontSize: '1rem',
  textDecoration: 'none',
} as const;