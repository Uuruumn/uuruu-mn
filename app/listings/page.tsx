import { ListingCard } from '@/components/listing-card';
import { createClient } from '@/lib/supabase-server';
import { PROPERTY_TYPES, LISTING_TYPES, UB_DISTRICTS, AIMAGS } from '@/lib/constants';

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string; property_type?: string; rooms?: string; listing_type?: string }>;
}) {
  const { location, property_type, rooms, listing_type } = await searchParams;
  const supabase = await createClient();
  const now = new Date().toISOString();

  let query = supabase
    .from('listings')
    .select('*')
    .eq('status', 'approved')
    .gt('expires_at', now)
    .order('created_at', { ascending: false });

  if (location) query = query.eq('location', location);
  if (property_type) query = query.eq('property_type', property_type);
  if (listing_type) query = query.eq('listing_type', listing_type);
  if (rooms) {
    const r = Number(rooms);
    if (r === 4) query = query.gte('rooms', 4);
    else query = query.eq('rooms', r);
  }

  const { data: listings } = await query;

  return (
    <main className="page-main">
      <div className="container">
        <div className="listings-topbar">
          <div>
            <div className="section-kicker">Зарууд</div>
            <h1 style={{ margin: '10px 0 0' }}>Нийтлэгдсэн зарууд</h1>
          </div>
          <span className="small-meta">{listings?.length ?? 0} зар олдлоо</span>
        </div>

        <div className="listing-layout">
          <section>
            {listings && listings.length > 0 ? (
              <div className="cards-grid">
                {listings.map((listing: any) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🏠</div>
                <p>Одоогоор зар олдсонгүй.</p>
                <a href="/listings" className="text-link">Бүх зар харах</a>
              </div>
            )}
          </section>

          <aside className="filters-card">
            <div className="section-kicker">Шүүлт</div>
            <h2 style={{ marginTop: 10, marginBottom: 20 }}>Зар шүүх</h2>
            <form className="compact-form" method="GET">
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: '0.88rem' }}>Зарлалын төрөл</label>
                <select name="listing_type" defaultValue={listing_type || ''}>
                  <option value="">Бүх төрөл</option>
                  {LISTING_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: '0.88rem' }}>Байршил</label>
                <select name="location" defaultValue={location || ''}>
                  <option value="">Бүх байршил</option>
                  <optgroup label="Улаанбаатар — Дүүрэг">
                    {UB_DISTRICTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Аймаг">
                    {AIMAGS.map(a => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: '0.88rem' }}>Үл хөдлөхийн төрөл</label>
                <select name="property_type" defaultValue={property_type || ''}>
                  <option value="">Бүх төрөл</option>
                  {PROPERTY_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: '0.88rem' }}>Өрөөний тоо</label>
                <select name="rooms" defaultValue={rooms || ''}>
                  <option value="">Бүх өрөө</option>
                  <option value="1">1 өрөө</option>
                  <option value="2">2 өрөө</option>
                  <option value="3">3 өрөө</option>
                  <option value="4">4+ өрөө</option>
                </select>
              </div>
              <button className="btn btn-primary btn-block" type="submit">Хайх</button>
              {(location || property_type || rooms || listing_type) && (
                <a href="/listings" className="btn btn-ghost btn-block" style={{ textAlign: 'center' }}>Арилгах</a>
              )}
            </form>
          </aside>
        </div>
      </div>
    </main>
  );
}