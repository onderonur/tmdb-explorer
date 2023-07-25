import { ID, PaginationResponse } from '@/common/CommonTypes';
import { tmdbClient } from '@/tmdb/tmdb-client';
// TODO: querystring type'larına gerek olmayabilir. URLSearchParams ile çöz.
import queryString from 'query-string';
import { Genre, Movie, MovieListItem } from './movie-types';
import {
  VIEW_FILTER_LIMIT,
  filterViewablePageResults,
  filterViewablePeople,
  shouldViewMovie,
} from '@/view-filters/view-filter-utils';
import { cache } from 'react';

// TODO: React cache function kullanımı lazım mı bak

// TODO: Bu movie detail cast vs fetch'ler ayrıştırılabilir de.

async function getMovie<T extends Movie>(
  movieId: ID,
  args: {
    appendToResponse?: string[];
    params?: queryString.StringifiableRecord;
  },
) {
  const movie = await tmdbClient.get<T>(`/movie/${movieId}`, {
    ...args.params,
    append_to_response: args.appendToResponse?.join(),
  });

  if (!shouldViewMovie(movie)) {
    return null;
  }

  return movie;
}

export const getMovieDetails = cache(async (movieId: ID) => {
  const movie = await getMovie<Movie>(movieId, {
    appendToResponse: ['images,videos,credits'],
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

export const getDiscoverMovies = cache(
  async (page: number, params: { genreId?: ID; sortBy?: string }) => {
    const movies = await tmdbClient.get<PaginationResponse<MovieListItem>>(
      '/discover/movie',
      {
        with_genres: params.genreId,
        sort_by: params.sortBy,
        page,
        'vote_count.gte': VIEW_FILTER_LIMIT.minVoteCount,
      },
    );

    return filterViewablePageResults(movies);
  },
);

export const getPopularMovies = cache(async (page: number) => {
  const movies = await tmdbClient.get<PaginationResponse<MovieListItem>>(
    '/movie/popular',
    {
      page,
    },
  );

  return filterViewablePageResults(movies);
});

export const getTopRatedMovies = cache(async (page: number) => {
  const movies = await tmdbClient.get<PaginationResponse<MovieListItem>>(
    '/movie/top_rated',
    {
      page,
    },
  );

  return filterViewablePageResults(movies);
});

export const getMovieGenres = cache(async () => {
  const { genres } = await tmdbClient.get<{ genres: Genre[] }>(
    '/genre/movie/list',
  );

  return genres;
});

export const getMovieRecommendations = cache(
  async (movieId: ID, params: { page: number }) => {
    // To be sure movie is viewable, we fetch it too
    const movie = await getMovie<Movie>(movieId, {
      appendToResponse: ['recommendations'],
      params,
    });

    if (!movie) {
      return null;
    }

    return filterViewablePageResults(movie.recommendations);
  },
);
