import { ID, PaginationResponse } from '@/common/CommonTypes';
import { CustomError } from '@/error-handling/CustomError';
import {
  filterViewablePageResults,
  filterViewablePeople,
  shouldViewMovie,
  VIEW_FILTER_LIMIT,
} from '@/view-filters/ViewFiltersUtils';
import { MovieDetails, Genre, Movie } from './MoviesTypes';
import queryString from 'query-string';
import { tmdbClient } from '@/tmdb-client/tmdbClient';

const getMovie = async <T extends Movie>(
  movieId: ID,
  args: {
    appendToResponse?: string[];
    params?: queryString.StringifiableRecord;
  },
) => {
  const movie = await tmdbClient.get<T>(`/movie/${movieId}`, {
    ...args.params,
    append_to_response: args.appendToResponse?.join(),
  });
  if (!shouldViewMovie(movie)) {
    throw new CustomError(
      404,
      'The resource you requested could not be found.',
    );
  }
  return movie;
};

const getMovieGenres = async () => {
  const { genres } = await tmdbClient.get<{ genres: Genre[] }>(
    '/genre/movie/list',
  );
  return genres;
};

const getDiscoverMovies = async (
  page: number,
  params: { genreId?: ID; sortBy?: string },
) => {
  const movies = await tmdbClient.get<PaginationResponse<Movie>>(
    '/discover/movie',
    {
      with_genres: params.genreId,
      sort_by: params.sortBy,
      page,
      'vote_count.gte': VIEW_FILTER_LIMIT.minVoteCount,
    },
  );

  return filterViewablePageResults(movies);
};

const getPopularMovies = async (page: number) => {
  const movies = await tmdbClient.get<PaginationResponse<Movie>>(
    '/movie/popular',
    {
      page,
    },
  );

  return filterViewablePageResults(movies);
};

const getTopRatedMovies = async (page: number) => {
  const movies = await tmdbClient.get<PaginationResponse<Movie>>(
    '/movie/top_rated',
    {
      page,
    },
  );

  return filterViewablePageResults(movies);
};

const getMovieDetails = async (movieId: ID): Promise<MovieDetails> => {
  const movie = await getMovie<MovieDetails>(movieId, {
    appendToResponse: ['images,videos,credits'],
  });

  movie.credits.cast = filterViewablePeople(movie.credits.cast);
  movie.credits.crew = filterViewablePeople(movie.credits.crew);

  return movie;
};

const getMovieRecommendations = async (
  movieId: ID,
  params: { page: number },
) => {
  // To be sure movie is viewable, we fetch it too
  const movie = await getMovie<
    Movie & { recommendations: PaginationResponse<Movie> }
  >(movieId, {
    appendToResponse: ['recommendations'],
    params,
  });

  return filterViewablePageResults(movie.recommendations);
};

export const moviesService = {
  getMovie,
  getMovieGenres,
  getDiscoverMovies,
  getPopularMovies,
  getTopRatedMovies,
  getMovieDetails,
  getMovieRecommendations,
};
