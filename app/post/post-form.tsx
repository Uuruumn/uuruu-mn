'use client';

import { useState } from 'react';
import {
  PROPERTY_TYPES,
  COMMERCIAL_SUBTYPES,
  LISTING_TYPES,
  POSTER_TYPES,
  UB_DISTRICTS,
  AIMAGS,
  UB_DISTRICT_KHOROO,
  HEATING_TYPES,
  WATER_TYPES,
  FENCE_TYPES,
  BUILDING_MATERIALS,
  WINDOW_TYPES,
  FLOOR_TYPES,
  RENOVATION_TYPES,
  YES_NO,
} from '@/lib/constants';
import { createListing } from './actions';

export default function PostForm() {
  const [posterType, setPosterType] = useState('individual');
  const [listingType, setListingType] = useState('sale');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [commercialSubtype, setCommercialSubtype] = useState('');
  const [hasCertificate, setHasCertificate] = useState(true);
  const [priceDisplay, setPriceDisplay] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
const [aiPreview, setAiPreview] = useState('');
const [aiError, setAiError] = useState('');

const generateDescription = async () => {
  setAiError('');  // ← これを追加
  const titleEl = document.querySelector<HTMLInputElement>('[name="title"]');
  // 変更後
if (!propertyType || !location || !titleEl?.value) {
    setAiError('Үл хөдлөхийн төрөл, байршил, гарчигаа эхлээд бөглөнэ үү');
    return;
}
  setAiLoading(true);
  setAiPreview('');
  try {
    const res = await fetch('/api/generate-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        listingType, propertyType, location,
        title: titleEl.value,
        price: priceDisplay.replace(/,/g, ''),
        area: document.querySelector<HTMLInputElement>('[name="area"]')?.value,
        rooms: document.querySelector<HTMLInputElement>('[name="rooms"]')?.value,
        floor: document.querySelector<HTMLInputElement>('[name="floor"]')?.value,
      }),
    });
    const data = await res.json();
    if (data.error) { setAiError(data.error); return; }
    setAiPreview(data.description);
  } catch {
    setAiError('Алдаа гарлаа. Дахин оролдоно уу.');
  } finally {
    setAiLoading(false);
  }
};

  const isApartment = propertyType === 'apartment';
  const isHouse = propertyType === 'house';
  const isLand = propertyType === 'land';
  const isCommercial = propertyType === 'commercial';

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
        border: '1px solid rgba(201,162,39,0.3)',
        borderRadius: 16,
        padding: '20px 24px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
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
            background: '#c9a227',
            color: '#0f172a',
            fontWeight: 700,
            padding: '10px 20px',
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
          }}
        >
          ДАН-аар баталгаажуулах →
        </button>
      </div>

      <div style={{
        background: hasCertificate ? '#f0fdf4' : '#fef2f2',
        border: `1px solid ${hasCertificate ? '#86efac' : '#fca5a5'}`,
        borderRadius: 12,
        padding: '14px 16px',
        marginBottom: 24,
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

      {!hasCertificate && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fca5a5',
          borderRadius: 16,
          padding: '24px',
          textAlign: 'center',
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

      {hasCertificate && (
        <form className="form-grid" onSubmit={async (e) => {
  e.preventDefault();
  if (isSubmitting) return;
  setIsSubmitting(true);
  const formData = new FormData(e.currentTarget);
  try {
    await createListing(formData);
  } catch (err: any) {
    setIsSubmitting(false);
    if (err?.message === 'NOCERT') {
      alert('Гэрчилгээгүй үл хөдлөхийн хувьд манай компанитай холбогдоно уу:\nИ-мэйл: sonsooch@gmail.com\nУтас: 80702326');
    }
  }
}}>
          <input type="hidden" name="has_certificate" value="true" />

          <div className="full-width">
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.92rem' }}>Зарын төрөл</label>
            <div style={{ display: 'flex', gap: 20 }}>
              {LISTING_TYPES.map(t => (
                <label key={t.value} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.95rem' }}>
                  <input type="radio" name="listing_type" value={t.value} checked={listingType === t.value} onChange={() => setListingType(t.value)} style={{ width: 16, height: 16, accentColor: 'var(--gold)' }} />
                  {t.label}
                </label>
              ))}
            </div>
          </div>

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

          {posterType === 'company' && (
            <>
              <input className="full-width" name="company_name" placeholder="Компанийн нэр" required />
            </>
          )}

          <input className="full-width" name="title" placeholder="Зарын гарчиг" required
  onInvalid={e => (e.currentTarget as HTMLInputElement).setCustomValidity('Зарын гарчигаа оруулна уу')}
  onInput={e => (e.currentTarget as HTMLInputElement).setCustomValidity('')}
/>

          <select name="property_type" required defaultValue="" onChange={e => { setPropertyType(e.target.value); setCommercialSubtype(''); }}
  onInvalid={e => (e.currentTarget as HTMLSelectElement).setCustomValidity('Үл хөдлөхийн төрлөө сонгоно уу')}
  onInput={e => (e.currentTarget as HTMLSelectElement).setCustomValidity('')}
>
             <option value="" disabled>Үл хөдлөхийн төрөл</option>
              {PROPERTY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>

        {isCommercial && (
        <select name="commercial_subtype" required defaultValue="" onChange={e => setCommercialSubtype(e.target.value)}
  onInvalid={e => (e.currentTarget as HTMLSelectElement).setCustomValidity('Үйлчилгээний төрлөө сонгоно уу')}
  onInput={e => (e.currentTarget as HTMLSelectElement).setCustomValidity('')}
>
        <option value="" disabled>Үйлчилгээний төрөл сонгох</option>
        {COMMERCIAL_SUBTYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          )}

          <select name="location" required defaultValue="" onChange={e => setLocation(e.target.value)}
  onInvalid={e => (e.currentTarget as HTMLSelectElement).setCustomValidity('Хот / Аймгаа сонгоно уу')}
  onInput={e => (e.currentTarget as HTMLSelectElement).setCustomValidity('')}
>
            <option value="" disabled>Хот / Аймаг сонгох</option>
            <optgroup label="Улаанбаатар — Дүүрэг">
              {UB_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </optgroup>
            <optgroup label="Аймаг">
              {AIMAGS.map(a => <option key={a} value={a}>{a}</option>)}
            </optgroup>
          </select>

          {location && UB_DISTRICT_KHOROO[location] && (
            <select name="khoroo" defaultValue="">
              <option value="">Хороо сонгох (заавал биш)</option>
              {Array.from({ length: UB_DISTRICT_KHOROO[location] }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}-р хороо</option>
              ))}
            </select>
          )}

          <input name="google_map_url" type="url" placeholder="Google Map URL оруулна уу" />
          <input type="hidden" name="price" value={priceDisplay.replace(/,/g, '')} />
          <input
  type="text"
  placeholder="Үнэ (₮) — жишээ: 150,000,000"
  value={priceDisplay}
  inputMode="numeric"
  pattern="[0-9,]*"
  onChange={e => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setPriceDisplay(raw ? Number(raw).toLocaleString() : '');
  }}
  required
  onInvalid={e => (e.currentTarget as HTMLInputElement).setCustomValidity('Үнээ оруулна уу')}
  onInput={e => (e.currentTarget as HTMLInputElement).setCustomValidity('')}
/>

          {isApartment && (
            <>
              <input name="area" type="number" step="0.01" placeholder="Талбай — МКВ (м²)" required min="1" />
              <input name="rooms" type="number" placeholder="Өрөөний тоо" required min="1" />
              <input name="floor" type="number" placeholder="Давхар" min="0" />
              <select name="built_year" defaultValue="">
  <option value="">Ашиглалтад орсон он (заавал биш)</option>
  {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => new Date().getFullYear() - i).map(year => (
    <option key={year} value={year}>{year}</option>
  ))}
</select>
              <input name="window_count" type="number" placeholder="Нийт цонх (тоо)" min="0" />

              <select name="building_material" defaultValue="">
                <option value="">Барилгын материал (заавал биш)</option>
                {BUILDING_MATERIALS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>

              <select name="window_type" defaultValue="">
                <option value="">Цонхны төрөл (заавал биш)</option>
                {WINDOW_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>

              <select name="floor_type" defaultValue="">
                <option value="">Шалны материал (заавал биш)</option>
                {FLOOR_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>

              <select name="renovation" defaultValue="">
                <option value="">Засварын байдал (заавал биш)</option>
                {RENOVATION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>

              <select name="balcony" defaultValue="">
                <option value="">Тагт (заавал биш)</option>
                {YES_NO.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </>
          )}

          {isHouse && (
            <>
              <input name="land_area" type="number" step="0.01" placeholder="Газрын хэмжээ (м²)" min="1" />
              <input name="area" type="number" step="0.01" placeholder="Байшингийн хэмжээ (м²) — заавал биш" min="1" />
              <input name="rooms" type="number" placeholder="Өрөөний тоо (заавал биш)" min="1" />
              <select name="built_year" defaultValue="">
  <option value="">Ашиглалтад орсон он (заавал биш)</option>
  {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => new Date().getFullYear() - i).map(year => (
    <option key={year} value={year}>{year}</option>
  ))}
</select>

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

          {isLand && (
            <>
              <input name="land_area" type="number" step="0.01" placeholder="Газрын хэмжээ (м²)" required min="1" />
              <input name="area" type="number" step="0.01" placeholder="Барилгын хэмжээ (м²) — заавал биш" min="1" />
            </>
          )}

          {isCommercial && (
  <>
    <input name="area" type="number" step="0.01" placeholder="Талбай (м²)" required min="1" />
    <input name="floor" type="number" placeholder="Давхар (заавал биш)" min="0" />
    <select name="built_year" defaultValue="">
  <option value="">Ашиглалтад орсон он (заавал биш)</option>
  {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => new Date().getFullYear() - i).map(year => (
    <option key={year} value={year}>{year}</option>
  ))}
</select>
    <select name="renovation" defaultValue="">
      <option value="">Засварын байдал (заавал биш)</option>
      {RENOVATION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
    </select>
    <input type="hidden" name="rooms" value="0" />
  </>
)}

          {(isHouse || isLand) && (
            <input type="hidden" name="rooms" value="0" />
          )}

          <input className="full-width" name="phone" placeholder="Утасны дугаар" required
  onInvalid={e => (e.currentTarget as HTMLInputElement).setCustomValidity('Утасны дугаараа оруулна уу')}
  onInput={e => (e.currentTarget as HTMLInputElement).setCustomValidity('')}
/>
          <div className="full-width">
  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.92rem' }}>
    YouTube / Facebook зэрэг видео холбоос (заавал биш)
  </label>
  <input className="full-width" name="video_url" type="url" placeholder="URL оруулна уу" />
</div>

          <div className="full-width">
  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.92rem' }}>
    Зураг байршуулах — дээд тал нь 10 зураг (заавал биш)
  </label>
  
  <div
    onClick={() => document.getElementById('image-upload-input')?.click()}
    style={{
      border: '2px dashed var(--gold)',
      borderRadius: 12,
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      background: '#fafafa',
    }}
  >
    <div style={{ fontSize: '2rem', marginBottom: 8 }}>📷</div>
    <div style={{ fontWeight: 600, marginBottom: 4 }}>Зураг байршуулах </div>
    <div className="small-meta">JPG, PNG, WEBP — тус бүр дээд тал нь 5MB</div>
  </div>
  <input
    id="image-upload-input"
    name="images"
    type="file"
    multiple
    accept="image/jpeg,image/png,image/webp"
    style={{ display: 'none' }}
    onChange={async e => {
  const files = e.target.files;
  if (!files || files.length === 0) return;
  if (files.length > 10) {
    alert('Дээд тал нь 10 зураг сонгоно уу');
    e.target.value = '';
    setImageFiles(null);
    return;
  }

  // Canvas APIで圧縮
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const MAX_SIZE = 1200;
      const QUALITY = 0.8;
      const img = document.createElement('img');
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        let w = img.width;
        let h = img.height;
        if (w > MAX_SIZE || h > MAX_SIZE) {
          if (w > h) { h = Math.round(h * MAX_SIZE / w); w = MAX_SIZE; }
          else { w = Math.round(w * MAX_SIZE / h); h = MAX_SIZE; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
        canvas.toBlob(blob => {
          resolve(blob ? new File([blob], file.name, { type: 'image/webp' }) : file);
        }, 'image/webp', QUALITY);
      };
      img.src = url;
    });
  };

  const compressed = await Promise.all(Array.from(files).map(compressImage));
  const dt = new DataTransfer();
  compressed.forEach(f => dt.items.add(f));
  e.target.files = dt.files;
  setImageFiles(dt.files);
}}
  />
  {imageFiles && imageFiles.length > 0 && (
    <p className="small-meta" style={{ marginTop: 8, color: 'green' }}>
      ✓ {imageFiles.length} зураг сонгогдлоо
    </p>
  )}
</div>

          <div className="full-width">
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
    <label style={{ fontWeight: 600, fontSize: '0.92rem' }}>Тайлбар</label>
    <button
      type="button"
      onClick={generateDescription}
      disabled={aiLoading}
      style={{
        background: aiLoading ? '#94a3b8' : 'linear-gradient(135deg, #c9a227, #f0c040)',
        color: '#0f172a',
        fontWeight: 700,
        padding: '6px 14px',
        borderRadius: 8,
        border: 'none',
        cursor: aiLoading ? 'not-allowed' : 'pointer',
        fontSize: '0.85rem',
      }}
    >
      {aiLoading ? 'Үүсгэж байна...' : '✨ AI-аар тайлбар үүсгэх'}
    </button>
  </div>

{aiError && (
    <div style={{
        background: '#fef2f2',
        border: '1px solid #fca5a5',
        borderRadius: 8,
        padding: '10px 14px',
        marginBottom: 12,
        fontSize: '0.85rem',
        color: '#b91c1c',
    }}>
        ⚠️ {aiError}
    </div>
)}

  {aiPreview && (
    <div style={{
      background: '#fffbeb',
      border: '1px solid #f59e0b',
      borderRadius: 12,
      padding: '14px 16px',
      marginBottom: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <span>⚠️</span>
        <strong style={{ fontSize: '0.85rem', color: '#b45309' }}>
          AI үүсгэсэн текст. Нийтлэхийн өмнө шалгаж, засварлана уу.
        </strong>
      </div>
      <p style={{ margin: '0 0 12px', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{aiPreview}</p>
      <button
        type="button"
        onClick={() => { setDescription(aiPreview); setAiPreview(''); }}
        style={{
          background: '#c9a227',
          color: '#0f172a',
          fontWeight: 700,
          padding: '8px 16px',
          borderRadius: 8,
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.85rem',
        }}
      >
        ✓ Энэ текстийг ашиглах
      </button>
    </div>
  )}

  <textarea
    className="full-width"
    name="description"
    placeholder="Тайлбар"
    required
    maxLength={1000}
    value={description}
    onChange={e => {
      const clean = e.target.value.replace(/[^a-zA-Z0-9\u0400-\u04FF .,₮-]/g, '');
      setDescription(clean);
    }}
    style={{ resize: 'vertical', minHeight: 120 }}
  />
  <p className="small-meta" style={{ marginTop: 4, textAlign: 'right' }}>
    {description.length} / 1000
  </p>
</div>

          <button
  className="btn btn-primary btn-block full-width"
  type="submit"
  disabled={isSubmitting}
  style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
>
  {isSubmitting ? 'Зар нийтлэгдэж байна...' : 'Зар нийтлэх'}
</button>
        </form>
      )}
    </div>
  );
}