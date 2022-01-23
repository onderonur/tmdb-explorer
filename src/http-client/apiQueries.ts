import { APIConfiguration } from '@/api-configuration/ApiConfigurationTypes';
import {
  Genre,
  ID,
  InfiniteFetchResponse,
  Maybe,
  Movie,
  MovieImage,
  Person,
  PersonImage,
} from '@/common/CommonTypes';
import { FIRST_PAGE, getNextPageParam } from '@/common/CommonUtils';
import { MovieVideo } from '@/media-gallery/MediaGalleryTypes';
import { MovieCast } from '@/movies-profile/MovieProfileTypes';
import { PersonCredits } from '@/people-profile/PersonProfileTypes';
import { httpClient } from './httpClient';
import { createUrl } from './HttpClientUtils';

export const apiQueries = {
  common: {
    configuration: () => ({
      queryKey: 'configuration',
      queryFn: () =>
        httpClient.get<APIConfiguration>(createUrl('/configuration')),
    }),
  },
  movies: {
    movie: (movieId: ID) => ({
      queryKey: ['movies', movieId],
      queryFn: () => httpClient.get<Movie>(createUrl(`/movie/${movieId}`)),
    }),
    movieVideos: (movieId: ID) => ({
      queryKey: ['movies', movieId, 'videos'],
      queryFn: () =>
        httpClient.get<InfiniteFetchResponse<MovieVideo>>(
          createUrl(`/movie/${movieId}/videos`),
        ),
    }),
    movieImages: (movieId: ID) => ({
      queryKey: ['movies', movieId, 'images'],
      queryFn: () =>
        httpClient.get<{ backdrops: MovieImage[] }>(
          createUrl(`/movie/${movieId}/images`),
        ),
    }),
    movieCast: (movieId: ID) => ({
      queryKey: ['movies', movieId, 'credits'],
      queryFn: () =>
        httpClient.get<{ cast: MovieCast[] }>(
          createUrl(`/movie/${movieId}/credits`),
        ),
    }),
    movieRecommendations: (movieId: ID) => ({
      queryKey: ['movies', movieId, 'recommendations'],
      queryFn: ({ pageParam = FIRST_PAGE }) =>
        httpClient.get<InfiniteFetchResponse<Movie>>(
          createUrl(`/movie/${movieId}/recommendations`, { page: pageParam }),
        ),
      getNextPageParam,
    }),
    popularMovies: () => ({
      queryKey: ['movies', 'popular'],
      queryFn: ({ pageParam = FIRST_PAGE }) =>
        httpClient.get<InfiniteFetchResponse<Movie>>(
          createUrl('/movie/popular', { page: pageParam }),
        ),
      getNextPageParam,
    }),
    topRatedMovies: () => ({
      queryKey: ['movies', 'topRated'],
      queryFn: ({ pageParam = FIRST_PAGE }) =>
        httpClient.get<InfiniteFetchResponse<Movie>>(
          createUrl('/movie/top_rated', { page: pageParam }),
        ),
      getNextPageParam,
    }),
    upcomingMovies: () => ({
      queryKey: ['movies', 'upcoming'],
      queryFn: ({ pageParam = FIRST_PAGE }) =>
        httpClient.get<InfiniteFetchResponse<Movie>>(
          createUrl('/movie/upcoming', { page: pageParam, region: 'US' }),
        ),
      getNextPageParam,
    }),
  },
  people: {
    person: (personId: ID) => ({
      queryKey: ['people', personId],
      queryFn: () => httpClient.get<Person>(createUrl(`/person/${personId}`)),
    }),
    personImages: (personId: ID) => ({
      queryKey: ['people', personId, 'images'],
      queryFn: () =>
        httpClient.get<{ profiles: PersonImage[] }>(
          createUrl(`/person/${personId}/images`),
        ),
    }),
    personCredits: (personId: ID) => ({
      queryKey: ['people', personId, 'credits'],
      queryFn: () =>
        httpClient.get<PersonCredits>(
          createUrl(`/person/${personId}/movie_credits`),
        ),
    }),
    popularPeople: () => ({
      queryKey: ['people', 'popular'],
      queryFn: ({ pageParam = FIRST_PAGE }) =>
        httpClient.get<InfiniteFetchResponse<Person>>(
          createUrl('/person/popular', { page: pageParam }),
        ),
      getNextPageParam,
    }),
  },
  search: {
    searchMovies: (query: string) => ({
      queryKey: ['search', 'movies', query],
      queryFn: ({ pageParam = FIRST_PAGE }) =>
        httpClient.get<InfiniteFetchResponse<Movie>>(
          createUrl(`/search/movie`, { query, page: pageParam }),
        ),
      getNextPageParam,
    }),
    searchPeople: (query: string) => ({
      queryKey: ['search', 'people', query],
      queryFn: ({ pageParam = FIRST_PAGE }) =>
        httpClient.get<InfiniteFetchResponse<Person>>(
          createUrl(`/search/person`, { query, page: pageParam }),
        ),
      getNextPageParam,
    }),
  },
  genres: {
    movieGenres: () => ({
      queryKey: ['movieGenres'],
      queryFn: () =>
        httpClient.get<{ genres: Genre[] }>(createUrl('/genre/movie/list')),
    }),
  },
  discover: {
    discoverMovies: (args: { genreId: Maybe<ID> }) => ({
      queryKey: ['discover', 'movies', args],
      queryFn: ({ pageParam = FIRST_PAGE }) =>
        httpClient.get<InfiniteFetchResponse<Movie>>(
          createUrl(`/discover/movie`, {
            with_genres: args.genreId ? [args.genreId] : [],
            page: pageParam,
          }),
        ),
      getNextPageParam,
    }),
  },
};
