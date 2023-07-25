import { getPopularMovies } from '@/movies/movie-fetchers';
import { NextRequest, NextResponse } from 'next/server';

// TODO: Route handler file'larının nereye konulması öneriliyor bi bak.

// TODO: Route handler'lar için error handling.

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page');
  const moviesPage = await getPopularMovies(Number(page));
  return NextResponse.json(moviesPage);
}
