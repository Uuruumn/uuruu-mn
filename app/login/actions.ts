'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';

function translateError(message: string): string {
  const lower = message.toLowerCase();

  if (message.includes('Invalid login credentials')) {
    return 'Имэйл хаяг эсвэл нууц үг буруу байна';
  }

  if (message.includes('Email not confirmed')) {
    return 'Имэйл хаягаа баталгаажуулна уу';
  }

  if (message.includes('User already registered')) {
    return 'Энэ имэйл хаяг аль хэдийн бүртгэлтэй байна';
  }

  if (message.includes('Password should be at least')) {
    return 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой';
  }

  if (message.includes('Unable to validate email') || message.includes('Invalid email')) {
    return 'Имэйл хаяг буруу байна';
  }

  if (message.includes('Email rate limit exceeded')) {
    return 'Хэт олон удаа оролдлоо. Түр хүлээгээд дахин оролдоно уу';
  }

  if (message.includes('For security purposes')) {
    return 'Аюулгүй байдлын үүднээс түр хүлээгээд дахин оролдоно уу';
  }

  if (message.includes('Error sending confirmation email')) {
    return 'Баталгаажуулах имэйл илгээхэд алдаа гарлаа';
  }

  if (
    lower.includes('rate limit') ||
    lower.includes('email rate limit') ||
    lower.includes('too many') ||
    lower.includes('over email send rate limit')
  ) {
    return 'Имэйл илгээх хязгаарт хүрсэн байна. Түр хүлээгээд дахин оролдоно уу.';
  }

  return 'Алдаа гарлаа. Дахин оролдоно уу.';
}

export async function signIn(formData: FormData) {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const redirectTo = String(formData.get('redirect') || '/post');

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(
      `/login?message=${encodeURIComponent(translateError(error.message))}&redirect=${encodeURIComponent(redirectTo)}`
    );
  }

  redirect(redirectTo);
}

export async function signUp(formData: FormData) {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const redirectTo = String(formData.get('redirect') || '/dashboard');

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect(
      `/login?message=${encodeURIComponent(translateError(error.message))}&redirect=${encodeURIComponent(redirectTo)}`
    );
  }

  redirect(
    `/login?message=${encodeURIComponent('Бүртгэл үүслээ. Имэйлээ шалгаж баталгаажуулна уу')}&redirect=${encodeURIComponent(redirectTo)}`
  );
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
    redirectTo: 'https://uuruu-mn.vercel.app/reset-password',
  });

  if (error) {
    redirect(`/login?message=${encodeURIComponent(translateError(error.message))}`);
  }

  redirect(
    `/login?message=${encodeURIComponent('Нууц үг сэргээх холбоосыг имэйл рүү илгээлээ')}`
  );
}