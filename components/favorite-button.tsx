'use client';

import { useEffect, useState } from 'react';

export function FavoriteButton({ listingId }: { listingId: string }) {
  const [isFav, setIsFav] = useState(false);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    const favorites = stored ? JSON.parse(stored) : [];
    setIsFav(favorites.includes(listingId));
  }, [listingId]);

  const toggleFavorite = () => {
    const stored = localStorage.getItem('favorites');
    let favorites = stored ? JSON.parse(stored) : [];

    if (favorites.includes(listingId)) {
      favorites = favorites.filter((id: string) => id !== listingId);
      setIsFav(false);
    } else {
      favorites.push(listingId);
      setIsFav(true);
      setPop(true);
      setTimeout(() => setPop(false), 180);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label="favorite"
      style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        border: '1px solid rgba(15,23,42,0.08)',
        background: 'white',
        boxShadow: '0 10px 25px rgba(15,23,42,0.12)',
        cursor: 'pointer',
        fontSize: 20,
        display: 'grid',
        placeItems: 'center',
        transform: pop ? 'scale(1.18)' : 'scale(1)',
        transition: 'transform 0.18s ease',
      }}
    >
      {isFav ? '❤️' : '♡'}
    </button>
  );
}