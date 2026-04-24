import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { formatDate, formatPrice } from '@/lib/utils';
import { ListingCard } from '@/components/listing-card';
import { ImageGallery } from '@/components/image-gallery';

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const now = new Date().toISOString();
  const { data: listing } = await supabase.from('listings').select('*').eq('id', id).eq('status', 'approved').gt('expires_at', now).single();
  if (!listing) notFound();
  const allImages: string[] = [...(listing.image_url ? [listing.image_url] : []), ...(listing.extra_images || [])];
  const fallback = 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80';
  const { data: related } = await supabase.from('listings').select('*').eq('status', 'approved').gt('expires_at', now).neq('id', id).or(`location.eq.${listing.location},property_type.eq.${listing.property_type}`).order('created_at', { ascending: false }).limit(3);
  const LISTING_TYPE_LABEL: Record<string, string> = { sale: 'Зарах', rent: 'Түрээслэх' };
  const PROPERTY_TYPE_LABEL: Record<string, string> = { apartment: 'Орон сууц', house: 'Хашаа байшин', land: 'Газар' };
  return (
    <main className="page-main detail-layout">
      <div className="container detail-grid">
        <div>
          <ImageGallery images={allImages.length > 0 ? allImages : [fallback]} title={listing.title} />
          <div className="info-card">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              {listing.listing_type && (<span style={{ padding: '4px 12px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700, background: listing.listing_type === 'sale' ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.12)', color: listing.listing_type === 'sale' ? '#10b981' : '#6366f1' }}>{LISTING_TYPE_LABEL[listing.listing_type] ?? listing.listing_type}</span>)}
              {listing.property_type && (<span style={{ padding: '4px 12px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700, background: 'rgba(148,163,184,0.12)', color: '#64748b' }}>{PROPERTY_TYPE_LABEL[listing.property_type] ?? listing.property_type}</span>)}
            </div>
            <div className="section-kicker">Зарын дэлгэрэнгүй</div>
            <h1 style={{ marginTop: 10 }}>{listing.title}</h1>
            <div className="info-list">
              <div><strong>Байршил</strong>{listing.location}{listing.district ? ` — ${listing.district}` : ''}{listing.khoroo ? `, ${listing.khoroo}-р хороо` : ''}</div>
              <div><strong>Үнэ</strong>{formatPrice(Number(listing.price))}{listing.listing_type === 'rent' ? '/сар' : ''}</div>
              <div><strong>Талбай</strong>{listing.area} м²</div>
              <div><strong>Өрөө</strong>{listing.rooms}</div>
              {listing.floor != null && <div><strong>Давхар</strong>{listing.floor}</div>}
              {listing.built_year && <div><strong>Ашиглалтад орсон он</strong>{listing.built_year}</div>}
              {listing.window_count != null && <div><strong>Нийт цонх</strong>{listing.window_count}</div>}
              {listing.company_name && <div><strong>Компанийн нэр</strong>{listing.company_name}</div>}
              {listing.company_register && <div><strong>Регистрийн дугаар</strong>{listing.company_register}</div>}
            </div>
            <div className="detail-box"><strong>Тайлбар</strong><p className="small-meta" style={{ marginBottom: 0, marginTop: 8 }}>{listing.description}</p></div>
            {listing.google_map_url && (<div className="detail-box" style={{ marginTop: 14 }}><strong>Google Map</strong><div style={{ marginTop: 8, textAlign: 'center' }}><a href={listing.google_map_url as string} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}>Google Map харах</a></div></div>)}
            {listing.video_url && (<div className="detail-box" style={{ marginTop: 14 }}><strong>Видео</strong><div style={{ marginTop: 8, textAlign: 'center' }}><a href={listing.video_url as string} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}>Видео үзэх</a></div></div>)}
          </div>
        </div>
        <aside className="contact-card">
          <div className="status-badge live">Нийтлэгдсэн</div>
          <h2 style={{ marginTop: 14, marginBottom: 10 }}>{formatPrice(Number(listing.price))}{listing.listing_type === 'rent' ? '/сар' : ''}</h2>
          <a href={`tel:${listing.phone}`} className="contact-phone">Утсаар холбогдох</a>
          <div className="detail-box"><strong>Утасны дугаар</strong><div>{listing.phone}</div></div>
          <div className="detail-box" style={{ marginTop: 12 }}><strong>Зарын хугацаа дуусах огноо</strong><div>{formatDate(listing.expires_at)}</div></div>
        </aside>
      </div>
      {related && related.length > 0 && (
        <div className="container" style={{ marginTop: 60, paddingBottom: 60 }}>
          <div className="section-head" style={{ marginBottom: 24 }}><div><div className="section-kicker">Төстэй зарууд</div><h2 style={{ margin: '8px 0 0' }}>Танд таалагдаж болох зарууд</h2></div><a href="/listings" className="text-link">Бүгдийг харах</a></div>
          <div className="cards-grid">{related.map((item: any) => (<ListingCard key={item.id} listing={item} />))}</div>
        </div>
      )}
    </main>
  );
}