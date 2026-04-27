import { SearchBar } from '@/components/search-bar';
import { ListingCard } from '@/components/listing-card';
import { createClient } from '@/lib/supabase-server';

export default async function HomePage() {
  const supabase = await createClient();
  const now = new Date().toISOString();
  const { data: listings } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'approved')
    .gt('expires_at', now)
    .order('created_at', { ascending: false })
    .limit(6);

  return (
    <main>
      <section className="hero">
        <div className="container hero-content">
         <div className="eyebrow">Орон сууц • Газар • Байшин • Бизнес</div>
<h1>Өөрт тохирох үл хөдлөхөө олоорой</h1>
<p className="hero-text">
  <span className="desktop-only">Uuruu.mn нь орон сууц, газар, байшин, бизнесийн талбайг зарах, түрээслэхэд зориулсан орчин үеийн платформ юм.</span>
  <span className="mobile-only" style={{ display: 'none' }}>Зуучлалгүйгээр эзэмшигчтэй шууд холбогдоно</span>
</p>
          <SearchBar />
        </div>
      </section>

      <section className="section muted-section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-kicker">Сүүлийн зарууд</div>
              <h2>Шинэ зарууд</h2>
            </div>
            <a href="/listings" className="text-link">Бүгдийг харах</a>
          </div>
          <div className="cards-grid">
            {(listings ?? []).map((listing: any) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
            {(!listings || listings.length === 0) && (
              <div style={{ color: 'var(--muted)', padding: '40px 0' }}>
                Одоогоор зар байхгүй байна.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" style={{ marginBottom: '24px' }}>
            <div>
              <div className="section-kicker">Давуу тал</div>
              <h2>Яагаад Uuruu.mn гэж?</h2>
            </div>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Зар нэмэхэд амархан</h3>
              <p className="small-meta">
                Орон сууц, газар, хашаа байшингаа хэдхэн алхмаар хурдан байршуулна.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">30</div>
              <h3>30 хоног идэвхтэй</h3>
              <p className="small-meta">
                Таны зар 30 хоног нийтлэгдэж, дараа нь автоматаар нуугдана.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">☎</div>
              <h3>Эзэнтэй шууд холбогдоно</h3>
              <p className="small-meta">
                Зуучлалгүйгээр худалдан авагч болон эзэмшигч шууд холбогдоно.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}