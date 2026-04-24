'use client';
import { deleteListing } from './actions';

export function DeleteButton({ id }: { id: string }) {
  return (
    <form action={deleteListing}>
      <input type="hidden" name="id" value={id} />
      <button
        className="btn btn-ghost"
        type="submit"
        style={{ fontSize: '0.88rem', height: 38, padding: '0 14px', color: '#ef4444', borderColor: '#fca5a5' }}
        onClick={(e) => {
          if (!confirm('Зарыг устгах уу? Төлбөр буцаан олгохгүй.')) {
            e.preventDefault();
          }
        }}
      >
        🗑 Устгах
      </button>
    </form>
  );
}