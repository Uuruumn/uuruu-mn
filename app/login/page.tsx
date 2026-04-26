'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn, signUp } from './actions';

type Mode = 'choose' | 'login' | 'register';

function getInitialMode(modeParam: string | null, redirectParam: string | null): Mode {
  if (modeParam === 'login') return 'login';
  if (modeParam === 'register') return 'register';
  if (redirectParam === '/post') return 'choose';
  return 'login';
}

export default function LoginPage() {
  const searchParams = useSearchParams();

  const message = searchParams.get('message');
  const redirect = searchParams.get('redirect');
  const modeParam = searchParams.get('mode');

  const redirectTo = redirect || '/dashboard';

  const [mode, setMode] = useState<Mode>(() =>
    getInitialMode(modeParam, redirect)
  );

  useEffect(() => {
    setMode(getInitialMode(modeParam, redirect));
  }, [modeParam, redirect]);

  if (mode === 'choose') {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
      }}>
        <div style={{
          width: 'min(420px, calc(100% - 32px))',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 28,
          padding: '48px 40px',
          backdropFilter: 'blur(20px)',
          textAlign: 'center',
        }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 800, fontSize: '1.8rem', color: 'white' }}>
              Uuruu<span style={{ color: 'var(--gold)' }}>.mn</span>
            </div>
          </div>

          <h1 style={{ color: 'white', fontSize: '1.6rem', marginBottom: 8 }}>
            Тавтай морил
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>
            Зар байршуулахын тулд эхлээд бүртгэл үүсгэх эсвэл нэвтэрнэ үү.
          </p>

          {message && (
            <div style={{
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 12,
              padding: '12px 16px',
              color: '#fca5a5',
              marginBottom: 20,
            }}>
              {message}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={() => setMode('login')} type="button" style={{
              width: '100%',
              height: 52,
              borderRadius: 14,
              background: 'var(--gold)',
              color: '#0f172a',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
            }}>
              Нэвтрэх
            </button>

            <button onClick={() => setMode('register')} type="button" style={{
              width: '100%',
              height: 52,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.08)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.15)',
              cursor: 'pointer',
            }}>
              Шинэ бүртгэл үүсгэх
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
    }}>
      <div style={{
        width: 'min(420px, calc(100% - 32px))',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 28,
        padding: '48px 40px',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontWeight: 800, fontSize: '1.4rem', color: 'white' }}>
            Uuruu<span style={{ color: 'var(--gold)' }}>.mn</span>
          </div>
        </div>

        <h1 style={{ color: 'white', fontSize: '1.6rem', marginBottom: 6 }}>
          {mode === 'login' ? 'Нэвтрэх' : 'Бүртгүүлэх'}
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
          {mode === 'login' ? 'Имэйл хаягаар нэвтэрнэ үү.' : 'Шинэ бүртгэл үүсгэнэ үү.'}
        </p>

        {message && (
          <div style={{
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 12,
            padding: '12px 16px',
            color: '#fca5a5',
            marginBottom: 20,
          }}>
            {message}
          </div>
        )}

        <form style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input type="hidden" name="redirect" value={redirectTo} />

          <input
            name="email"
            type="email"
            placeholder="Имэйл хаяг"
            required
            style={{
              width: '100%',
              height: 52,
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.07)',
              padding: '0 16px',
              color: 'white',
            }}
          />

          <input
            name="password"
            type="password"
            placeholder="Нууц үг"
            required
            style={{
              width: '100%',
              height: 52,
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.07)',
              padding: '0 16px',
              color: 'white',
            }}
          />

          {mode === 'login' ? (
            <>
              <button formAction={signIn} style={{
                width: '100%',
                height: 52,
                borderRadius: 14,
                background: 'var(--gold)',
                color: '#0f172a',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
              }}>
                Нэвтрэх
              </button>

              <Link
                href="/forgot-password"
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  textAlign: 'center',
                  fontSize: '0.92rem',
                  marginTop: 2,
                  textDecoration: 'underline',
                  textUnderlineOffset: 4,
                }}
              >
                Нууц үг мартсан уу?
              </Link>

              <button type="button" onClick={() => setMode('register')} style={{
                width: '100%',
                height: 52,
                borderRadius: 14,
                background: 'rgba(255,255,255,0.08)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.15)',
                cursor: 'pointer',
              }}>
                Бүртгэл байхгүй юу? Бүртгүүлэх
              </button>
            </>
          ) : (
            <>
              <button formAction={signUp} style={{
                width: '100%',
                height: 52,
                borderRadius: 14,
                background: 'var(--gold)',
                color: '#0f172a',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
              }}>
                Бүртгүүлэх
              </button>

              <button type="button" onClick={() => setMode('login')} style={{
                width: '100%',
                height: 52,
                borderRadius: 14,
                background: 'rgba(255,255,255,0.08)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.15)',
                cursor: 'pointer',
              }}>
                Бүртгэлтэй юу? Нэвтрэх
              </button>
            </>
          )}
        </form>
      </div>
    </main>
  );
}