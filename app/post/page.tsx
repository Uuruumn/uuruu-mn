import { createClient } from '@/lib/supabase-server';
import { PROPERTY_TYPES, LISTING_TYPES, POSTER_TYPES, UB_DISTRICTS, AIMAGS } from '@/lib/constants';
import { createListing } from './actions';
import PostForm from './post-form';

export default async function PostPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="page-main">
        <div className="container" style={{ maxWidth: 560, textAlign: 'center', paddingTop: 60, paddingBottom: 80 }}>
          <div style={{ fontSize: '3rem', marginBottom: 20 }}>🏠</div>
          <h1 style={{ fontSize: '2rem', letterSpacing: '-0.04em', marginBottom: 12 }}>Зар оруулахын тулд нэвтэрнэ үү</h1>
          <p className="small-meta" style={{ marginBottom: 32 }}>
            Зар байршуулахын тулд эхлээд бүртгэл үүсгэх эсвэл нэвтэрнэ үү.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/login" className="btn btn-primary" style={{ minWidth: 160 }}>Нэвтрэх</a>
            <a href="/login?tab=register" className="btn btn-ghost" style={{ minWidth: 160 }}>Бүртгүүлэх</a>
          </div>
        </div>
      </main>
    );
  }

  const { message } = await searchParams;

  return (
    <main className="page-main">
      <div className="container form-page-layout">
        <div className="content-card">
          <div className="page-header">
            <div className="section-kicker">Зар оруулах</div>
            <h1>Мэдээлэл бөглөх</h1>
            <p className="small-meta">Мэдээллээ илгээсний дараа төлбөрөө хийж баталгаажуулна.</p>
          </div>
          {message && (
            <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '12px 16px', borderRadius: 12, marginBottom: 16 }}>
              {message}
            </div>
          )}
          <PostForm />
        </div>
        <aside className="pricing-card">
          <h3 style={{ marginTop: 0 }}>Яаж ажилладаг вэ?</h3>
          <div style={{ display: 'grid', gap: 14, marginTop: 4 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--gold)', minWidth: 24 }}>1</span>
              <div>
                <strong style={{ display: 'block', marginBottom: 4 }}>Мэдээлэл бөглөх</strong>
                <p className="small-meta" style={{ margin: 0 }}>Зарын мэдээллээ бүрэн бөглөж илгээнэ үү.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--gold)', minWidth: 24 }}>2</span>
              <div>
                <strong style={{ display: 'block', marginBottom: 4 }}>Төлбөр хийх</strong>
                <p className="small-meta" style={{ margin: 0 }}>Зар илгээсний дараа <strong>25,000₮</strong> төлбөрөө хийнэ үү.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--gold)', minWidth: 24 }}>3</span>
              <div>
                <strong style={{ display: 'block', marginBottom: 4 }}>Автоматаар нийтлэгдэнэ</strong>
                <p className="small-meta" style={{ margin: 0 }}>Төлбөр баталгаажсаны дараа зар <strong>30 хоног</strong> нийтлэгдэнэ.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}