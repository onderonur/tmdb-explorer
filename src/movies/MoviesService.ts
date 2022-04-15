import { ID, PaginationResponse } from '@/common/CommonTypes';
import { CustomError } from '@/error-handling/CustomError';
import {
  filterViewablePageResults,
  filterViewablePeople,
  shouldViewMovie,
  VIEW_FILTER_LIMIT,
} from '@/view-filters/ViewFiltersUtils';
import { BaseService } from '../api/BaseService';
import { MovieDetails, Genre, Movie } from './MoviesTypes';
import queryString from 'query-string';

class MoviesService extends BaseService {
  getMovie = async <T extends Movie>(
    movieId: ID,
    args: {
      appendToResponse?: string[];
      params?: queryString.StringifiableRecord;
    },
  ) => {
    const movie = await this.get<T>(`/movie/${movieId}`, {
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

  getMovieGenres = async () => {
    const { genres } = await this.get<{ genres: Genre[] }>('/genre/movie/list');
    return genres;
  };

  getDiscoverMovies = async (
    page: number,
    params: { genreId?: ID; sortBy?: string },
  ) => {
    const genreId = Number(params.genreId);
    const movies = await this.get<PaginationResponse<Movie>>(
      '/discover/movie',
      {
        with_genres: genreId ? [genreId] : [],
        sort_by: params.sortBy,
        page,
        'vote_count.gte': VIEW_FILTER_LIMIT.minVoteCount,
      },
    );

    return filterViewablePageResults(movies);
  };

  getPopularMovies = async (page: number) => {
    const movies = await this.get<PaginationResponse<Movie>>('/movie/popular', {
      page,
    });

    return filterViewablePageResults(movies);
  };

  getTopRatedMovies = async (page: number) => {
    const movies = await this.get<PaginationResponse<Movie>>(
      '/movie/top_rated',
      {
        page,
      },
    );

    return filterViewablePageResults(movies);
  };

  getMovieDetails = async (movieId: ID): Promise<MovieDetails> => {
    const movie = await this.getMovie<MovieDetails>(movieId, {
      appendToResponse: ['images,videos,credits'],
    });

    movie.credits.cast = filterViewablePeople(movie.credits.cast);
    movie.credits.crew = filterViewablePeople(movie.credits.crew);

    return movie;
  };

  getMovieRecommendations = async (movieId: ID, params: { page: number }) => {
    // To be sure movie is viewable, we fetch it too
    const movie = await this.getMovie<
      Movie & { recommendations: PaginationResponse<Movie> }
    >(movieId, {
      appendToResponse: ['recommendations'],
      params,
    });

    return filterViewablePageResults(movie.recommendations);
  };
}

export const moviesService = new MoviesService();
