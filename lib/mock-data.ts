import { Listing } from '@/lib/types';

export const featuredListings: Listing[] = [
  {
    id: '1',
    title: 'River Garden-д 3 өрөө орон сууц',
    property_type: 'Орон сууц',
    location: 'Хан-Уул, Улаанбаатар',
    price: 420000000,
    area: 98,
    rooms: 3,
    floor: 12,
    built_year: 2022,
    description: 'Гэрэл сайтай, хотхон дотроо үйлчилгээтэй, шууд нүүх боломжтой.',
    phone: '99112233',
    status: 'approved',
    image_url: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
    expires_at: '2026-05-05',
    created_at: '2026-04-01',
    owner_name: 'B. Enkhjin'
  },
  {
    id: '2',
    title: 'Шинэ Яармагт 2 өрөө байр',
    property_type: 'Орон сууц',
    location: 'Хан-Уул, Яармаг',
    price: 265000000,
    area: 62,
    rooms: 2,
    floor: 9,
    built_year: 2024,
    description: 'Цоо шинэ, сургууль цэцэрлэг ойрхон, авто зогсоолтой.',
    phone: '88114455',
    status: 'approved',
    image_url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    expires_at: '2026-05-02',
    created_at: '2026-04-02',
    owner_name: 'A. Munkh'
  },
  {
    id: '3',
    title: 'Зайсанд пентхаус маягийн байр',
    property_type: 'Lux apartment',
    location: 'Зайсан, Улаанбаатар',
    price: 890000000,
    area: 180,
    rooms: 5,
    floor: 15,
    built_year: 2023,
    description: 'Том цонхтой, хотын үзэмжтэй, дээд зэрэглэлийн төлөвлөлттэй.',
    phone: '90909900',
    status: 'approved',
    image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    expires_at: '2026-05-01',
    created_at: '2026-04-03',
    owner_name: 'T. Temuulen'
  }
];
