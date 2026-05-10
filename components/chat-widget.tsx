'use client';

import { useEffect, useRef, useState } from 'react';

const faqs = [
  { q: 'Uuruu.mn ямар үйлчилгээ вэ?', a: 'Uuruu.mn нь үл хөдлөх хөрөнгийн зар нийтлэх платформ бөгөөд өмчлөгч болон худалдан авагч, түрээслэгч нарыг шууд холбох зорилготой үйлчилгээ юм.' },
  { q: 'Uuruu.mn зуучлал хийдэг үү?', a: 'Үгүй. Uuruu.mn нь үл хөдлөх хөрөнгийн зар нийтлэх платформ бөгөөд хэрэглэгчид хоорондоо шууд холбогдон харилцана.' },
  { q: 'Зар хэрхэн оруулах вэ?', a: 'Нэвтэрсний дараа "Зар оруулах" хэсэгт орж шаардлагатай мэдээллээ бөглөн зар нийтлэх боломжтой.' },
  { q: 'Зар оруулах төлбөр хэд вэ?', a: 'Нэг зар байршуулах үнэ 25,000₮ байна.' },
  { q: 'Зар хэдэн хоног идэвхтэй байх вэ?', a: 'Зар нь 30 хоногийн хугацаанд идэвхтэй харагдана. Хугацаа дууссаны дараа автоматаар нуугдах бөгөөд дахин төлбөр төлснөөр сэргээх боломжтой.' },
  { q: 'Ямар төлбөрийн хэрэгсэл ашиглах вэ?', a: 'Одоогоор зөвхөн QPay ашиглан төлбөр төлөх боломжтой.' },
  { q: 'Буцаан олголт байдаг уу?', a: 'Нэгэнт зар нийтлэгдсэн тохиолдолд буцаан олголт хийгдэхгүй.' },
  { q: 'Хуурамч зар байвал яах вэ?', a: 'Uuruu.mn нь DAN болон HUR системтэй холбогдон, зөвхөн өөрийн нэр дээр бүртгэлтэй үл хөдлөхийг нийтлэх боломжийг олгодог.' },
  { q: 'Миний мэдээлэл аюулгүй юу?', a: 'Uuruu.mn нь хэрэглэгчийн мэдээллийн аюулгүй байдлыг хамгаалахад анхаарч ажилладаг бөгөөд холбоо барих мэдээллийг зөвхөн зарын зориулалтаар ашиглана.' },
  { q: 'Хэдэн зураг оруулах боломжтой вэ?', a: 'Нэг зар дээр дээд тал нь 10 зураг байршуулах боломжтой.' },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showFaqs, setShowFaqs] = useState(true);
  const [messages, setMessages] = useState<{ from: 'bot' | 'user'; text: string }[]>([
    { from: 'bot', text: 'Сайн байна уу? Танд хэрэгтэй асуултаа сонгоно уу.' },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFaqClick = (faq: { q: string; a: string }) => {
    setMessages(prev => [
      ...prev,
      { from: 'user', text: faq.q },
      { from: 'bot', text: faq.a },
    ]);
    setShowFaqs(false);
  };

  const handleReset = () => {
    setMessages([{ from: 'bot', text: 'Сайн байна уу? Танд хэрэгтэй асуултаа сонгоно уу.' }]);
    setShowFaqs(true);
  };

  return (
    <div className="chatWidget">
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
          }}
        />
      )}

      {open && (
        <div className="chatPanel" style={{ zIndex: 1000 }}>
          <div className="chatHeader">
            <div className="chatBrand">
              <div className="chatLogo">U</div>
              <div>
                <div className="chatTitle">Тусламж</div>
                <div className="chatSubtitle">Түгээмэл асуултууд</div>
              </div>
            </div>
            <button type="button" className="chatClose" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>

          <div className="chatMessages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatRow ${msg.from === 'user' ? 'chatRowUser' : 'chatRowBot'}`}>
                <div className={`chatBubble ${msg.from === 'user' ? 'chatBubbleUser' : 'chatBubbleBot'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatFaqArea">
            {showFaqs ? (
              <>
                <div className="chatHint">Түгээмэл асуултууд</div>
                {faqs.map((faq, i) => (
                  <button type="button" key={i} className="chatFaqButton" onClick={() => handleFaqClick(faq)}>
                    <span>{faq.q}</span>
                    <span className="chatArrow">›</span>
                  </button>
                ))}
              </>
            ) : (
              <button type="button" className="chatMoreButton" onClick={() => setShowFaqs(true)}>
                Бусад асуулт харах
              </button>
            )}
            <button type="button" className="chatResetButton" onClick={handleReset}>
              Эхлэлд буцах
            </button>
          </div>
        </div>
      )}

      {!open && (
        <button type="button" className="chatToggle" onClick={() => setOpen(true)} aria-label="Uuruu.mn тусламж">
          <span className="chatToggleIcon">U</span>
        </button>
      )}
    </div>
  );
}