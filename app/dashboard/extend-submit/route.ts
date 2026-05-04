import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const listingId = String(formData.get('listing_id') || '');
  const senderName = String(formData.get('sender_name') || '');
  const paymentReference = String(formData.get('payment_reference') || '');

  const supabase = await createClient();

  // ログインユーザー確認
const { data: { user } } = await supabase.auth.getUser();
if (!user) {
  return NextResponse.redirect(new URL('/login', req.url));
}

  // 現在のexpires_atを取得
  const { data: listing } = await supabase
    .from('listings')
    .select('user_id, expires_at, title, location, price, phone')
    .eq('id', listingId)
    .single();

  if (!listing || listing.user_id !== user.id) {
  return NextResponse.redirect(new URL('/dashboard', req.url));
}

  // 今日から or 期限切れ日から30日延長
  const base = listing.expires_at && new Date(listing.expires_at) > new Date()
    ? new Date(listing.expires_at)
    : new Date();
  const newExpiresAt = new Date(base.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

  await supabase.from('listings').update({
    status: 'approved',
    expires_at: newExpiresAt,
    paid_at: new Date().toISOString(),
    payment_status: 'paid',
    payment_sender_name: senderName,
    payment_reference: paymentReference,
    payment_submitted_at: new Date().toISOString(),
  }).eq('id', listingId);

  // メール通知
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.ADMIN_EMAIL!,
      subject: 'Uuruu.mn — Зар сунгагдлаа',
      html: `
        <h2>Зар 30 хоногоор сунгагдлаа</h2>
        <p><strong>Гарчиг:</strong> ${listing.title}</p>
        <p><strong>Байршил:</strong> ${listing.location}</p>
        <p><strong>Үнэ:</strong> ${Number(listing.price).toLocaleString()}₮</p>
        <p><strong>Утас:</strong> ${listing.phone}</p>
        <p><strong>Илгээгч:</strong> ${senderName}</p>
        <p><strong>Лавлах:</strong> ${paymentReference}</p>
        <p><strong>Шинэ дуусах огноо:</strong> ${new Date(newExpiresAt).toLocaleDateString('mn-MN')}</p>
      `,
    });
  } catch (e) {
    console.warn('Email notification failed:', e);
  }

  return NextResponse.redirect(new URL('/dashboard', req.url));
}