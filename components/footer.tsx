import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* 上部 */}
        <div className="footer-grid" style={{ paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.04em', marginBottom: 8 }}>
              Uuruu<span style={{ color: 'var(--gold)' }}>.mn</span>
            </div>
            <p className="small-meta" style={{ marginBottom: 12 }}>Үл хөдлөх хөрөнгийн орчин үеийн зарын платформ.</p>
            <p className="small-meta" style={{ marginBottom: 12 }}>
              📞 80702326<br />
              ✉ sonsooch@gmail.com
            </p>
            {/* SNSリンク */}
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              {/* Facebook */}
<a href="https://www.facebook.com/uuruu.mn" target="_blank" rel="noopener noreferrer" style={{
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  width: 38, height: 38, borderRadius: 10, background: '#1877F2', color: 'white',
  textDecoration: 'none'
}}>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
</a>

{/* Instagram */}
<a href="https://www.instagram.com/uuruu.mn" target="_blank" rel="noopener noreferrer" style={{
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  width: 38, height: 38, borderRadius: 10,
  background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
  color: 'white', textDecoration: 'none'
}}>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
  </svg>
</a>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: 12 }}>Холбоос</h4>
            <Link href="/" style={{ display: 'block', color: 'var(--muted)', marginBottom: 8 }}>Нүүр</Link>
            <Link href="/listings" style={{ display: 'block', color: 'var(--muted)', marginBottom: 8 }}>Зарууд</Link>
            <Link href="/post" style={{ display: 'block', color: 'var(--muted)', marginBottom: 8 }}>Зар оруулах</Link>
          </div>
          <div>
            <h4 style={{ marginBottom: 12 }}>Тусламж</h4>
            <Link href="/terms" style={{ display: 'block', color: 'var(--muted)', marginBottom: 8 }}>Үйлчилгээний нөхцөл</Link>
            <Link href="/privacy" style={{ display: 'block', color: 'var(--muted)', marginBottom: 8 }}>Нууцын бодлого</Link>
            <Link href="/login" style={{ display: 'block', color: 'var(--muted)', marginBottom: 8 }}>Нэвтрэх</Link>
          </div>
        </div>

        {/* 下部 */}
        <div style={{
          paddingTop: 20, display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 8
        }}>
          <p className="small-meta" style={{ margin: 0 }}>© 2026 Uuruu.mn. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
}