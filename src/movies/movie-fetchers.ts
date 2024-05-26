import type { Id, PaginationResponse } from '@/common/common-types';
import type { TImage } from '@/medias/media-types';
import { tmdbClient } from '@/tmdb/tmdb-client';
import {
  VIEW_FILTER_LIMIT,
  filterViewablePageResults,
  filterViewablePeople,
  shouldViewMovie,
} from '@/view-filters/view-filter-utils';
import { cache } from 'react';
import type {
  Genre,
  MovieCast,
  MovieCrew,
  MovieDetails,
  MovieListItem,
  MovieVideo,
} from './movie-types';

export const getMovie = cache(async (movieId: Id) => {
  const movie = await tmdbClient.get<MovieDetails>(`/movie/${movieId}`);

  if (!shouldViewMovie(movie)) {
    return null;
  }

  return movie;
});

// TODO: Remove this
const wait = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

export const getMovieVideos = cache(async (movieId: Id) => {
  const videos = await tmdbClient.get<PaginationResponse<MovieVideo>>(
    `/movie/${movieId}/videos`,
  );
  await wait();
  return videos;
});

export const getMovieImages = cache(async (movieId: Id) => {
  const images = await tmdbClient.get<{
    backdrops: TImage[];
    logos: TImage[];
    posters: TImage[];
  }>(`/movie/${movieId}/images`);
  await wait();
  return images;
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
    await wait();
    const searchParams = new URLSearchParams();
    searchParams.append('page', page.toString());

    const recommendations = await tmdbClient.get<
      PaginationResponse<MovieListItem>
    >(`/movie/${movieId}/recommendations`, searchParams);

    return filterViewablePageResults(recommendations);
  },
);

export const getMovieCredits = cache(async (movieId: Id) => {
  const credits = await tmdbClient.get<{
    cast: MovieCast[];
    crew: MovieCrew[];
  }>(`/movie/${movieId}/credits`);

  credits.cast = filterViewablePeople(credits.cast);
  credits.crew = filterViewablePeople(credits.crew);
  await wait();
  return credits;
});
