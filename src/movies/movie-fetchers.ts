import type { Id, PaginationResponse } from '@/common/common-types';
import { tmdbClient } from '@/tmdb/tmdb-client';
import type { Genre, MovieDetails, MovieListItem } from './movie-types';
import {
  VIEW_FILTER_LIMIT,
  filterViewablePageResults,
  filterViewablePeople,
  shouldViewMovie,
} from '@/view-filters/view-filter-utils';
import { cache } from 'react';

// TODO: React cache function kullanımı lazım mı bak

// TODO: Bu movie detail cast vs fetch'ler ayrıştırılabilir de.

async function getMovie<T extends MovieDetails>(
  movieId: Id,
  params?: {
    page?: number;
    appendToResponse: string[];
  },
) {
  const searchParams = new URLSearchParams();

  const appendToResponse = params?.appendToResponse.join(',');

  if (appendToResponse) {
    searchParams.set('append_to_response', appendToResponse);
  }

  if (params?.page) {
    searchParams.set('page', params.page.toString());
  }

  const movie = await tmdbClient.get<T>(`/movie/${movieId}`, searchParams);

  if (!shouldViewMovie(movie)) {
    return null;
  }

  return movie;
}

export const getMovieDetails = cache(async (movieId: Id) => {
  const movie = await getMovie<MovieDetails>(movieId, {
    appendToResponse: ['images', 'videos', 'credits'],
  });

  if (!movie) {
    return null;
  }

  if (movie.credits) {
    movie.credits.cast = filterViewablePeople(movie.credits.cast);
    movie.credits.crew = filterViewablePeople(movie.credits.crew);
  }

  return movie;
});

// TODO: cache function'ı object parametrelerle nasıl çalışıyor vs.
export const getDiscoverMovies = cache(
  async ({
    page,
    genreId,
    sortBy,
  }: {
    page: number;
    genreId?: Id;
    sortBy?: string;
  }) => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());
    searchParams.set(
      'vote_count.gte',
      VIEW_FILTER_LIMIT.minVoteCount.toString(),
    );

    if (genreId) {
      searchParams.set('with_genres', genreId.toString());
    }

    if (sortBy) {
      searchParams.set('sort_by', sortBy);
    }

    const movies = await tmdbClient.get<PaginationResponse<MovieListItem>>(
      '/discover/movie',
      searchParams,
    );

    return filterViewablePageResults(movies);
  },
);

export const getPopularMovies = cache(async (page: number) => {
  const movies = await tmdbClient.get<PaginationResponse<MovieListItem>>(
    '/movie/popular',
    new URLSearchParams({
      page: page.toString(),
    }),
  );

  return filterViewablePageResults(movies);
});

export const getTopRatedMovies = cache(async (page: number) => {
  const movies = await tmdbClient.get<PaginationResponse<MovieListItem>>(
    '/movie/top_rated',
    new URLSearchParams({
      page: page.toString(),
    }),
  );

  return filterViewablePageResults(movies);
});

export const getMovieGenres = cache(async () => {
  const { genres } = await tmdbClient.get<{ genres: Genre[] }>(
    '/genre/movie/list',
  );

  return genres;
});

export const getMovieGenre = cache(async (genreId: Id) => {
  const genres = await getMovieGenres();

  return genres.find((genre) => genre.id === genreId);
});

export const getMovieRecommendations = cache(
  async (movieId: Id, { page }: { page: number }) => {
    // To be sure movie is viewable, we fetch it too
    const movie = await getMovie<MovieDetails>(movieId, {
      page,
      appendToResponse: ['recommendations'],
    });

    if (!movie) {
      return null;
    }

    return filterViewablePageResults(movie.recommendations);
  },
);
