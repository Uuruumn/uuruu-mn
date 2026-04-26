import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { formatDate, formatPrice } from '@/lib/utils';
import { ListingCard } from '@/components/listing-card';
import { ImageGallery } from '@/components/image-gallery';
import PhoneRevealButton from '@/components/phone-reveal-button';
import { FavoriteButton } from '@/components/favorite-button';
import {
  BUILDING_MATERIALS,
  WINDOW_TYPES,
  FLOOR_TYPES,
  RENOVATION_TYPES,
} from '@/lib/constants';

function getLabel(list: readonly { value: string; label: string }[], value: string | null) {
  if (!value) return '';
  return list.find(item => item.value === value)?.label || value;
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const now = new Date().toISOString();

  const { data: listing } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .eq('status', 'approved')
    .gt('expires_at', now)
    .single();

  if (!listing) notFound();

  const allImages: string[] = [
    ...(listing.image_url ? [listing.image_url] : []),
    ...(listing.extra_images || []),
  ];

  const fallback =
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80';

  const { data: related } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'approved')
    .gt('expires_at', now)
    .neq('id', id)
    .or(`location.eq.${listing.location},property_type.eq.${listing.property_type}`)
    .order('created_at', { ascending: false })
    .limit(3);

  const LISTING_TYPE_LABEL: Record<string, string> = {
    sale: 'Зарах',
    rent: 'Түрээслэх',
  };

  const PROPERTY_TYPE_LABEL: Record<string, string> = {
    apartment: 'Орон сууц',
    house: 'Хашаа байшин',
    land: 'Газар',
  };

  return (
    <main className="page-main detail-layout">
      <div className="container detail-grid">
        <div>
          <div style={{ position: 'relative' }}>
            <ImageGallery
              images={allImages.length > 0 ? allImages : [fallback]}
              title={listing.title}
            />

            <div style={{ position: 'absolute', top: 18, right: 18, zIndex: 5 }}>
              <FavoriteButton listingId={listing.id} />
            </div>
          </div>

          <div className="info-card">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              {listing.listing_type && (
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    background:
                      listing.listing_type === 'sale'
                        ? 'rgba(16,185,129,0.12)'
                        : 'rgba(99,102,241,0.12)',
                    color: listing.listing_type === 'sale' ? '#10b981' : '#6366f1',
                  }}
                >
                  {LISTING_TYPE_LABEL[listing.listing_type] ?? listing.listing_type}
                </span>
              )}

              {listing.property_type && (
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    background: 'rgba(148,163,184,0.12)',
                    color: '#64748b',
                  }}
                >
                  {PROPERTY_TYPE_LABEL[listing.property_type] ?? listing.property_type}
                </span>
              )}
            </div>

            <div className="section-kicker">Зарын дэлгэрэнгүй</div>
            <h1 style={{ marginTop: 10 }}>{listing.title}</h1>

            <div className="info-section">
              <h3>Үндсэн мэдээлэл</h3>
              <div className="info-list">
                <div>
                  <strong>📍 Байршил</strong>
                  {listing.location}
                  {listing.district ? ` — ${listing.district}` : ''}
                  {listing.khoroo ? `, ${listing.khoroo}-р хороо` : ''}
                </div>

                <div>
                  <strong>💰 Үнэ</strong>
                  {formatPrice(Number(listing.price))}
                  {listing.listing_type === 'rent' ? '/сар' : ''}
                </div>

                <div>
                  <strong>📐 Талбай</strong>
                  {listing.area} м²
                </div>

                <div>
                  <strong>🛏 Өрөө</strong>
                  {listing.rooms}
                </div>

                {listing.floor != null && (
                  <div>
                    <strong>🏢 Давхар</strong>
                    {listing.floor}
                  </div>
                )}

                {listing.built_year && (
                  <div>
                    <strong>📅 Ашиглалтад орсон он</strong>
                    {listing.built_year}
                  </div>
                )}
              </div>
            </div>

            <div className="info-section">
              <h3>Барилгын мэдээлэл</h3>
              <div className="info-list">
                {listing.building_material && (
                  <div>
                    <strong>🧱 Барилгын материал</strong>
                    {getLabel(BUILDING_MATERIALS, listing.building_material)}
                  </div>
                )}

                {listing.window_type && (
                  <div>
                    <strong>🪟 Цонхны төрөл</strong>
                    {getLabel(WINDOW_TYPES, listing.window_type)}
                  </div>
                )}

                {listing.floor_type && (
                  <div>
                    <strong>🪵 Шалны материал</strong>
                    {getLabel(FLOOR_TYPES, listing.floor_type)}
                  </div>
                )}

                {listing.renovation && (
                  <div>
                    <strong>🛠 Засварын байдал</strong>
                    {getLabel(RENOVATION_TYPES, listing.renovation)}
                  </div>
                )}

                {listing.window_count != null && (
                  <div>
                    <strong>🔲 Нийт цонх</strong>
                    {listing.window_count}
                  </div>
                )}

                {listing.balcony && (
                  <div>
                    <strong>🌤 Тагт</strong>
                    {listing.balcony === 'yes' ? 'Тийм' : 'Үгүй'}
                  </div>
                )}
              </div>
            </div>

            {(listing.company_name || listing.company_register) && (
              <div className="info-section">
                <h3>Зар оруулагчийн мэдээлэл</h3>
                <div className="info-list">
                  {listing.company_name && (
                    <div>
                      <strong>Компанийн нэр</strong>
                      {listing.company_name}
                    </div>
                  )}

                  {listing.company_register && (
                    <div>
                      <strong>Регистрийн дугаар</strong>
                      {listing.company_register}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="detail-box">
              <strong>Тайлбар</strong>
              <p className="small-meta" style={{ marginBottom: 0, marginTop: 8 }}>
                {listing.description}
              </p>
            </div>

            {listing.google_map_url && (
              <div className="detail-box" style={{ marginTop: 14 }}>
                <strong>Google Map</strong>
                <div style={{ marginTop: 8, textAlign: 'center' }}>
                  <a
                    href={listing.google_map_url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}
                  >
                    Google Map харах
                  </a>
                </div>
              </div>
            )}

            {listing.video_url && (
              <div className="detail-box" style={{ marginTop: 14 }}>
                <strong>Видео</strong>
                <div style={{ marginTop: 8, textAlign: 'center' }}>
                  <a
                    href={listing.video_url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                    style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}
                  >
                    Видео үзэх
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="contact-card">
          <div className="status-badge live">Нийтлэгдсэн</div>

          <h2 className="price-big">
            {formatPrice(Number(listing.price))}
            {listing.listing_type === 'rent' ? '/сар' : ''}
          </h2>

          <div className="contact-btn-wrap">
            <PhoneRevealButton phone={listing.phone} fullWidth />
          </div>

          <div className="quick-info">
            <div>🛏 {listing.rooms} өрөө</div>
            <div>📐 {listing.area} м²</div>
            <div>🏢 {listing.floor ?? '-'} давхар</div>
          </div>

          <div className="detail-box" style={{ marginTop: 14 }}>
            <strong>Байршил</strong>
            <div>{listing.location}</div>
          </div>

          <div className="detail-box" style={{ marginTop: 14 }}>
            <strong>Зарын хугацаа дуусах огноо</strong>
            <div>{formatDate(listing.expires_at)}</div>
          </div>
        </aside>
      </div>

      {related && related.length > 0 && (
        <div className="container" style={{ marginTop: 60, paddingBottom: 60 }}>
          <div className="section-head" style={{ marginBottom: 24 }}>
            <div>
              <div className="section-kicker">Төстэй зарууд</div>
              <h2 style={{ margin: '8px 0 0' }}>Танд таалагдаж болох зарууд</h2>
            </div>
            <a href="/listings" className="text-link">
              Бүгдийг харах
            </a>
          </div>

          <div className="cards-grid">
            {related.map((item: any) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}