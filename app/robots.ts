import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/manage/', '/api/'],
    },
    sitemap: 'https://uuruu.mn/sitemap.xml',
  };
}