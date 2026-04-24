import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('manage_session');
  console.log('SESSION COOKIE:', session);
  if (!session || session.value !== 'authenticated') {
    redirect('/manage/login');
  }

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
      <header style={{
        background: '#0f172a',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 64, gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ background: '#c9a227', color: '#0f172a', fontWeight: 800, padding: '4px 12px', borderRadius: 8, fontSize: '0.8rem', letterSpacing: '0.1em' }}>ADMIN</span>
            <strong style={{ fontSize: '1.1rem', color: '#f8fafc' }}>Uuruu.mn удирдлага</strong>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/" style={{ color: '#94a3b8', fontSize: '0.9rem', padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none' }}>
              ← Сайт руу буцах
            </Link>
            <form action="/api/manage-logout" method="POST">
              <button type="submit" style={{ background: '#c9a227', color: '#0f172a', fontWeight: 700, padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
                Гарах
              </button>
            </form>
          </div>
        </div>
      </header>
      <main style={{ padding: '36px 0 72px' }}>{children}</main>
    </div>
  );
}