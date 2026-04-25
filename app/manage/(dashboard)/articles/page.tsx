import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

async function createArticle(formData: FormData) {
  'use server';
  const title = String(formData.get('title') || '');
  const content = String(formData.get('content') || '');
  const category = String(formData.get('category') || 'news');
  const image = formData.get('image') as File | null;
  const supabase = await createClient();

  let image_url = null;

  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `articles/${Date.now()}-${image.name}`;
    const { data: uploadData } = await supabase.storage
      .from('listing-images')
      .upload(fileName, buffer, { contentType: image.type });
    if (uploadData) {
      const { data: urlData } = supabase.storage
        .from('listing-images')
        .getPublicUrl(uploadData.path);
      image_url = urlData.publicUrl;
    }
  }

  await supabase.from('articles').insert({ title, content, category, image_url, published: true });
  revalidatePath('/manage/articles');
}

async function deleteArticle(formData: FormData) {
  'use server';
  const id = String(formData.get('id') || '');
  const supabase = await createClient();
  await supabase.from('articles').delete().eq('id', id);
  revalidatePath('/manage/articles');
}

async function togglePublish(formData: FormData) {
  'use server';
  const id = String(formData.get('id') || '');
  const published = formData.get('published') === 'true';
  const supabase = await createClient();
  await supabase.from('articles').update({ published: !published }).eq('id', id);
  revalidatePath('/manage/articles');
}

export default async function ArticlesPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 60 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <div className="section-kicker">Мэдээлэл</div>
          <h1 style={{ color: '#f8fafc', fontSize: '1.6rem', margin: '8px 0 0' }}>Мэдээ, мэдээлэл</h1>
        </div>
        <Link href="/manage" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>← Буцах</Link>
      </div>

      {/* 新規記事追加フォーム */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20, padding: 24, marginBottom: 32
      }}>
        <h2 style={{ color: '#f8fafc', fontSize: '1.1rem', marginBottom: 20 }}>Шинэ мэдээлэл нэмэх</h2>
        <form action={createArticle} style={{ display: 'grid', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <input
              name="title"
              placeholder="Гарчиг"
              required
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10, padding: '12px 14px',
                color: '#f8fafc', fontSize: '0.95rem'
              }}
            />
            <select
              name="category"
              style={{
                background: '#1e293b',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10, padding: '12px 14px',
                color: '#f8fafc', fontSize: '0.95rem'
              }}
            >
              <option value="news">Мэдээ</option>
              <option value="price">Үнийн мэдээлэл</option>
              <option value="law">Хууль, дүрэм</option>
              <option value="other">Бусад</option>
            </select>
          </div>
          <textarea
            name="content"
            placeholder="Агуулга"
            required
            rows={5}
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 10, padding: '12px 14px',
              color: '#f8fafc', fontSize: '0.95rem',
              resize: 'vertical'
            }}
          />
          <div>
  <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>
    Зураг (заавал биш)
  </label>
  <input
    name="image"
    type="file"
    accept="image/jpeg,image/png,image/webp"
    style={{
      background: '#1e293b',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 10, padding: '12px 14px',
      color: '#f8fafc', fontSize: '0.95rem',
      width: '100%'
    }}
  />
</div>
          <button
            type="submit"
            style={{
              background: '#c9a227', color: '#0f172a',
              fontWeight: 700, padding: '12px 24px',
              borderRadius: 10, border: 'none', cursor: 'pointer',
              fontSize: '0.95rem', width: 'fit-content'
            }}
          >
            Нийтлэх
          </button>
        </form>
      </div>

      {/* 記事一覧 */}
      <div style={{ display: 'grid', gap: 14 }}>
        {articles && articles.length > 0 ? articles.map((article: any) => (
          <div key={article.id} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, padding: '18px 20px',
            display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{
                  background: 'rgba(201,162,39,0.15)', color: '#c9a227',
                  fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: 999
                }}>
                  {article.category === 'news' ? 'Мэдээ' :
                   article.category === 'price' ? 'Үнийн мэдээлэл' :
                   article.category === 'law' ? 'Хууль, дүрэм' : 'Бусад'}
                </span>
                <span style={{
                  background: article.published ? 'rgba(16,185,129,0.15)' : 'rgba(148,163,184,0.15)',
                  color: article.published ? '#34d399' : '#94a3b8',
                  fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: 999
                }}>
                  {article.published ? 'Нийтлэгдсэн' : 'Нуугдсан'}
                </span>
              </div>
              <strong style={{ color: '#f1f5f9', fontSize: '1rem', display: 'block', marginBottom: 4 }}>
                {article.title}
              </strong>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: 1.6 }}>
                {article.content.length > 120 ? article.content.slice(0, 120) + '...' : article.content}
              </p>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: 8 }}>
                {new Date(article.created_at).toLocaleDateString('mn-MN')}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <form action={togglePublish}>
                <input type="hidden" name="id" value={article.id} />
                <input type="hidden" name="published" value={String(article.published)} />
                <button type="submit" style={{
                  background: article.published ? 'rgba(148,163,184,0.15)' : 'rgba(16,185,129,0.15)',
                  color: article.published ? '#94a3b8' : '#34d399',
                  fontWeight: 600, padding: '8px 14px', borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '0.82rem'
                }}>
                  {article.published ? 'Нуух' : 'Нийтлэх'}
                </button>
              </form>
              <form action={deleteArticle}>
                <input type="hidden" name="id" value={article.id} />
                <button type="submit" style={{
                  background: 'rgba(239,68,68,0.15)', color: '#f87171',
                  fontWeight: 600, padding: '8px 14px', borderRadius: 8,
                  border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', fontSize: '0.82rem'
                }}>
                  Устгах
                </button>
              </form>
            </div>
          </div>
        )) : (
          <div style={{ color: '#64748b', padding: 20, textAlign: 'center' }}>
            Одоогоор мэдээлэл байхгүй байна
          </div>
        )}
      </div>
    </div>
  );
}