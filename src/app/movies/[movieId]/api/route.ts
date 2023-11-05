import { getMovieRecommendations } from '@/movies/movie-fetchers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// TODO: Route handler file'larının nereye konulması öneriliyor bi bak.

// TODO: Route handler'lar için error handling.

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const movieId = Number(searchParams.get('movieId'));
  const page = Number(searchParams.get('page'));

  const moviesPage = await getMovieRecommendations(movieId, { page });

  return NextResponse.json(moviesPage);
}
