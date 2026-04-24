import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { DeleteButton } from './delete-button';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?message=Эхлээд нэвтэрнэ үү');

  const { data: listings } = await supabase
    .from('listings')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <main className="page-main">
      <div className="container">
        <div className="page-header">
          <div className="section-kicker">Dashboard</div>
          <h1>Миний зарууд</h1>
          <p className="small-meta">Өөрийн заруудаа эндээс хянаж, засварлаж болно.</p>
        </div>

        <div className="table-card">
          <div className="table-like">
            {(!listings || listings.length === 0) && (
              <div className="row-card">
                <strong>Одоогоор зар алга</strong>
              </div>
            )}

            {(listings ?? []).map((listing: any) => {
              const isExpired = listing.expires_at && new Date(listing.expires_at) < new Date();
              const daysLeft = listing.expires_at
                ? Math.max(0, Math.ceil((new Date(listing.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
                : null;

              let label = 'Хянагдаж байна';
              let badgeClass = 'status-badge pending';

              if (listing.status === 'approved') {
                label = isExpired ? 'Хугацаа дууссан' : `Нийтлэгдсэн (${daysLeft} өдөр үлдсэн)`;
                badgeClass = isExpired ? 'status-badge expired' : 'status-badge live';
              } else if (listing.status === 'rejected') {
                label = 'Цуцлагдсан';
                badgeClass = 'status-badge expired';
              }

              return (
                <div className="row-card" key={listing.id}>
                  <div style={{ flex: 1 }}>
                    <strong>{listing.title}</strong>
                    <div className="small-meta">
                      {listing.location}{listing.district ? ` — ${listing.district}` : ''} · {Number(listing.price).toLocaleString()}₮
                    </div>

                    {/* 支払い待ち */}
                    {listing.payment_status === 'unpaid' && (
                      <div style={{ marginTop: 14 }}>
                        <div className="detail-box">
                          <div style={{ fontWeight: 800, marginBottom: 10, color: 'var(--navy)' }}>Төлбөрийн мэдээлэл</div>
                          <div className="small-meta">Зар байршуулалтын төлбөр: <strong style={{ color: 'var(--navy)' }}>25,000₮</strong></div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 12 }}>
                            <div className="detail-box">
                              <strong>QPay</strong>
                              <div className="small-meta">Удахгүй нэмэгдэнэ</div>
                            </div>
                            <div className="detail-box">
                              <strong>Банкны шилжүүлэг</strong>
                              <div className="small-meta">Банк: ХХХХ банк<br />Данс: XXXX XXXX XXXX<br />Дансны нэр: XXXXX</div>
                            </div>
                          </div>
                          <p className="small-meta" style={{ marginTop: 12 }}>
                            Төлбөр хийсний дараа таны зар автоматаар нийтлэгдэнэ.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 期限切れ — 延長フォーム */}
                    {listing.status === 'approved' && isExpired && (
                      <div style={{ marginTop: 14, display: 'grid', gap: 14 }}>
                        <div className="detail-box">
                          <div style={{ fontWeight: 800, marginBottom: 10, color: 'var(--navy)' }}>Зарыг сунгах</div>
                          <div className="small-meta">30 хоногоор сунгах төлбөр: <strong style={{ color: 'var(--navy)' }}>25,000₮</strong></div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 12 }}>
                            <div className="detail-box">
                              <strong>Банкны шилжүүлэг</strong>
                              <div className="small-meta">Банк: ХХХХ банк<br />Данс: XXXX XXXX XXXX<br />Дансны нэр: XXXXX</div>
                            </div>
                          </div>
                        </div>
                        <div className="detail-box">
                          <div style={{ fontWeight: 800, marginBottom: 10, color: 'var(--navy)' }}>Сунгалтын төлбөр мэдэгдэх</div>
                          <form action="/dashboard/extend-submit" method="post" style={{ display: 'grid', gap: 10 }}>
                            <input type="hidden" name="listing_id" value={listing.id} />
                            <input type="text" name="sender_name" placeholder="Төлсөн хүний нэр" />
                            <input type="text" name="payment_reference" placeholder="Гүйлгээний утга / лавлах" />
                            <button type="submit" className="btn btn-primary btn-block">Сунгалт хийх</button>
                          </form>
                        </div>
                      </div>
                    )}

                    {/* まもなく期限切れ警告（7日以内） */}
                    {listing.status === 'approved' && !isExpired && daysLeft !== null && daysLeft <= 7 && (
                      <div style={{
                        marginTop: 12, padding: '10px 14px', borderRadius: 10,
                        background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
                        color: '#d97706', fontSize: '0.85rem'
                      }}>
                        ⚠️ Таны зар {daysLeft} өдрийн дараа дуусна. Цагтаа сунгаарай.
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
                    <div className={badgeClass}>{label}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Link href={`/dashboard/edit/${listing.id}`} className="btn btn-ghost" style={{ fontSize: '0.88rem', height: 38, padding: '0 14px' }}>✏️ Засах</Link>
                      <DeleteButton id={listing.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}