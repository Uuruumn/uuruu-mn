'use client';

import { useEffect, useState } from 'react';
import { ListingCard } from '@/components/listing-card';
import { Listing } from '@/lib/types';

export default function FavoritesPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      const stored = localStorage.getItem('favorites');
      const ids = stored ? JSON.parse(stored) : [];

      if (!ids.length) {
        setListings([]);
        setLoading(false);
        return;
      }

      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      });

      const data = await res.json();
      setListings(data.listings || []);
      setLoading(false);
    };

    loadFavorites();
  }, []);

  return (
    <main className="page-main">
      <div className="container">
        <div className="section-kicker">Хадгалсан</div>
        <h1 style={{ marginTop: 10 }}>Хадгалсан зарууд</h1>

        {loading ? (
          <p className="small-meta">Уншиж байна...</p>
        ) : listings.length === 0 ? (
          <div className="info-card" style={{ marginTop: 24 }}>
            <h2>Хадгалсан зар алга байна</h2>
<p className="small-meta">
  Таалагдсан зарынхаа ❤️ дээр дарж хадгалаарай.
</p>
<a href="/listings" className="btn btn-primary" style={{ marginTop: 16 }}>
  Зарууд үзэх
</a>
          </div>
        ) : (
          <div className="cards-grid" style={{ marginTop: 32 }}>
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}