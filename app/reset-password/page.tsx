'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setReady(true);
      } else {
        setIsError(true);
        setMessage('Линк хүчингүй байна. Дахин оролдоно уу.');
      }
    });
  }, []);

  const handleUpdate = async () => {
    if (password.length < 6) {
      setIsError(true);
      setMessage('Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.');
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setIsError(true);
      setMessage('Алдаа гарлаа. Дахин оролдоно уу.');
    } else {
      setIsError(false);
      setMessage('Нууц үг амжилттай шинэчлэгдлээ.');
      setTimeout(() => router.push('/login'), 2000);
    }

    setLoading(false);
  };

  return (
    <main className="page-main">
      <div className="container" style={{ maxWidth: 420 }}>
        <div className="content-card" style={{ textAlign: 'center', padding: 28 }}>
          <h1 style={{ marginBottom: 8 }}>Шинэ нууц үг</h1>

          <p className="small-meta" style={{ marginBottom: 24 }}>
            Шинэ нууц үгээ оруулж хадгална уу.
          </p>

          <input
            type="password"
            placeholder="Шинэ нууц үг"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!ready}
            style={{
              width: '100%',
              height: 48,
              borderRadius: 12,
              border: '1px solid var(--border)',
              padding: '0 14px',
              marginBottom: 16,
              fontSize: '0.95rem',
              opacity: ready ? 1 : 0.5,
            }}
          />

          <button
            onClick={handleUpdate}
            disabled={loading || !ready}
            style={{
              width: '100%',
              height: 48,
              borderRadius: 12,
              border: 'none',
              background: 'var(--gold)',
              color: '#111',
              fontWeight: 700,
              cursor: ready ? 'pointer' : 'not-allowed',
              fontSize: '1rem',
              opacity: ready ? 1 : 0.5,
            }}
          >
            {loading ? 'Хадгалж байна...' : 'Хадгалах'}
          </button>

          {message && (
            <p style={{ marginTop: 16, color: isError ? '#e53e3e' : '#38a169', fontWeight: 600 }}>
              {message}
            </p>
          )}

          <div style={{ marginTop: 20 }}>
            <Link href="/login" className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>
              Нэвтрэх хуудас руу буцах
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}