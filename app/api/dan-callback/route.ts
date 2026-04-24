// DANシステムからのコールバック処理
import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken, getDanServiceData } from '@/lib/dan-auth';
import { extractPropertyList } from '@/lib/hur-property';
import { createClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // エラーの場合
  if (error || !code) {
    return NextResponse.redirect(new URL('/post?dan_error=1', req.url));
  }

  try {
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/dan-callback`;

    // codeをtokenに交換
    const accessToken = await exchangeCodeForToken(code, redirectUri);

    // ХУРから物件データを取得
    const serviceData = await getDanServiceData(accessToken);
    const properties = extractPropertyList(serviceData);

    // Supabaseのセッションからユーザーを取得
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL('/login?redirect=/post', req.url));
    }

    // 物件データをSupabaseに保存
    if (properties.length > 0) {
      await supabase.from('verified_properties').upsert(
        properties.map(p => ({
          user_id: user.id,
          property_number: p.propertyNumber,
          address: p.address,
          property_type: p.propertyType,
          area: p.area,
          owner_name: p.ownerName,
          certificate_number: p.certificateNumber,
          verified_at: new Date().toISOString(),
        })),
        { onConflict: 'property_number' }
      );
    }

    // 投稿ページにリダイレクト（DAN認証済みフラグ付き）
    return NextResponse.redirect(new URL('/post?dan_verified=1', req.url));

  } catch (err) {
    console.error('DANコールバックエラー:', err);
    return NextResponse.redirect(new URL('/post?dan_error=1', req.url));
  }
}