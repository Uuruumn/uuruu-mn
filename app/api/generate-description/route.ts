import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const DAILY_LIMIT = 3;

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const now = Date.now();
  const record = RATE_LIMIT_MAP.get(ip);

  if (record) {
    if (now < record.resetAt && record.count >= DAILY_LIMIT) {
      return NextResponse.json({ error: 'Өдрийн хязгаарт хүрлээ. Маргааш дахин оролдоно уу.' }, { status: 429 });
    }
    if (now >= record.resetAt) {
      RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + 86400000 });
    } else {
      record.count++;
    }
  } else {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + 86400000 });
  }

  const { listingType, propertyType, location, title, price, area, rooms, floor } = await req.json();

  const prompt = `Та монгол хэлээр үл хөдлөх хөрөнгийн зарын тайлбар бичнэ үү.

Мэдээлэл:
- Зарын төрөл: ${listingType === 'sale' ? 'Зарах' : 'Түрээслэх'}
- Үл хөдлөхийн төрөл: ${propertyType}
- Байршил: ${location}
- Гарчиг: ${title}
- Үнэ: ${price ? Number(price).toLocaleString() + '₮' : 'тодорхойгүй'}
${area ? `- Талбай: ${area}м²` : ''}
${rooms ? `- Өрөөний тоо: ${rooms}` : ''}
${floor ? `- Давхар: ${floor}` : ''}

ЧУХАЛ ДҮРМҮҮД:
1. Зөвхөн дээр өгсөн мэдээллийг ашиглана уу
2. Байхгүй мэдээллийг (зогсоол, нар тусдаг, сургууль ойр гэх мэт) ОГТХОН ч нэмж болохгүй
3. 200-400 үгийн хооронд байх
4. Байгалийн, итгэлтэй монгол хэлээр бичнэ үү
5. Хэтрүүлэг, худал мэдээлэл хориглоно`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleanText = text?.replace(/\*\*/g, '').replace(/\*/g, '').trim();

    if (!cleanText) throw new Error('No response');

    return NextResponse.json({ description: cleanText });
  } catch (error) {
    return NextResponse.json({ error: 'AI алдаа гарлаа. Дахин оролдоно уу.' }, { status: 500 });
  }
}