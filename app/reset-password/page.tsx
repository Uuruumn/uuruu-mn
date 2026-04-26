'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (password.length < 6) {
      setMessage('Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.');
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage('Алдаа гарлаа. Дахин оролдоно уу.');
    } else {
      setMessage('Нууц үг амжилттай шинэчлэгдлээ.');
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
            onClick={handleUpdate}
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
            {loading ? 'Хадгалж байна...' : 'Хадгалах'}
          </button>

          {message && (
            <p style={{ marginTop: 16, color: 'var(--muted)' }}>
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