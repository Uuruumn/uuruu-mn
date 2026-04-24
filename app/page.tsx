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
          <div className="eyebrow">Монголын үл хөдлөх хөрөнгийн платформ</div>
          <h1>Өөрт тохирох байр, орон сууцыг олоорой</h1>
          <p className="hero-text">
            Uuruu.mn нь үл хөдлөх хөрөнгө зарах, түрээслэхэд зориулсан цэвэр, орчин үеийн платформ юм.
            Сонирхсон хэрэглэгчид зар оруулагчтай шууд холбогдох боломжтой.
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
                Орон сууц, хашаа байшин, газар зэрэг үл хөдлөх хөрөнгийн зараа
                хурдан, ойлгомжтой байдлаар байршуулна.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">30</div>
              <h3>30 хоног идэвхтэй</h3>
              <p className="small-meta">
                Таны зар 30 хоног нийтлэгдэж, хугацаа дуусмагц автоматаар нуугдана.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">☎</div>
              <h3>Эзэнтэй шууд холбогдоно</h3>
              <p className="small-meta">
                Сонирхсон хэрэглэгчид зар нийтэлсэн хүнтэй шууд холбогдож,
                хурдан тохиролцох боломжтой.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}