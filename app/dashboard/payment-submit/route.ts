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

  // 支払い確認と同時に自動公開
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

  await supabase.from('listings').update({
    payment_status: 'paid',
    payment_sender_name: senderName,
    payment_reference: paymentReference,
    payment_submitted_at: now.toISOString(),
    paid_at: now.toISOString(),
    status: 'approved',
    approved_at: now.toISOString(),
    expires_at: expiresAt,
  }).eq('id', listingId);

  // 物件情報を取得してメール通知
  const { data: listing } = await supabase
    .from('listings')
    .select('title, location, price, phone')
    .eq('id', listingId)
    .single();

  if (listing) {
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.ADMIN_EMAIL!,
        subject: 'Uuruu.mn — Төлбөр хийгдлээ, зар нийтлэгдлээ',
        html: `
          <h2>Төлбөр баталгаажиж, зар автоматаар нийтлэгдлээ</h2>
          <p><strong>Гарчиг:</strong> ${listing.title}</p>
          <p><strong>Байршил:</strong> ${listing.location}</p>
          <p><strong>Үнэ:</strong> ${Number(listing.price).toLocaleString()}₮</p>
          <p><strong>Утас:</strong> ${listing.phone}</p>
          <p><strong>Илгээгч:</strong> ${senderName}</p>
          <p><strong>Лавлах:</strong> ${paymentReference}</p>
        `,
      });
    } catch (e) {
      console.warn('Email notification failed:', e);
    }
  }

  return NextResponse.redirect(new URL('/dashboard', req.url));
}