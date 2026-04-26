'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-client';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage('Алдаа гарлаа');
    } else {
      setMessage('Нууц үг амжилттай шинэчлэгдлээ');
    }
  };

  return (
    <main className="page-main">
      <div className="container">
        <h1>Шинэ нууц үг</h1>

        <input
          type="password"
          placeholder="Шинэ нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleUpdate}>
          Хадгалах
        </button>

        {message && <p>{message}</p>}
      </div>
    </main>
  );
}