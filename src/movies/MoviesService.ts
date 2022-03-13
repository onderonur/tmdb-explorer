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

class MoviesService extends BaseService {
  getMovie = async (movieId: ID) => {
    const movie = await this.get<Movie>(`/movie/${movieId}`);
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
    args: { genreId?: ID; sortBy?: string },
  ) => {
    const genreId = Number(args.genreId);
    const movies = await this.get<PaginationResponse<Movie>>(
      '/discover/movie',
      {
        with_genres: genreId ? [genreId] : [],
        sort_by: args.sortBy,
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
    const movie = await this.getMovie(movieId);

    const [movieImages, movieVideos, movieCast] = await Promise.all([
      this.get<MovieDetails['movieImages']>(`/movie/${movieId}/images`),
      this.get<MovieDetails['movieVideos']>(`/movie/${movieId}/videos`),
      this.get<MovieDetails['movieCast']>(`/movie/${movieId}/credits`),
    ]);

    movieCast.cast = filterViewablePeople(movieCast.cast);

    return { movie, movieVideos, movieImages, movieCast };
  };

  getMovieRecommendations = async (movieId: ID, args: { page: number }) => {
    // To be sure movie is viewable, we fetch it first
    const movie = await this.getMovie(movieId);

    const movieRecommendations = await this.get<PaginationResponse<Movie>>(
      `/movie/${movie.id}/recommendations`,
      { page: args.page },
    );

    return filterViewablePageResults(movieRecommendations);
  };
}

export const moviesService = new MoviesService();
