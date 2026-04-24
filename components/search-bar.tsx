import { PROPERTY_TYPES, LISTING_TYPES, UB_DISTRICTS, AIMAGS } from '@/lib/constants';

export function SearchBar() {
  return (
    <form className="search-panel" action="/listings" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
      alignItems: 'end',
      gap: 12,
    }}>
      <div>
        <label htmlFor="s-listing-type">Зарлалын төрөл</label>
        <select id="s-listing-type" name="listing_type" defaultValue="">
          <option value="">Бүх төрөл</option>
          {LISTING_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="s-location">Байршил</label>
        <select id="s-location" name="location" defaultValue="">
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
        <label htmlFor="s-type">Үл хөдлөхийн төрөл</label>
        <select id="s-type" name="property_type" defaultValue="">
          <option value="">Бүх төрөл</option>
          {PROPERTY_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="s-rooms">Өрөө</label>
        <select id="s-rooms" name="rooms" defaultValue="">
          <option value="">Бүх өрөө</option>
          <option value="1">1 өрөө</option>
          <option value="2">2 өрөө</option>
          <option value="3">3 өрөө</option>
          <option value="4">4+ өрөө</option>
        </select>
      </div>
      <button className="btn btn-primary" type="submit" style={{ height: 50, borderRadius: 14, padding: '0 24px', whiteSpace: 'nowrap' }}>
        Хайх
      </button>
    </form>
  );
}