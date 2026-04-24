'use server';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';

async function uploadImages(supabase: any, userId: string, files: File[]): Promise<string[]> {
  const urls: string[] = [];
  for (let i = 0; i < Math.min(files.length, 5); i++) {
    const file = files[i];
    if (!file || file.size === 0) continue;
    const safeExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${userId}/${Date.now()}-${i}.${safeExt}`;
    const { error } = await supabase.storage
      .from('listing-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: true, contentType: file.type || 'image/jpeg' });
    if (!error) {
      urls.push(supabase.storage.from('listing-images').getPublicUrl(fileName).data.publicUrl);
    }
  }
  return urls;
}

export async function updateListing(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?message=Эхлээд нэвтэрнэ үү');

  const id = String(formData.get('id') || '');
  const title = String(formData.get('title') || '').trim();
  const listingType = String(formData.get('listing_type') || 'sale');
  const posterType = String(formData.get('poster_type') || 'individual');
  const propertyType = String(formData.get('property_type') || '').trim();
  const location = String(formData.get('location') || '').trim();
  const googleMapUrl = String(formData.get('google_map_url') || '').trim() || null;
  const videoUrl = String(formData.get('video_url') || '').trim() || null;
  const price = Number(formData.get('price') || 0);
  const area = Number(formData.get('area') || 0);
  const rooms = Number(formData.get('rooms') || 0);
  const floorRaw = formData.get('floor');
  const floor = floorRaw && String(floorRaw).trim() !== '' ? Number(floorRaw) : null;
  const builtYearRaw = formData.get('built_year');
  const builtYear = builtYearRaw && String(builtYearRaw).trim() !== '' ? Number(builtYearRaw) : null;
  const doorCountRaw = formData.get('door_count');
  const doorCount = doorCountRaw && String(doorCountRaw).trim() !== '' ? Number(doorCountRaw) : null;
  const windowCountRaw = formData.get('window_count');
  const windowCount = windowCountRaw && String(windowCountRaw).trim() !== '' ? Number(windowCountRaw) : null;
  const description = String(formData.get('description') || '').trim();
  const phone = String(formData.get('phone') || '').trim();

  if (!id || !title || !propertyType || !location || !price || !area || !rooms || !phone || !description) {
    redirect('/dashboard');
  }

  const patch: any = {
    title,
    listing_type: listingType,
    poster_type: posterType,
    property_type: propertyType,
    location,
    google_map_url: googleMapUrl,
    video_url: videoUrl,
    price,
    area,
    rooms,
    floor,
    built_year: builtYear,
    door_count: doorCount,
    window_count: windowCount,
    description,
    phone,
  };

  // 画像が新しくアップロードされた場合のみ更新
  const imageFiles = formData.getAll('images') as File[];
  const validImages = imageFiles.filter(f => f && f.size > 0);
  if (validImages.length > 0) {
    const urls = await uploadImages(supabase, user.id, validImages);
    if (urls.length > 0) {
      patch.image_url = urls[0];
      patch.extra_images = urls.slice(1);
    }
  }

  const { error } = await supabase
    .from('listings')
    .update(patch)
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) redirect('/dashboard?message=Алдаа гарлаа');

  redirect('/dashboard');
}