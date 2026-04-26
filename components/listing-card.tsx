'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Listing } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import PhoneRevealButton from '@/components/phone-reveal-button';
import { FavoriteButton } from '@/components/favorite-button';

const LISTING_TYPE_LABEL: Record<string, string> = {
  sale: 'Зарах',
  rent: 'Түрээслэх',
};

const PROPERTY_TYPE_LABEL: Record<string, string> = {
  apartment: 'Орон сууц',
  house: 'Хашаа байшин',
  land: 'Газар',
};

export function ListingCard({ listing }: { listing: Listing }) {
  const imgSrc =
    listing.image_url ||
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80';

  return (
    <article className="listing-card">
      <div style={{ position: 'relative' }}>
        <Link href={`/listings/${listing.id}`}>
          <div style={{ position: 'relative', width: '100%', height: 250 }}>
            <Image
              src={imgSrc}
              alt={listing.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </Link>

        <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
          <FavoriteButton listingId={listing.id} />
        </div>
      </div>

      <div className="card-body">
        <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
          {listing.listing_type && (
            <span
              style={{
                padding: '3px 10px',
                borderRadius: 999,
                fontSize: '0.75rem',
                fontWeight: 700,
                background:
                  listing.listing_type === 'sale'
                    ? 'rgba(16,185,129,0.12)'
                    : 'rgba(99,102,241,0.12)',
                color: listing.listing_type === 'sale' ? '#10b981' : '#6366f1',
              }}
            >
              {LISTING_TYPE_LABEL[listing.listing_type] ?? listing.listing_type}
            </span>
          )}

          {listing.property_type && (
            <span
              style={{
                padding: '3px 10px',
                borderRadius: 999,
                fontSize: '0.75rem',
                fontWeight: 700,
                background: 'rgba(148,163,184,0.1)',
                color: '#94a3b8',
              }}
            >
              {PROPERTY_TYPE_LABEL[listing.property_type] ?? listing.property_type}
            </span>
          )}
        </div>

        <div className="price">{formatPrice(Number(listing.price))}</div>

        <Link href={`/listings/${listing.id}`} className="card-title">
          {listing.title}
        </Link>

        <div className="card-meta">{listing.location}</div>

        <div className="card-stats">
          <span>{listing.rooms} өрөө</span>
          <span>{listing.area} м²</span>
          {listing.floor != null && <span>{listing.floor} давхар</span>}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
          <Link href={`/listings/${listing.id}`} className="btn btn-ghost">
            Дэлгэрэнгүй
          </Link>

          <PhoneRevealButton phone={listing.phone} />
        </div>
      </div>
    </article>
  );
}