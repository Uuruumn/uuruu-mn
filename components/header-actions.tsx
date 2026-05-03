'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/app/login/actions';

export function HeaderActions({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();

  const isPost = pathname === '/post';
  const isDashboard = pathname === '/dashboard';

  const baseStyle = {
    height: 40,
    padding: '0 16px',
    fontSize: '0.9rem',
  };

  if (!isLoggedIn) {
    return (
      <>
        <Link href="/login?mode=login" className="btn btn-ghost" style={baseStyle}>
          Нэвтрэх
        </Link>

        <Link href="/login?redirect=/post" className="btn btn-primary" style={baseStyle}>
          Зар оруулах
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href="/post"
        className="btn btn-ghost"
        style={{
          ...baseStyle,
          background: isPost ? '#0f172a' : 'transparent',
          color: isPost ? 'white' : 'var(--text)',
        }}
      >
        Зар оруулах
      </Link>

      <Link
        href="/dashboard"
        className="btn btn-ghost"
        style={{
          ...baseStyle,
          background: isDashboard ? '#0f172a' : 'transparent',
          color: isDashboard ? 'white' : 'var(--text)',
        }}
      >
        Миний зарууд
      </Link>

      <form action={signOut}>
        <button
          className="btn btn-ghost"
          type="submit"
          style={{
            ...baseStyle,
            color: 'var(--muted)',
          }}
        >
          Гарах
        </button>
      </form>
    </>
  );
}