import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash') ?? searchParams.get('code');
  const type = searchParams.get('type') ?? 'signup';
  const next = searchParams.get('next') ?? '/';

  if (tokenHash) {
    try {
      const cookieStore = await cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options)
                );
              } catch {
                // ignore
              }
            },
          },
        }
      );

      const { error } = await supabase.auth.verifyOtp({
        type: type as any,
        token_hash: tokenHash,
      });

      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
      console.error('OTP verify error:', error);
    } catch (err) {
      console.error('Auth callback error:', err);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}