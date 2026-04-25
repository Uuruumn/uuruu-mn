import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { NavLinks } from './nav-links';
import { MobileMenu } from './mobile-menu';
import { signOut } from '@/app/login/actions';
import { HeaderActions } from './header-actions';

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        {/* ロゴ */}
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: '1.4rem',
              letterSpacing: '-0.04em',
              color: 'var(--text)',
            }}
          >
            Uuruu<span style={{ color: 'var(--gold)' }}>.mn</span>
          </span>
        </Link>

        {/* PCナビ */}
        <div className="desktop-menu">
          <NavLinks />
        </div>

        {/* PC右側ボタン */}
        <div className="desktop-menu" style={{ gap: 10 }}>
  <HeaderActions isLoggedIn={!!user} />
</div>
        {/* スマホ右側 */}
        <div className="mobile-only">
          <Link
            href={user ? "/post" : "/login?redirect=/post"}
            className="btn btn-primary"
            style={{ height: 38, padding: '0 12px', fontSize: '0.85rem' }}
          >
            Зар оруулах
          </Link>

          <MobileMenu isLoggedIn={!!user} />
        </div>
      </div>
    </header>
  );
}