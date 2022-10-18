import { MovieDetails, Genre, Movie } from '@/movies/MoviesTypes';
import { ID, PaginationResponse } from '@/common/CommonTypes';
import { FIRST_PAGE, getNextPageParam, IS_SERVER } from '@/common/CommonUtils';
import { moviesService } from '@/movies/MoviesService';
import { httpClient } from '@/http-client/httpClient';

export const moviesAPI = {
  movieDetails: (movieId: ID) => ({
    queryKey: ['movieDetails', movieId],
    queryFn: () =>
      IS_SERVER
        ? moviesService.getMovieDetails(movieId)
        : httpClient.get<MovieDetails>(`/api/movies/${movieId}`),
  }),
  movieRecommendations: (movieId: ID) => ({
    queryKey: ['movieRecommendations', movieId],
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
    queryKey: ['discoverMovies', args],
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
    queryKey: ['popularMovies'],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? moviesService.getPopularMovies(pageParam)
        : httpClient.get<PaginationResponse<Movie>>('/api/movies/popular', {
            page: pageParam,
          }),
    getNextPageParam,
  }),
  topRatedMovies: () => ({
    queryKey: ['topRatedMovies'],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? moviesService.getTopRatedMovies(pageParam)
        : httpClient.get<PaginationResponse<Movie>>('/api/movies/top-rated', {
            page: pageParam,
          }),
    getNextPageParam,
  }),
  genres: () => ({
    queryKey: ['genres'],
    queryFn: () =>
      IS_SERVER
        ? moviesService.getMovieGenres()
        : httpClient.get<Genre[]>('/api/movies/genres'),
  }),
};
