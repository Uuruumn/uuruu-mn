import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { updateListing } from './actions';
import { PROPERTY_TYPES, LISTING_TYPES, POSTER_TYPES, UB_DISTRICTS, AIMAGS } from '@/lib/constants';

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?message=Эхлээд нэвтэрнэ үү');

  const { data: listing } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!listing) redirect('/dashboard');

  return (
    <main className="page-main">
      <div className="container form-page-layout">
        <div className="content-card">
          <div className="page-header">
            <div className="section-kicker">Засах</div>
            <h1>Зар засах</h1>
          </div>
          <form className="form-grid" action={updateListing}>
            <input type="hidden" name="id" value={listing.id} />

            {/* Зарын төрөл */}
            <div className="full-width">
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.92rem' }}>Зарын төрөл</label>
              <div style={{ display: 'flex', gap: 20 }}>
                {LISTING_TYPES.map(t => (
                  <label key={t.value} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.95rem' }}>
                    <input
                      type="radio" name="listing_type" value={t.value}
                      defaultChecked={listing.listing_type === t.value}
                      style={{ width: 16, height: 16, accentColor: 'var(--gold)' }}
                    />
                    {t.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Зар оруулагчийн төрөл */}
            <div className="full-width">
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.92rem' }}>Зар оруулагчийн төрөл</label>
              <div style={{ display: 'flex', gap: 20 }}>
                {POSTER_TYPES.map(t => (
                  <label key={t.value} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.95rem' }}>
                    <input
                      type="radio" name="poster_type" value={t.value}
                      defaultChecked={listing.poster_type === t.value}
                      style={{ width: 16, height: 16, accentColor: 'var(--gold)' }}
                    />
                    {t.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Гарчиг */}
            <input className="full-width" name="title" defaultValue={listing.title} required />

            {/* Үл хөдлөхийн төрөл */}
            <select name="property_type" defaultValue={listing.property_type} required>
              {PROPERTY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>

            {/* Байршил */}
            <select name="location" defaultValue={listing.location} required>
              <optgroup label="Улаанбаатар — Дүүрэг">
                {UB_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </optgroup>
              <optgroup label="Аймаг">
                {AIMAGS.map(a => <option key={a} value={a}>{a}</option>)}
              </optgroup>
            </select>

            {/* Google Map */}
            <input
              className="full-width" name="google_map_url" type="url"
              defaultValue={listing.google_map_url ?? ''}
              placeholder="Google Map холбоос (заавал биш)"
            />

            {/* Үнэ, Талбай, Өрөө, Давхар, Он */}
            <input name="price" type="number" defaultValue={listing.price} required placeholder="Үнэ (₮)" />
            <input name="area" type="number" step="0.1" defaultValue={listing.area} required placeholder="Талбай — МКВ (м²)" />
            <input name="rooms" type="number" defaultValue={listing.rooms} required placeholder="Өрөөний тоо" />
            <input name="floor" type="number" defaultValue={listing.floor ?? ''} placeholder="Давхар" />
            <input name="built_year" type="number" defaultValue={listing.built_year ?? ''} placeholder="Ашиглалтад орсон он" />
            <input name="door_count" type="number" defaultValue={listing.door_count ?? ''} placeholder="Нийт хаалга (тоо)" />
            <input name="window_count" type="number" defaultValue={listing.window_count ?? ''} placeholder="Нийт цонх (тоо)" />

            {/* Утас */}
            <input className="full-width" name="phone" defaultValue={listing.phone} required placeholder="Утасны дугаар" />

            {/* Видео */}
            <input
              className="full-width" name="video_url" type="url"
              defaultValue={listing.video_url ?? ''}
              placeholder="YouTube / Facebook видео холбоос (заавал биш)"
            />

            {/* Зураг */}
            <div className="full-width">
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.92rem' }}>
                Зураг солих (заавал биш)
              </label>
              <input name="images" type="file" multiple accept="image/jpeg,image/png,image/webp"
                style={{ height: 'auto', padding: '10px 14px', width: '100%' }} />
              <p className="small-meta" style={{ marginTop: 8 }}>Шинэ зураг оруулвал өмнөх зураг солигдоно.</p>
            </div>

            {/* Тайлбар */}
            <textarea className="full-width" name="description" defaultValue={listing.description} required />

            <button className="btn btn-primary btn-block full-width" type="submit">Хадгалах</button>
          </form>
        </div>
        <aside className="pricing-card">
          <h3 style={{ marginTop: 0 }}>Анхаарах зүйл</h3>
          <p className="small-meta">Засвар хийсний дараа зар шууд хадгалагдана.</p>
        </aside>
      </div>
    </main>
  );
}