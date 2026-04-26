'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/reset-password`,
    });

    if (error) {
      setMessage('Алдаа гарлаа');
    } else {
      setMessage('Имэйл илгээгдлээ. Та шалгана уу.');
    }
  };

  return (
    <main className="page-main">
      <div className="container">
        <h1>Нууц үг сэргээх</h1>

        <input
          type="email"
          placeholder="Имэйл хаяг"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleReset}>
          Сэргээх имэйл илгээх
        </button>

        {message && <p>{message}</p>}
      </div>
    </main>
  );
}