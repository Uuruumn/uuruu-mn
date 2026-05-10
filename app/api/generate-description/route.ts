import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const {
    listingType,
    propertyType,
    commercialSubtype,
    location,
    title,
    price,
    priceType,
  } = await req.json();

  if (!propertyType || !location || !title) {
    return NextResponse.json(
      { error: 'Үл хөдлөхийн төрөл, байршил болон зарын гарчгийг бөглөнө үү.' },
      { status: 400 }
    );
  }

  const actionText = listingType === 'rent' ? 'түрээслүүлнэ' : 'зарна';

  const typeLabel =
    propertyType === 'apartment' ? 'орон сууц' :
    propertyType === 'house' ? 'хашаа байшин' :
    propertyType === 'land' ? 'газар' :
    propertyType === 'commercial' ? 'арилжааны талбай' :
    propertyType;

  const formatPrice = () => {
    if (!price) return null;
    const num = Number(price);
    if (isNaN(num) || num <= 0) return null;
    const formatted = num.toLocaleString();
    if (priceType === 'per_m2') return `1 м² нь ${formatted}₮`;
    if (priceType === 'monthly') return `Сарын түрээс ${formatted}₮`;
    return `Үнэ ${formatted}₮`;
  };

  const priceText = formatPrice();

  const parts: string[] = [];

  parts.push(`${location}-д байрлах ${typeLabel} ${actionText}.`);

  if (commercialSubtype) {
    parts.push(`Үйлчилгээний төрөл: ${commercialSubtype}.`);
  }

  if (priceText) parts.push(`${priceText}.`);

  parts.push('Дэлгэрэнгүй мэдээллийг эзэнтэй нь шууд холбогдон авна уу.');

  const description = parts.join(' ');

  return NextResponse.json({ description, fallback: false });
}