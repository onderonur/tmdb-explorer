import { searchMulti } from '@/search/search-fetchers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get('page'));
  const query = request.nextUrl.searchParams.get('query') ?? '';
  const peoplePage = await searchMulti({
    query,
    page,
  });
  return NextResponse.json(peoplePage);
}
