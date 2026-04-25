import { createClient } from '@/lib/supabase-server';
import Link from 'next/link';

export default async function InfoPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  return (
    <main className="page-main">
      <div className="container">
        <div className="page-header">
          <div className="section-kicker">Мэдээлэл</div>
          <h1>Үл хөдлөхийн мэдээ, мэдээлэл</h1>
          <p className="small-meta" style={{ marginTop: 8 }}>
            Монголын үл хөдлөх хөрөнгийн зах зээлийн мэдээ, дүн шинжилгээ
          </p>
        </div>

        {articles && articles.length > 0 ? (
          <div style={{ display: 'grid', gap: 20 }}>
            {articles.map((article: any) => (
              <div key={article.id} style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: '28px 32px',
                boxShadow: 'var(--shadow)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      background: 'rgba(201,162,39,0.12)',
                      color: 'var(--gold)',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      padding: '4px 10px',
                      borderRadius: 999,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}>
                      {article.category === 'news' ? 'Мэдээ' :
                       article.category === 'price' ? 'Үнийн мэдээлэл' :
                       article.category === 'law' ? 'Хууль, дүрэм' : 'Мэдээлэл'}
                    </span>
                    {article.image_url && (
  <img
    src={article.image_url}
    alt={article.title}
    style={{
      width: '100%',
      height: 220,
      objectFit: 'cover',
      borderRadius: 14,
      marginBottom: 16,
    }}
  />
)}
                    <h2 style={{ margin: '12px 0 8px', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                      {article.title}
                    </h2>
                    <p style={{ color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
                      {article.content}
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: 16, color: 'var(--muted)', fontSize: '0.85rem' }}>
                  {new Date(article.created_at).toLocaleDateString('mn-MN')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📰</div>
            <p>Одоогоор мэдээлэл байхгүй байна.</p>
          </div>
        )}
      </div>
    </main>
  );
}