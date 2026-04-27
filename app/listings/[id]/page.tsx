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
import {
  MapPin, Banknote, Maximize2, BedDouble, Building2, CalendarDays,
  Map, Video, Layers, Droplets, Fence, Flame, Grid2x2, Wind, Hammer,
} from 'lucide-react';

function getLabel(list: readonly { value: string; label: string }[], value: string | null) {
  if (!value) return '';
  return list.find(item => item.value === value)?.label || value;
}

const InfoItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div style={{
    background: '#f8fafc', borderRadius: 14, padding: '14px 16px',
    border: '1px solid var(--border)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
      <Icon size={14} color="#94a3b8" strokeWidth={2} />
      <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
    </div>
    <div style={{ fontWeight: 700, fontSize: '0.97rem', color: 'var(--navy)' }}>{value}</div>
  </div>
);

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{
    background: '#fff', borderRadius: 20, padding: '24px',
    boxShadow: '0 2px 16px rgba(15,23,42,0.05)', marginBottom: 16,
    border: '1px solid rgba(15,23,42,0.07)',
  }}>
    <h3 style={{ margin: '0 0 16px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.02em' }}>
      {title}
    </h3>
    {children}
  </div>
);

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
    commercial: 'Үйлчилгээний талбай',
  };

  const infoItems = [
    listing.location && { icon: MapPin, label: 'Байршил', value: `${listing.location}${listing.district ? ` — ${listing.district}` : ''}${listing.khoroo ? `, ${listing.khoroo}-р хороо` : ''}` },
    listing.price && { icon: Banknote, label: 'Үнэ', value: `${formatPrice(Number(listing.price))}${listing.listing_type === 'rent' ? '/сар' : ''}` },
    listing.area && { icon: Maximize2, label: 'Талбай', value: `${listing.area} м²` },
    listing.rooms && { icon: BedDouble, label: 'Өрөө', value: `${listing.rooms}` },
    listing.floor != null && { icon: Building2, label: 'Давхар', value: `${listing.floor}` },
    listing.built_year && { icon: CalendarDays, label: 'Ашиглалтад орсон он', value: `${listing.built_year}` },
    listing.land_area && { icon: Maximize2, label: 'Газрын хэмжээ', value: `${listing.land_area} м²` },
  ].filter(Boolean) as { icon: any; label: string; value: string }[];

  const buildingItems = [
    listing.building_material && { icon: Layers, label: 'Барилгын материал', value: getLabel(BUILDING_MATERIALS, listing.building_material) },
    listing.window_type && { icon: Wind, label: 'Цонхны төрөл', value: getLabel(WINDOW_TYPES, listing.window_type) },
    listing.floor_type && { icon: Grid2x2, label: 'Шалны материал', value: getLabel(FLOOR_TYPES, listing.floor_type) },
    listing.renovation && { icon: Hammer, label: 'Засварын байдал', value: getLabel(RENOVATION_TYPES, listing.renovation) },
    listing.window_count != null && { icon: Grid2x2, label: 'Нийт цонх', value: `${listing.window_count}` },
    listing.balcony && { icon: Building2, label: 'Тагт', value: listing.balcony === 'yes' ? 'Тийм' : 'Үгүй' },
    listing.heating && { icon: Flame, label: 'Дулаан', value: listing.heating },
    listing.water && { icon: Droplets, label: 'Ус', value: listing.water },
    listing.fence && { icon: Fence, label: 'Хашаа', value: listing.fence },
  ].filter(Boolean) as { icon: any; label: string; value: string }[];

  return (
    <main className="page-main detail-layout">
      <div className="container detail-grid">
        {/* 左カラム */}
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

          {/* タイトルエリア */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              {listing.listing_type && (
                <span style={{
                  padding: '4px 12px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700,
                  background: listing.listing_type === 'sale' ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.12)',
                  color: listing.listing_type === 'sale' ? '#10b981' : '#6366f1',
                }}>
                  {LISTING_TYPE_LABEL[listing.listing_type] ?? listing.listing_type}
                </span>
              )}
              {listing.property_type && (
                <span style={{
                  padding: '4px 12px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700,
                  background: 'rgba(148,163,184,0.12)', color: '#64748b',
                }}>
                  {PROPERTY_TYPE_LABEL[listing.property_type] ?? listing.property_type}
                </span>
              )}
            </div>
            <div className="section-kicker">Зарын дэлгэрэнгүй</div>
            <h1 style={{ marginTop: 8, marginBottom: 0 }}>{listing.title}</h1>
          </div>

          {/* 基本情報 */}
          <SectionCard title="Үндсэн мэдээлэл">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {infoItems.map((item, i) => (
                <InfoItem key={i} icon={item.icon} label={item.label} value={item.value} />
              ))}
            </div>
          </SectionCard>

          {/* 建物情報 */}
          {buildingItems.length > 0 && (
            <SectionCard title="Барилгын мэдээлэл">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {buildingItems.map((item, i) => (
                  <InfoItem key={i} icon={item.icon} label={item.label} value={item.value} />
                ))}
              </div>
            </SectionCard>
          )}

          {/* 会社情報 */}
          {(listing.company_name || listing.company_register) && (
            <SectionCard title="Зар оруулагчийн мэдээлэл">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {listing.company_name && (
                  <InfoItem icon={Building2} label="Компанийн нэр" value={listing.company_name} />
                )}
                {listing.company_register && (
                  <InfoItem icon={Building2} label="Регистрийн дугаар" value={listing.company_register} />
                )}
              </div>
            </SectionCard>
          )}

          {/* 説明文 */}
          <SectionCard title="Тайлбар">
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.97rem' }}>
              {listing.description}
            </p>
          </SectionCard>

          {/* Google Map / Video */}
          {(listing.google_map_url || listing.video_url) && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: listing.google_map_url && listing.video_url ? '1fr 1fr' : '1fr',
              gap: 10, marginBottom: 16,
            }}>
              {listing.google_map_url && (
                <a href={listing.google_map_url as string} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '14px', borderRadius: 14, background: '#fff',
                    border: '1px solid var(--border)', fontWeight: 600, fontSize: '0.9rem',
                    color: 'var(--navy)', transition: 'all 0.2s',
                  }}
                >
                  <Map size={16} /> Google Map харах
                </a>
              )}
              {listing.video_url && (
                <a href={listing.video_url as string} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '14px', borderRadius: 14, background: '#fff',
                    border: '1px solid var(--border)', fontWeight: 600, fontSize: '0.9rem',
                    color: 'var(--navy)', transition: 'all 0.2s',
                  }}
                >
                  <Video size={16} /> Видео үзэх
                </a>
              )}
            </div>
          )}
        </div>

        {/* 右サイドバー */}
        <aside className="contact-card">
          <div style={{ marginBottom: 16 }}>
            <span style={{
              display: 'inline-block', padding: '5px 14px', borderRadius: 999,
              background: 'rgba(16,185,129,0.12)', color: '#10b981',
              fontSize: '0.82rem', fontWeight: 700,
            }}>
              ✓ Нийтлэгдсэн
            </span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 4, fontWeight: 500 }}>Үнэ</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--navy)', lineHeight: 1.1 }}>
              {formatPrice(Number(listing.price))}
              {listing.listing_type === 'rent' && (
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--muted)' }}>/сар</span>
              )}
            </div>
          </div>

          <PhoneRevealButton phone={listing.phone} fullWidth />

          {/* スペック */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
            marginTop: 20, padding: '16px 0',
            borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
          }}>
            {listing.rooms > 0 && (
              <div style={{ textAlign: 'center' }}>
                <BedDouble size={18} color="#94a3b8" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{listing.rooms}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>өрөө</div>
              </div>
            )}
            {listing.area > 0 && (
              <div style={{ textAlign: 'center' }}>
                <Maximize2 size={18} color="#94a3b8" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{listing.area}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>м²</div>
              </div>
            )}
            {listing.floor != null && (
              <div style={{ textAlign: 'center' }}>
                <Building2 size={18} color="#94a3b8" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{listing.floor}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>давхар</div>
              </div>
            )}
          </div>

          {/* 掲載期限 */}
          <div style={{
            marginTop: 10, padding: '14px 16px', borderRadius: 14,
            background: '#f8fafc', border: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <CalendarDays size={13} color="#94a3b8" />
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 600 }}>Зарын хугацаа дуусах огноо</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{formatDate(listing.expires_at)}</div>
          </div>
        </aside>
      </div>

      {/* 関連物件 */}
      {related && related.length > 0 && (
        <div className="container" style={{ marginTop: 60, paddingBottom: 60 }}>
          <div className="section-head" style={{ marginBottom: 24 }}>
            <div>
              <div className="section-kicker">Төстэй зарууд</div>
              <h2 style={{ margin: '8px 0 0' }}>Танд таалагдаж болох зарууд</h2>
            </div>
            <a href="/listings" className="text-link">Бүгдийг харах</a>
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