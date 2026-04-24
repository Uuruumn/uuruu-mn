'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLinks() {
  const pathname = usePathname();

  const linkStyle = (href: string) => ({
    color: pathname === href ? 'var(--text)' : 'var(--muted)',
    fontWeight: pathname === href ? 700 : 500,
    borderBottom: pathname === href ? '2px solid var(--gold)' : '2px solid transparent',
    paddingBottom: 2,
  });

  return (
    <nav className="nav">
      <Link href="/" style={linkStyle('/')}>Нүүр</Link>
      <Link href="/listings" style={linkStyle('/listings')}>Зарууд</Link>
      <Link href="/terms" style={linkStyle('/terms')}>Үйлчилгээний нөхцөл</Link>
    </nav>
  );
}

export function NavActions({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();

  const btnStyle = (href: string) => ({
    background: pathname === href ? 'var(--navy)' : 'rgba(255,255,255,0.7)',
    color: pathname === href ? 'white' : 'var(--text)',
    border: '1px solid var(--border)',
  });

  if (!isLoggedIn) {
    return (
      <div className="nav-actions">
        <Link href="/login" className="btn btn-ghost">Нэвтрэх</Link>
        <Link href="/login?redirect=/post" className="btn btn-primary">Зар оруулах</Link>
      </div>
    );
  }

  return (
    <div className="nav-actions">
      <Link href="/post" className="btn" style={btnStyle('/post')}>Зар оруулах</Link>
      <Link href="/dashboard" className="btn" style={btnStyle('/dashboard')}>Миний зарууд</Link>
    </div>
  );
}