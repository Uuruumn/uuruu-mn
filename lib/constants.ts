export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Орон сууц' },
  { value: 'house', label: 'Хашаа байшин' },
  { value: 'land', label: 'Газар' },
] as const;

export const LISTING_TYPES = [
  { value: 'sale', label: 'Зарах' },
  { value: 'rent', label: 'Түрээслэх' },
] as const;

export const POSTER_TYPES = [
  { value: 'individual', label: 'Иргэн' },
  { value: 'company', label: 'Хуулийн этгээд' },
] as const;

export const UB_DISTRICTS = [
  'Хан-Уул', 'Баянзүрх', 'Сүхбаатар', 'Чингэлтэй',
  'Баянгол', 'Сонгинохайрхан', 'Налайх', 'Багануур', 'Багахангай',
] as const;

export const AIMAGS = [
  'Архангай', 'Баян-Өлгий', 'Баянхонгор', 'Булган',
  'Говь-Алтай', 'Говьсүмбэр', 'Дархан-Уул', 'Дорноговь',
  'Дорнод', 'Дундговь', 'Завхан', 'Орхон', 'Өвөрхангай',
  'Өмнөговь', 'Сүхбаатар', 'Сэлэнгэ', 'Төв', 'Увс',
  'Ховд', 'Хөвсгөл', 'Хэнтий',
] as const;

export const UB_DISTRICT_KHOROO: Record<string, number> = {
  'Хан-Уул': 16,
  'Баянзүрх': 28,
  'Сүхбаатар': 20,
  'Чингэлтэй': 22,
  'Баянгол': 23,
  'Сонгинохайрхан': 32,
  'Налайх': 6,
  'Багануур': 5,
  'Багахангай': 2,
};

export const HEATING_TYPES = [
  { value: 'central', label: 'Төвийн дулаан' },
  { value: 'stove', label: 'Зуух' },
  { value: 'electric', label: 'Цахилгаан' },
  { value: 'other', label: 'Бусад' },
] as const;

export const WATER_TYPES = [
  { value: 'central', label: 'Төвийн ус' },
  { value: 'well', label: 'Худаг' },
  { value: 'other', label: 'Бусад' },
] as const;

export const FENCE_TYPES = [
  { value: 'full', label: 'Бүрэн хашаатай' },
  { value: 'partial', label: 'Хагас хашаатай' },
  { value: 'none', label: 'Хашаагүй' },
] as const;