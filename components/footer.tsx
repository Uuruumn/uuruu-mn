import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>Uuruu.mn</h4>
          <p className="small-meta">Үл хөдлөх хөрөнгийн орчин үеийн зарын платформ.</p>
          <p className="small-meta" style={{ marginTop: 8 }}>
            📞 80702326<br />
            ✉ sonsooch@gmail.com
          </p>
        </div>
        <div>
          <h4>Холбоос</h4>
          <Link href="/">Нүүр</Link>
          <Link href="/listings">Зарууд</Link>
          <Link href="/post">Зар оруулах</Link>
        </div>
        <div>
          <h4>Тусламж</h4>
          <Link href="/terms">Үйлчилгээний нөхцөл</Link>
          <Link href="/privacy">Нууцын бодлого</Link>
          <Link href="/login">Нэвтрэх</Link>
        </div>
      </div>
    </footer>
  );
}