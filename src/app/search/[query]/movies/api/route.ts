import { searchMovies } from '@/search/search-fetchers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params: { query } }: { params: { query: string } },
) {
  const { searchParams } = request.nextUrl;

  const page = Number(searchParams.get('page'));

  const moviesPage = await searchMovies({
    page,
    query,
  });

  return NextResponse.json(moviesPage);
}
