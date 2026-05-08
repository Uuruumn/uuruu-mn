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
      return NextResponse.json(
        { error: 'Өдрийн ашиглалтын хязгаарт хүрсэн байна. Маргааш дахин оролдоно уу.' },
        { status: 429 }
      );
    }

    if (now >= record.resetAt) {
      RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + 86400000 });
    } else {
      record.count++;
    }
  } else {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + 86400000 });
  }

  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'AI тохиргоо хийгдээгүй байна.' },
      { status: 500 }
    );
  }

  const { listingType, propertyType, location, title, price, area, rooms, floor } = await req.json();

  if (!propertyType || !location || !title) {
    return NextResponse.json(
      { error: 'Үл хөдлөхийн төрөл, байршил болон зарын гарчгийг бөглөнө үү.' },
      { status: 400 }
    );
  }

  const prompt = `Та Монгол хэлээр үл хөдлөх хөрөнгийн зарын тайлбар бичнэ.

Доорх мэдээлэлд үндэслэн богино, ойлгомжтой, итгэл төрүүлэхүйц зарын тайлбар бэлтгэнэ.

Мэдээлэл:
- Зарын төрөл: ${listingType === 'sale' ? 'Зарах' : 'Түрээслэх'}
- Үл хөдлөхийн төрөл: ${propertyType}
- Байршил: ${location}
- Зарын гарчиг: ${title}
- Үнэ: ${price ? Number(price).toLocaleString() + '₮' : 'тодорхойгүй'}
${area ? `- Талбай: ${area} м²` : ''}
${rooms ? `- Өрөөний тоо: ${rooms}` : ''}
${floor ? `- Давхар: ${floor}` : ''}

Чухал дүрэм:
1. Зөвхөн дээр өгөгдсөн мэдээллийг ашиглана.
2. Өгөгдөөгүй мэдээлэл нэмж бичихгүй.
3. Зогсоолтой, нар сайн тусдаг, сургууль ойр, засвар сайтай гэх мэт мэдээллийг дур мэдэн оруулахгүй.
4. 80-140 үгийн хооронд бичнэ.
5. Энгийн, ойлгомжтой, байгалийн Монгол хэлээр бичнэ.
6. Хэтрүүлэг, худал мэдээлэл, баталгаагүй давуу тал оруулахгүй.
7. Гарчиг, жагсаалт, markdown тэмдэглэгээ ашиглахгүй. Зөвхөн тайлбарын үндсэн текстийг бичнэ.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 450,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Gemini request failed');
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    const cleanText = text
      ?.replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^["“”]+|["“”]+$/g, '')
      .trim();

    if (!cleanText) throw new Error('No response');

    return NextResponse.json({ description: cleanText });
  } catch {
    return NextResponse.json(
      { error: 'AI тайлбар үүсгэхэд алдаа гарлаа. Дахин оролдоно уу.' },
      { status: 500 }
    );
  }
}