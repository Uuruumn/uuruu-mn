'use client';
import { useState } from 'react';
import { PROPERTY_TYPES, LISTING_TYPES, POSTER_TYPES, UB_DISTRICTS, AIMAGS, UB_DISTRICT_KHOROO, HEATING_TYPES, WATER_TYPES, FENCE_TYPES } from '@/lib/constants';
import { createListing } from './actions';

export default function PostForm() {
  const [posterType, setPosterType] = useState('individual');
  const [listingType, setListingType] = useState('sale');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [hasCertificate, setHasCertificate] = useState(true);

  const isApartment = propertyType === 'apartment';
  const isHouse = propertyType === 'house';
  const isLand = propertyType === 'land';

  return (
    <div>
      {/* DAN認証バナー */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
        border: '1px solid rgba(201,162,39,0.3)',
        borderRadius: 16, padding: '20px 24px', marginBottom: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ background: '#c9a227', color: '#0f172a', fontWeight: 800, padding: '3px 10px', borderRadius: 6, fontSize: '0.75rem' }}>ДАН</span>
            <strong style={{ color: '#f8fafc', fontSize: '1rem' }}>Өмчлөгчийг баталгаажуулах</strong>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
            ДАН системээр нэвтэрч өөрийн нэр дээрх үл хөдлөхийг сонгон зар оруулна уу.
          </p>
        </div>
        <button
          type="button"
          onClick={() => alert('ДАН API гэрээ байгуулсны дараа идэвхжинэ')}
          style={{
            background: '#c9a227', color: '#0f172a', fontWeight: 700,
            padding: '10px 20px', borderRadius: 10, border: 'none',
            cursor: 'pointer', fontSize: '0.9rem', whiteSpace: 'nowrap'
          }}
        >
          ДАН-аар баталгаажуулах →
        </button>
      </div>

      {/* 証明書チェック — 一番上 */}
      <div style={{
        background: hasCertificate ? '#f0fdf4' : '#fef2f2',
        border: `1px solid ${hasCertificate ? '#86efac' : '#fca5a5'}`,
        borderRadius: 12, padding: '14px 16px', marginBottom: 24
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={hasCertificate}
            onChange={e => setHasCertificate(e.target.checked)}
            style={{ width: 16, height: 16, accentColor: 'var(--gold)' }}
          />
          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Гэрчилгээтэй үл хөдлөх</span>
        </label>
        <p className="small-meta" style={{ marginTop: 6, marginBottom: 0 }}>
          Гэрчилгээгүй цоо шинэ үл хөдлөх байвал чекийг авна уу.
        </p>
      </div>

      {/* 証明書なし — 連絡先表示 */}
      {!hasCertificate && (
        <div style={{
          background: '#fef2f2', border: '1px solid #fca5a5',
          borderRadius: 16, padding: '24px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>📋</div>
          <h3 style={{ margin: '0 0 12px', color: '#b91c1c' }}>Гэрчилгээгүй үл хөдлөх</h3>
          <p className="small-meta" style={{ marginBottom: 16 }}>
            Гэрчилгээгүй цоо шинэ үл хөдлөхийн хувьд манай компанитай холбогдож гэрээ байгуулна уу.
          </p>
          <div style={{ display: 'grid', gap: 10 }}>
            <a href="mailto:sonsooch@gmail.com" className="btn btn-primary" style={{ justifyContent: 'center' }}>✉ sonsooch@gmail.com</a>
            <a href="tel:80702326" className="btn btn-ghost" style={{ justifyContent: 'center' }}>📞 80702326</a>
          </div>
        </div>
      )}

      {/* 通常フォーム */}
      {hasCertificate && (
        <form className="form-grid" action={async (formData) => {
          try { await createListing(formData); } catch (e: any) {
            if (e?.message === 'NOCERT') alert('Гэрчилгээгүй үл хөдлөхийн хувьд манай компанитай холбогдоно уу:\nИ-мэйл: sonsooch@gmail.com\nУтас: 80702326');
          }
        }}>
          <input type="hidden" name="has_certificate" value="true" />

          {/* 1. Зарлалын төрөл */}
          <div className="full-width">
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.92rem' }}>Зарлалын төрөл</label>
            <div style={{ display: 'flex', gap: 20 }}>
              {LISTING_TYPES.map(t => (
                <label key={t.value} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.95rem' }}>
                  <input type="radio" name="listing_type" value={t.value} checked={listingType === t.value} onChange={() => setListingType(t.value)} style={{ width: 16, height: 16, accentColor: 'var(--gold)' }} />
                  {t.label}
                </label>
              ))}
            </div>
          </div>

          {/* 2. Зар оруулагчийн төрөл */}
          <div className="full-width">
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.92rem' }}>Зар оруулагчийн төрөл</label>
            <div style={{ display: 'flex', gap: 20 }}>
              {POSTER_TYPES.map(t => (
                <label key={t.value} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.95rem' }}>
                  <input type="radio" name="poster_type" value={t.value} checked={posterType === t.value} onChange={() => setPosterType(t.value)} style={{ width: 16, height: 16, accentColor: 'var(--gold)' }} />
                  {t.label}
                </label>
              ))}
            </div>
          </div>

          {/* 3. 法人の場合 */}
          {posterType === 'company' && (
            <>
              <input className="full-width" name="company_name" placeholder="Компанийн нэр" required />
              <input className="full-width" name="company_register" placeholder="Регистрийн дугаар" />
            </>
          )}

          {/* 4. Гарчиг */}
          <input className="full-width" name="title" placeholder="Зарын гарчиг" required />

          {/* 5. Үл хөдлөхийн төрөл */}
          <select name="property_type" required defaultValue="" onChange={e => setPropertyType(e.target.value)}>
            <option value="" disabled>Үл хөдлөхийн төрөл</option>
            {PROPERTY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>

          {/* 6. Байршил */}
          <select name="location" required defaultValue="" onChange={e => setLocation(e.target.value)}>
            <option value="" disabled>Хот / Аймаг сонгох</option>
            <optgroup label="Улаанбаатар — Дүүрэг">
              {UB_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </optgroup>
            <optgroup label="Аймаг">
              {AIMAGS.map(a => <option key={a} value={a}>{a}</option>)}
            </optgroup>
          </select>

          {/* 6b. Хороо */}
          {location && UB_DISTRICT_KHOROO[location] && (
            <select name="khoroo" defaultValue="">
              <option value="">Хороо сонгох (заавал биш)</option>
              {Array.from({ length: UB_DISTRICT_KHOROO[location] }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}-р хороо</option>
              ))}
            </select>
          )}

          {/* 7. Google Map URL */}
          <input name="google_map_url" type="url" placeholder="Google Map холбоос (заавал биш)" />

          {/* 8. Үнэ */}
          <input name="price" type="number" placeholder="Үнэ (₮)" required min="1" />

          {/* Орон сууц — нийт талбай, өрөө, давхар, он, цонх */}
          {isApartment && (
            <>
              <input name="area" type="number" step="0.1" placeholder="Талбай — МКВ (м²)" required min="1" />
              <input name="rooms" type="number" placeholder="Өрөөний тоо" required min="1" />
              <input name="floor" type="number" placeholder="Давхар" min="0" />
              <input name="built_year" type="number" placeholder="Ашиглалтад орсон он" min="1900" max="2100" />
              <input name="window_count" type="number" placeholder="Нийт цонх (тоо)" min="0" />
            </>
          )}

          {/* Хашаа байшин */}
          {isHouse && (
            <>
              <input name="land_area" type="number" step="0.1" placeholder="Газрын хэмжээ (м²)" min="1" />
              <input name="area" type="number" step="0.1" placeholder="Байшингийн хэмжээ (м²) — заавал биш" min="1" />
              <input name="rooms" type="number" placeholder="Өрөөний тоо (заавал биш)" min="1" />
              <input name="built_year" type="number" placeholder="Ашиглалтад орсон он (заавал биш)" min="1900" max="2100" />
              <select name="heating" defaultValue="">
                <option value="">Дулаан (заавал биш)</option>
                {HEATING_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <select name="water" defaultValue="">
                <option value="">Ус (заавал биш)</option>
                {WATER_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <select name="fence" defaultValue="">
                <option value="">Хашаа (заавал биш)</option>
                {FENCE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </>
          )}

          {/* Газар */}
          {isLand && (
            <>
              <input name="land_area" type="number" step="0.1" placeholder="Газрын хэмжээ (м²)" required min="1" />
              <input name="area" type="number" step="0.1" placeholder="Барилгын хэмжээ (м²) — заавал биш" min="1" />
            </>
          )}

          {/* Хашаа байшин / Газар — rooms hidden default */}
          {(isHouse || isLand) && (
            <input type="hidden" name="rooms" value="0" />
          )}

          {/* 15. Утас */}
          <input className="full-width" name="phone" placeholder="Утасны дугаар" required />

          {/* 16. Видео холбоос */}
          <input className="full-width" name="video_url" type="url" placeholder="YouTube / Facebook видео холбоос (заавал биш)" />

          {/* 17. Зураг */}
          <div className="full-width">
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.92rem' }}>Зураг оруулах — дээд тал нь 5 зураг (заавал биш)</label>
            <input name="images" type="file" multiple accept="image/jpeg,image/png,image/webp" style={{ height: 'auto', padding: '10px 14px', width: '100%' }} />
            <p className="small-meta" style={{ marginTop: 8 }}>Ctrl/Cmd дарж олон зураг нэгэн зэрэг сонгоно уу. JPG, PNG, WEBP — тус бүр дээд тал нь 5MB.</p>
          </div>

          {/* 18. Тайлбар */}
          <textarea className="full-width" name="description" placeholder="Тайлбар" required />

          <button className="btn btn-primary btn-block full-width" type="submit">Зар илгээх</button>
        </form>
      )}
    </div>
  );
}