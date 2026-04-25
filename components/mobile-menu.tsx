'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut } from '@/app/login/actions';

export function MobileMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="mobile-menu-btn"
        type="button"
      >
        {open ? '✕' : '☰'}
      </button>

      {open && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            background: 'white',
            borderBottom: '1px solid var(--border)',
            zIndex: 200,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            boxShadow: '0 8px 24px rgba(15,23,42,0.1)',
          }}
        >
          <Link href="/" onClick={() => setOpen(false)} style={menuItemStyle}>
            Нүүр
          </Link>

          <Link href="/listings" onClick={() => setOpen(false)} style={menuItemStyle}>
            Зарууд
          </Link>

          <Link href="/info" onClick={() => setOpen(false)} style={{
  padding: '12px 0', borderBottom: '1px solid var(--border)',
  color: 'var(--text)', fontWeight: 500, fontSize: '1rem'
}}>Мэдээлэл</Link>

          <Link href="/terms" onClick={() => setOpen(false)} style={menuItemStyle}>
            Үйлчилгээний нөхцөл
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" onClick={() => setOpen(false)} style={menuItemStyle}>
                Миний зарууд
              </Link>

              <button
  onClick={async () => {
    setOpen(false);
    await signOut();
    window.location.href = '/';
  }}
  style={{
    padding: '12px 0',
    color: '#ef4444',
    fontWeight: 600,
    fontSize: '1rem',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    width: '100%',
  }}
>
  Гарах
</button>
            </>
          ) : (
            <Link
              href="/login?mode=login"
              onClick={() => setOpen(false)}
              style={{
                padding: '12px 0',
                color: 'var(--text)',
                fontWeight: 500,
                fontSize: '1rem',
              }}
            >
              Нэвтрэх
            </Link>
          )}
        </div>
      )}
    </>
  );
}

const menuItemStyle = {
  padding: '12px 0',
  borderBottom: '1px solid var(--border)',
  color: 'var(--text)',
  fontWeight: 500,
  fontSize: '1rem',
};