import { createClient } from '@/lib/supabase-server';
import { MetadataRoute } from 'next';

type Listing = {
  id: string;
  updated_at: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const { data: listings } = await supabase
    .from('listings')
    .select('id, updated_at')
    .eq('status', 'active');

  const listingUrls = (listings || []).map((listing: Listing) => ({
    url: `https://uuruu.mn/listings/${listing.id}`,
    lastModified: new Date(listing.updated_at),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://uuruu.mn',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://uuruu.mn/listings',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://uuruu.mn/post',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...listingUrls,
  ];
}