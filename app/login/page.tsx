'use client';

import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
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

function SubmitButton({
  text,
  pendingText,
  formAction,
}: {
  text: string;
  pendingText: string;
  formAction: (formData: FormData) => void;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      formAction={formAction}
      disabled={pending}
      style={{
        width: '100%',
        height: 52,
        borderRadius: 14,
        background: 'var(--gold)',
        color: '#0f172a',
        fontWeight: 700,
        border: 'none',
        cursor: pending ? 'not-allowed' : 'pointer',
        opacity: pending ? 0.7 : 1,
      }}
    >
      {pending ? pendingText : text}
    </button>
  );
}

export default function LoginPage() {
  const searchParams = useSearchParams();

  const message = searchParams.get('message');
  const redirect = searchParams.get('redirect');
  const modeParam = searchParams.get('mode');
  const redirectTo = redirect || '/dashboard';

  const [mode, setMode] = useState<Mode>(() => getInitialMode(modeParam, redirect));

  useEffect(() => {
    setMode(getInitialMode(modeParam, redirect));
  }, [modeParam, redirect]);

  // ⭐ 成功メッセージ判定
  const isSuccessMessage =
    message?.includes('баталгаажлаа') ||
    message?.includes('Бүртгэл үүслээ') ||
    message?.includes('амжилттай') ||
    message?.includes('илгээлээ');

  const inputStyle = {
    width: '100%',
    height: 52,
    borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.07)',
    padding: '0 16px',
    color: 'white',
  };

  const secondaryButtonStyle = {
    width: '100%',
    height: 52,
    borderRadius: 14,
    background: 'rgba(255,255,255,0.08)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.15)',
    cursor: 'pointer',
  };

  const MessageBox = () => (
    <div
      style={{
        background: isSuccessMessage
          ? 'rgba(16,185,129,0.15)'
          : 'rgba(239,68,68,0.15)',
        border: isSuccessMessage
          ? '1px solid rgba(16,185,129,0.35)'
          : '1px solid rgba(239,68,68,0.3)',
        borderRadius: 12,
        padding: '12px 16px',
        color: isSuccessMessage ? '#86efac' : '#fca5a5',
        marginBottom: 20,
        fontWeight: 600,
        textAlign: 'center',
      }}
    >
      {isSuccessMessage ? '✅ ' : '⚠️ '}
      {message}
    </div>
  );

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

          {message && <MessageBox />}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={() => setMode('login')} style={{ ...secondaryButtonStyle, background: 'var(--gold)', color: '#0f172a', fontWeight: 700 }}>
              Нэвтрэх
            </button>

            <button onClick={() => setMode('register')} style={secondaryButtonStyle}>
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

        {message && <MessageBox />}

        <form style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input type="hidden" name="redirect" value={redirectTo} />

          <input name="email" type="email" placeholder="Имэйл хаяг" required style={inputStyle} />
          <input name="password" type="password" placeholder="Нууц үг" required style={inputStyle} />

          {mode === 'login' ? (
            <>
              <SubmitButton text="Нэвтрэх" pendingText="Нэвтэрч байна..." formAction={signIn} />

              <div style={{ textAlign: 'right', marginTop: 6 }}>
                <Link href="/forgot-password" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem' }}>
                  Нууц үг мартсан уу?
                </Link>
              </div>

              <button type="button" onClick={() => setMode('register')} style={secondaryButtonStyle}>
                Бүртгэл байхгүй юу? Бүртгүүлэх
              </button>
            </>
          ) : (
            <>
              <SubmitButton text="Бүртгүүлэх" pendingText="Бүртгэж байна..." formAction={signUp} />

              <button type="button" onClick={() => setMode('login')} style={secondaryButtonStyle}>
                Бүртгэлтэй юу? Нэвтрэх
              </button>
            </>
          )}
        </form>
      </div>
    </main>
  );
}