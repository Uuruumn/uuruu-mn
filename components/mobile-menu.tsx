'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/app/login/actions';
import { Home, List, Info, FileText, Heart, FolderOpen, LogIn, LogOut } from 'lucide-react';

export function MobileMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const touchStartX = useRef<number | null>(null);

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

  const menuItems = [
    { href: '/', label: 'Нүүр', icon: Home },
    { href: '/listings', label: 'Зарууд', icon: List },
    { href: '/info', label: 'Мэдээлэл', icon: Info },
    { href: '/terms', label: 'Үйлчилгээний нөхцөл', icon: FileText },
    { href: '/favorites', label: 'Хадгалсан зарууд', icon: Heart },
    ...(isLoggedIn ? [{ href: '/dashboard', label: 'Миний зарууд', icon: FolderOpen }] : []),
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <button onClick={() => setOpen(v => !v)} className="mobile-menu-btn" type="button">
        ☰
      </button>

      {/* オーバーレイ */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(15,23,42,0.5)',
          zIndex: 999,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* メニュー本体 */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: '78vw', maxWidth: 320,
          background: '#fff',
          zIndex: 1000,
          display: 'flex', flexDirection: 'column',
          boxShadow: '-8px 0 40px rgba(15,23,42,0.18)',
          transform: open ? 'translateX(0%)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* ヘッダー */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontWeight: 900, fontSize: '1.45rem', letterSpacing: '-0.05em' }}>
  Uuruu<span style={{ color: 'var(--gold)' }}>.mn</span>
</span>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: '#f1f5f9', border: 'none', borderRadius: '50%',
              width: 36, height: 36, fontSize: '1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)',
            }}
          >✕</button>
        </div>

        {/* メニュー項目 */}
        <div style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
          {menuItems.map(item => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '15px 24px',
                  color: active ? 'var(--navy)' : 'var(--muted)',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.97rem',
                  borderBottom: '1px solid var(--border)',
                  borderLeft: active ? '3px solid var(--gold)' : '3px solid transparent',
                  background: active ? 'rgba(201,162,39,0.06)' : 'transparent',
                  transition: 'all 0.15s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(201,162,39,0.04)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }
                }}
              >
                <Icon size={18} strokeWidth={active ? 2.2 : 1.8} color={active ? 'var(--gold)' : 'currentColor'} />
                {item.label}
              </Link>
            );
          })}

          {isLoggedIn ? (
            <button
              onClick={async () => { setOpen(false); await signOut(); window.location.href = '/'; }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '15px 24px',
                color: '#ef4444', fontWeight: 600, fontSize: '0.97rem',
                background: 'none', border: 'none',
                borderBottom: '1px solid var(--border)',
                borderLeft: '3px solid transparent',
                width: '100%', cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <LogOut size={18} strokeWidth={1.8} />
              Гарах
            </button>
          ) : (
            <Link
              href="/login?mode=login"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '15px 24px',
                color: 'var(--muted)', fontWeight: 500, fontSize: '0.97rem',
                borderBottom: '1px solid var(--border)',
                borderLeft: '3px solid transparent',
                transition: 'all 0.15s ease',
                textDecoration: 'none',
              }}
            >
              <LogIn size={18} strokeWidth={1.8} />
              Нэвтрэх
            </Link>
          )}
        </div>

        {/* フッター */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border)',
          color: 'rgba(148,163,184,0.6)', fontSize: '0.75rem', textAlign: 'center',
        }}>
          © 2026 Uuruu.mn
        </div>
      </div>
    </>
  );
}