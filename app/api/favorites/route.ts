import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const { ids } = await req.json();

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ listings: [] });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .in('id', ids)
    .eq('status', 'approved');

  if (error) {
    return NextResponse.json({ listings: [] }, { status: 500 });
  }

  return NextResponse.json({ listings: data || [] });
}