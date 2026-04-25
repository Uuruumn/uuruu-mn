import { PROPERTY_TYPES, LISTING_TYPES, UB_DISTRICTS, AIMAGS } from '@/lib/constants';

export function SearchBar() {
  return (
    <form className="search-panel mobile-search-panel" action="/listings">
      <div className="search-field">
        <label htmlFor="s-listing-type">Зарлалын төрөл</label>
        <select id="s-listing-type" name="listing_type" defaultValue="">
          <option value="">Бүх төрөл</option>
          {LISTING_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className="search-field">
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

      <div className="search-field">
        <label htmlFor="s-type">Үл хөдлөхийн төрөл</label>
        <select id="s-type" name="property_type" defaultValue="">
          <option value="">Бүх төрөл</option>
          {PROPERTY_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className="search-field">
        <label htmlFor="s-rooms">Өрөө</label>
        <select id="s-rooms" name="rooms" defaultValue="">
          <option value="">Бүх өрөө</option>
          <option value="1">1 өрөө</option>
          <option value="2">2 өрөө</option>
          <option value="3">3 өрөө</option>
          <option value="4">4+ өрөө</option>
        </select>
      </div>

      <button className="btn btn-primary search-submit" type="submit">
        Хайх
      </button>
    </form>
  );
}