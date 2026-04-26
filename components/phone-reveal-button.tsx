'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PhoneRevealButtonProps {
  phone: string;
  fullWidth?: boolean;
}

export default function PhoneRevealButton({ phone, fullWidth = false }: PhoneRevealButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [hover, setHover] = useState(false);

  const handleAgree = () => {
    setShowModal(false);
    setRevealed(true);
  };

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
    color: 'white',
    fontWeight: 800,
    height: fullWidth ? 56 : 44,
    padding: fullWidth ? '0 28px' : '0 18px',
    borderRadius: fullWidth ? 16 : 14,
    border: 'none',
    cursor: 'pointer',
    fontSize: fullWidth ? '1rem' : '0.95rem',
    width: fullWidth ? '100%' : 'auto',
    minWidth: fullWidth ? '100%' : 'auto',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'all 0.25s ease',
    transform: hover ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: 'none',
  };

  if (revealed) {
    return (
      <a
        href={`tel:${phone}`}
        style={btnStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        📞 {phone}
      </a>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        style={btnStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        📞 Холбогдох
      </button>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: 20,
              padding: '32px 28px',
              maxWidth: 460,
              width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            <h3 style={{ margin: '0 0 12px', fontSize: '1.2rem' }}>
              Холбоо барих мэдээлэл харах
            </h3>

            <p style={{ color: '#666', lineHeight: 1.7, margin: '0 0 16px', fontSize: '0.93rem' }}>
              Зар байршуулагчийн утасны дугаарыг харахын тулд манай{' '}
              <Link href="/terms" target="_blank" style={{ color: '#1a1a2e', fontWeight: 600 }}>
                үйлчилгээний нөхцөл
              </Link>{' '}
              болон{' '}
              <Link href="/privacy" target="_blank" style={{ color: '#1a1a2e', fontWeight: 600 }}>
                нууцлалын бодлого
              </Link>
              -той танилцаж зөвшөөрнө үү.
            </p>

            <p
              style={{
                fontSize: '0.88rem',
                color: '#888',
                lineHeight: 1.65,
                margin: '0 0 24px',
                padding: '12px 16px',
                background: '#f8f8f8',
                borderRadius: 10,
              }}
            >
              Утасны дугаарыг зөвхөн үл хөдлөхийн хэлцэлтэй холбоотой зорилгоор ашиглах бөгөөд
              спам, луйвар болон бусад хууль бус зорилгоор ашиглахгүй болно.
            </p>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 10,
                  border: '1.5px solid #ddd',
                  background: 'white',
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: '#666',
                }}
              >
                Цуцлах
              </button>

              <button
                onClick={handleAgree}
                style={{
                  flex: 2,
                  padding: '12px',
                  borderRadius: 10,
                  border: 'none',
                  background: '#1a1a2e',
                  cursor: 'pointer',
                  fontWeight: 700,
                  color: 'white',
                  fontSize: '0.97rem',
                }}
              >
                Зөвшөөрөх
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}