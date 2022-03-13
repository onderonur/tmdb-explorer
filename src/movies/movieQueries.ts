import { MovieDetails, Genre, Movie } from '@/movies/MoviesTypes';
import { ID, PaginationResponse } from '@/common/CommonTypes';
import { FIRST_PAGE, getNextPageParam, IS_SERVER } from '@/common/CommonUtils';
import { moviesService } from '@/movies/MoviesService';
import { httpClient } from '@/http-client/httpClient';

export const movieQueries = {
  movieDetails: (movieId: ID) => ({
    queryKey: ['movies', movieId],
    queryFn: () =>
      IS_SERVER
        ? moviesService.getMovieDetails(movieId)
        : httpClient.get<MovieDetails>(`/api/movies/${movieId}`),
  }),
  movieRecommendations: (movieId: ID) => ({
    queryKey: ['movies', movieId, 'recommendations'],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? moviesService.getMovieRecommendations(movieId, { page: pageParam })
        : httpClient.get<PaginationResponse<Movie>>(
            `/api/movies/${movieId}/recommendations`,
            {
              page: pageParam,
            },
          ),
    getNextPageParam,
  }),
  discoverMovies: (args: { genreId?: ID; sortBy: string }) => ({
    queryKey: ['discover', 'movies', args],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? moviesService.getDiscoverMovies(pageParam, args)
        : httpClient.get<PaginationResponse<Movie>>(`/api/movies/discover`, {
            ...args,
            page: pageParam,
          }),
    getNextPageParam,
  }),
  popularMovies: () => ({
    queryKey: ['movies', 'popular'],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? moviesService.getPopularMovies(pageParam)
        : httpClient.get<PaginationResponse<Movie>>('/api/movies/popular', {
            page: pageParam,
          }),
    getNextPageParam,
  }),
  topRatedMovies: () => ({
    queryKey: ['movies', 'topRated'],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? moviesService.getTopRatedMovies(pageParam)
        : httpClient.get<PaginationResponse<Movie>>('/api/movies/top-rated', {
            page: pageParam,
          }),
    getNextPageParam,
  }),
  genres: () => ({
    queryKey: ['movies', 'genres'],
    queryFn: () =>
      IS_SERVER
        ? moviesService.getMovieGenres()
        : httpClient.get<Genre[]>('/api/movies/genres'),
  }),
};
