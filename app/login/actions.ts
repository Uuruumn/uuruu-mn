'use server';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';

function translateError(message: string): string {
  if (message.includes('Invalid login credentials')) return 'Имэйл хаяг эсвэл нууц үг буруу байна';
  if (message.includes('Email not confirmed')) return 'Имэйл хаягаа баталгаажуулна уу';
  if (message.includes('User already registered')) return 'Энэ имэйл хаяг аль хэдийн бүртгэлтэй байна';
  if (message.includes('Password should be at least')) return 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой';
  if (message.includes('Unable to validate email')) return 'Имэйл хаяг буруу байна';
  if (message.includes('Email rate limit exceeded')) return 'Хэт олон удаа оролдлоо. Түр хүлээгээд дахин оролдоно уу';
  if (message.includes('For security purposes')) return 'Аюулгүй байдлын үүднээс түр хүлээнэ үү';
  if (message.includes('Error sending confirmation email')) return 'Баталгаажуулах имэйл илгээхэд алдаа гарлаа';
  return message;
}

export async function signIn(formData: FormData) {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const redirectTo = String(formData.get('redirect') || '/post');
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?message=${encodeURIComponent(translateError(error.message))}&redirect=${redirectTo}`);
  redirect(redirectTo);
}

export async function signUp(formData: FormData) {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const redirectTo = String(formData.get('redirect') || '/dashboard');
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) redirect(`/login?message=${encodeURIComponent(translateError(error.message))}&redirect=${redirectTo}`);
  redirect(`/login?message=${encodeURIComponent('Бүртгэл үүслээ. Имэйлээ шалгаж баталгаажуулна уу')}&redirect=${redirectTo}`);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}

export async function resetPassword(formData: FormData) {
  const email = String(formData.get('email') || '');
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://uuruu-mn.vercel.app/auth/callback?next=/reset-password',
  });
  if (error) redirect(`/login?message=${encodeURIComponent(translateError(error.message))}`);
  redirect(`/login?message=${encodeURIComponent('Нууц үг сэргээх холбоосыг имэйл рүү илгээлээ')}`);
}