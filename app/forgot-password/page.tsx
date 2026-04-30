'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      setIsError(true);
      setMessage('Имэйл хаягаа оруулна уу');
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/confirm`,
    });

    if (error) {
      setIsError(true);
      setMessage('Алдаа гарлаа. Дахин оролдоно уу.');
    } else {
      setIsError(false);
      setMessage('Имэйл илгээгдлээ. Та шалгана уу.');
    }

    setLoading(false);
  };

  return (
    <main className="page-main">
      <div className="container" style={{ maxWidth: 420 }}>
        <div className="content-card" style={{ textAlign: 'center', padding: 28 }}>
          <h1 style={{ marginBottom: 8 }}>Нууц үг сэргээх</h1>
          <p className="small-meta" style={{ marginBottom: 24 }}>
            Имэйл хаягаа оруулж нууц үг сэргээх холбоос авна уу.
          </p>

          <input
            type="email"
            placeholder="Имэйл хаяг"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              height: 48,
              borderRadius: 12,
              border: '1px solid var(--border)',
              padding: '0 14px',
              marginBottom: 16,
              fontSize: '0.95rem',
            }}
          />

          <button
            onClick={handleReset}
            disabled={loading}
            style={{
              width: '100%',
              height: 48,
              borderRadius: 12,
              border: 'none',
              background: 'var(--gold)',
              color: '#111',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            {loading ? 'Илгээж байна...' : 'Сэргээх имэйл илгээх'}
          </button>

          {message && (
            <p style={{ marginTop: 16, color: isError ? '#e53e3e' : '#38a169', fontWeight: 600 }}>
              {message}
            </p>
          )}

          <div style={{ marginTop: 20 }}>
            <Link href="/login" className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>
              ← Буцах
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}