export const formatPrice = (value: number) =>
  new Intl.NumberFormat('mn-MN').format(value) + ' ₮';

export const formatDate = (value: string | null) => {
  if (!value) return '—';
  return new Intl.DateTimeFormat('mn-MN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(value));
};
