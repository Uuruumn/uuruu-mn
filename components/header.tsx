import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { signOut } from '@/app/login/actions';
import { NavLinks, NavActions } from './nav-links';

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="site-header slim-header">
      <div className="container nav-wrap">
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.04em', color: 'var(--fg)' }}>
            Uuruu<span style={{ color: 'var(--gold)' }}>.mn</span>
          </span>
        </Link>
        <NavLinks />
        <div className="nav-actions">
          <NavActions isLoggedIn={!!user} />
          {user && (
            <form action={signOut}>
              <button className="btn btn-ghost" type="submit" style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Гарах</button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}