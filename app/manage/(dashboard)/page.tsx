import { createClient } from '@/lib/supabase-server';
import { cancelListing } from './actions';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: all } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false });
  const listings = all ?? [];

  const total = listings.length;
  const approved = listings.filter((x: any) => x.status === 'approved').length;
  const pending = listings.filter((x: any) => x.status === 'pending').length;
  const expired = listings.filter((x: any) => x.status === 'expired' || x.status === 'rejected').length;

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 60 }}>
      <h1 style={{ color: '#f8fafc', fontSize: '1.6rem', marginBottom: 24 }}>Uuruu.mn — Admin</h1>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Нийт зар', value: total },
          { label: 'Нийтлэгдсэн', value: approved },
          { label: 'Хүлээгдэж байна', value: pending },
          { label: 'Дууссан / Цуцлагдсан', value: expired },
        ].map(k => (
          <div key={k.label} style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: '16px 20px'
          }}>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: 6 }}>{k.label}</div>
            <strong style={{ fontSize: '2rem', color: '#f8fafc' }}>{k.value}</strong>
          </div>
        ))}
      </div>

{/* クイックリンク */}
<div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
  <a href="/manage/articles" style={{
    background: 'rgba(201,162,39,0.15)',
    border: '1px solid rgba(201,162,39,0.3)',
    borderRadius: 12, padding: '12px 20px',
    color: '#c9a227', fontWeight: 600, fontSize: '0.9rem',
    textDecoration: 'none'
  }}>
    📰 Мэдээлэл удирдах →
  </a>
</div>

      {/* Listings table */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20, padding: 20
      }}>
        <h2 style={{ color: '#f8fafc', margin: '0 0 18px', fontSize: '1.1rem' }}>Бүх зарууд</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {listings.length === 0 && (
            <div style={{ color: '#64748b', padding: 20, textAlign: 'center' }}>Одоогоор зар алга</div>
          )}
          {listings.map((listing: any) => (
            <div key={listing.id} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14, padding: '16px 18px',
              display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start'
            }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <strong style={{ color: '#f1f5f9', fontSize: '1rem' }}>{listing.title}</strong>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 4 }}>
                  {listing.location}{listing.district ? ` — ${listing.district}` : ''} · {Number(listing.price).toLocaleString()}₮ · {listing.area}м²
                </div>
                <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: 2 }}>
                  Утас: {listing.phone} · {listing.poster_type === 'company' ? 'Хуулийн этгээд' : 'Иргэн'}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: 2 }}>
                  Огноо: {new Date(listing.created_at).toLocaleDateString('mn-MN')}
                  {listing.expires_at && ` · Дуусах: ${new Date(listing.expires_at).toLocaleDateString('mn-MN')}`}
                </div>
                {listing.payment_sender_name && (
                  <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: 4 }}>
                    Төлбөр: {listing.payment_sender_name} · {listing.payment_reference}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                {/* Status badge */}
                <span style={{
                  padding: '5px 12px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 700,
                  background: listing.status === 'approved'
                    ? 'rgba(16,185,129,0.15)'
                    : listing.status === 'rejected'
                    ? 'rgba(239,68,68,0.15)'
                    : 'rgba(245,158,11,0.15)',
                  color: listing.status === 'approved'
                    ? '#34d399'
                    : listing.status === 'rejected'
                    ? '#f87171'
                    : '#fbbf24',
                }}>
                  {listing.status === 'approved' ? 'Нийтлэгдсэн' : listing.status === 'rejected' ? 'Цуцлагдсан' : 'Хүлээгдэж байна'}
                </span>

                {/* キャンセルボタン */}
                {listing.status === 'approved' && (
                  <form action={cancelListing}>
                    <input type="hidden" name="id" value={listing.id} />
                    <button style={{
                      background: 'rgba(239,68,68,0.15)', color: '#f87171',
                      fontWeight: 600, padding: '8px 14px', borderRadius: 8,
                      border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', fontSize: '0.82rem'
                    }} type="submit">
                      Цуцлах
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}