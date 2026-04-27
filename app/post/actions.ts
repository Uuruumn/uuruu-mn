'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { Resend } from 'resend';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const resend = new Resend(process.env.RESEND_API_KEY);

async function uploadImage(
  supabase: any,
  userId: string,
  file: File,
  index: number
): Promise<string | null> {
  try {
    if (!file || file.size === 0) return null;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      console.warn(`Invalid image type: ${file.type}`);
      return null;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      console.warn(`Image too large: ${file.size}`);
      return null;
    }

    const extMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
    };

    const safeExt = extMap[file.type] || 'jpg';
    const fileName = `${userId}/${Date.now()}-${index}.${safeExt}`;

    const { error } = await supabase.storage
      .from('listing-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      console.warn(`Image ${index} upload skipped:`, error.message);
      return null;
    }

    return supabase.storage.from('listing-images').getPublicUrl(fileName).data.publicUrl;
  } catch (e) {
    console.warn(`Image ${index} error:`, e);
    return null;
  }
}

export async function createListing(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login?message=Эхлээд нэвтэрнэ үү');

  const title = String(formData.get('title') || '').trim();
  const listingType = String(formData.get('listing_type') || 'sale');
  const posterType = String(formData.get('poster_type') || 'individual');
  const propertyType = String(formData.get('property_type') || '').trim();
  const location = String(formData.get('location') || '').trim();
  const district = String(formData.get('district') || '').trim() || null;
  const khoroo = formData.get('khoroo') ? Number(formData.get('khoroo')) : null;
  const googleMapUrl = String(formData.get('google_map_url') || '').trim() || null;
  const videoUrl = String(formData.get('video_url') || '').trim() || null;

  const price = Number(formData.get('price') || 0);
  const area = Number(formData.get('area') || 0);
  const rooms = Number(formData.get('rooms') || 0);

  const floorRaw = formData.get('floor');
  const floor = floorRaw && String(floorRaw).trim() !== '' ? Number(floorRaw) : null;

  const builtYearRaw = formData.get('built_year');
  const builtYear =
    builtYearRaw && String(builtYearRaw).trim() !== '' ? Number(builtYearRaw) : null;

  const doorCountRaw = formData.get('door_count');
  const doorCount =
    doorCountRaw && String(doorCountRaw).trim() !== '' ? Number(doorCountRaw) : null;

  const windowCountRaw = formData.get('window_count');
  const windowCount =
    windowCountRaw && String(windowCountRaw).trim() !== '' ? Number(windowCountRaw) : null;

  const landAreaRaw = formData.get('land_area');
  const landArea =
    landAreaRaw && String(landAreaRaw).trim() !== '' ? Number(landAreaRaw) : null;

  const heating = String(formData.get('heating') || '').trim() || null;
  const water = String(formData.get('water') || '').trim() || null;
  const fence = String(formData.get('fence') || '').trim() || null;
  const buildingMaterial = String(formData.get('building_material') || '').trim() || null;
  const windowType = String(formData.get('window_type') || '').trim() || null;
  const floorType = String(formData.get('floor_type') || '').trim() || null;
  const renovation = String(formData.get('renovation') || '').trim() || null;
  const balcony = String(formData.get('balcony') || '').trim() || null;

  const hasCertificate = formData.get('has_certificate') === 'true';
  const companyName = String(formData.get('company_name') || '').trim() || null;
  const companyRegister = String(formData.get('company_register') || '').trim() || null;

  const rawDescription = String(formData.get('description') || '');
  const description = rawDescription
    .replace(/[<>"'&]/g, '')
    .trim()
    .slice(0, 1000);

  const safeDescription = escapeHtml(description);
  const phone = String(formData.get('phone') || '').trim();

  if (!title || !propertyType || !location || !price || !phone || !description) {
    redirect('/post?message=Мэдээллээ бүрэн бөглөнө үү');
  }

  if (!hasCertificate) {
    throw new Error('NOCERT');
  }

  const imageFiles = (formData.getAll('images') as File[])
    .filter((f) => f && f.size > 0)
    .slice(0, 10);

  const imageUrls = (
    await Promise.all(imageFiles.map((file, i) => uploadImage(supabase, user.id, file, i + 1)))
  ).filter(Boolean) as string[];

  const image_url = imageUrls[0] || null;
  const extra_images = imageUrls.slice(1);

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const { error } = await supabase.from('listings').insert({
    user_id: user.id,
    title,
    listing_type: listingType,
    poster_type: posterType,
    property_type: propertyType,
    location,
    district,
    khoroo,
    google_map_url: googleMapUrl,
    video_url: videoUrl,
    price,
    area,
    rooms,
    floor,
    built_year: builtYear,
    door_count: doorCount,
    window_count: windowCount,
    land_area: landArea,
    heating,
    water,
    fence,
    building_material: buildingMaterial,
    window_type: windowType,
    floor_type: floorType,
    renovation,
    balcony,
    has_certificate: hasCertificate,
    company_name: companyName,
    company_register: companyRegister,
    description,
    phone,
    image_url,
    extra_images: extra_images.length > 0 ? extra_images : null,
    status: 'pending',
    payment_status: 'unpaid',
    payment_amount: 25000,
    expires_at: expiresAt,
  });

  if (error) redirect(`/post?message=${encodeURIComponent(error.message)}`);

  try {
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.ADMIN_EMAIL!,
      subject: 'Uuruu.mn — Шинэ зар ирлээ',
      html: `<h2>Шинэ зар бүртгэгдлээ</h2><p><strong>Гарчиг:</strong> ${escapeHtml(title)}</p><p><strong>Байршил:</strong> ${escapeHtml(location)}${district ? ` — ${escapeHtml(district)}` : ''}</p><p><strong>Үнэ:</strong> ${price.toLocaleString()}₮</p><p><strong>Утас:</strong> ${escapeHtml(phone)}</p><p><strong>Тайлбар:</strong> ${safeDescription}</p>`,
    });
  } catch (e) {
    console.warn('Email notification failed:', e);
  }

  redirect('/dashboard');
}