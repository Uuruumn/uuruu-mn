'use server';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';

export async function deleteListing(formData: FormData) {
  const id = String(formData.get('id') || '');
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  await supabase
    .from('listings')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  redirect('/dashboard');
}