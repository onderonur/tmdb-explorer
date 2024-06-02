import { getPopularMovies } from '@/features/movies/movies.data';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page');
  const moviesPage = await getPopularMovies(Number(page));
  return NextResponse.json(moviesPage);
}