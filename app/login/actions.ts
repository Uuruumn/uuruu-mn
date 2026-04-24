'use server';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';

export async function signIn(formData: FormData) {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const redirectTo = String(formData.get('redirect') || '/post');
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?message=${encodeURIComponent(error.message)}&redirect=${redirectTo}`);
  redirect(redirectTo);
}

export async function signUp(formData: FormData) {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const redirectTo = String(formData.get('redirect') || '/dashboard');
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) redirect(`/login?message=${encodeURIComponent(error.message)}&redirect=${redirectTo}`);
  redirect(`/login?message=Бүртгэл үүслээ. Одоо нэвтэрнэ үү&redirect=${redirectTo}`);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}