import { signIn, signUp } from './actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; redirect?: string }>;
}) {
  const { message, redirect } = await searchParams;
  const redirectTo = redirect || '/dashboard';

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="section-kicker">Account</div>
        <h1 style={{ marginTop: 10 }}>Нэвтрэх / Бүртгүүлэх</h1>
        <p className="auth-meta">Имэйл хаяг ашиглан нэвтэрч, заруудаа удирдана уу.</p>
        {message ? <div className="notice">{message}</div> : null}
        <form className="form-grid single-col">
          <input type="hidden" name="redirect" value={redirectTo} />
          <input className="full-width" name="email" type="email" placeholder="Имэйл хаяг" required />
          <input className="full-width" name="password" type="password" placeholder="Нууц үг" required minLength={6} />
          <button className="btn btn-primary btn-block" formAction={signIn}>Нэвтрэх</button>
          <button className="btn btn-ghost btn-block" formAction={signUp}>Шинэ бүртгэл үүсгэх</button>
        </form>
      </div>
    </main>
  );
}