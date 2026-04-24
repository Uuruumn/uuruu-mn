'use server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase-server';

export async function cancelListing(formData: FormData) {
  const id = String(formData.get('id') || '');
  const supabase = await createClient();
  await supabase.from('listings').update({
    status: 'rejected',
  }).eq('id', id);
  revalidatePath('/manage');
}