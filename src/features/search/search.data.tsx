import type { PaginationResponse } from '@/core/shared/shared.types';
import type { MovieListItem } from '@/features/movies/movies.types';
import type { PersonListItem } from '@/features/people/people.types';
import { filterPermittedPageResults } from '@/features/permitted-contents/permitted-contents.utils';
import { tmdbClient } from '@/features/tmdb/tmdb.utils';
import { cache } from 'react';
import 'server-only';

export const searchMovies = cache(async (query: string, page: number) => {
  const searchParams = new URLSearchParams();
  searchParams.set('query', query);
  searchParams.set('page', page.toString());

  const results = await tmdbClient.get<PaginationResponse<MovieListItem>>(
    `/search/movie`,
    searchParams,
  );

  return filterPermittedPageResults(results);
});

export const searchPeople = cache(async (query: string, page: number) => {
  const searchParams = new URLSearchParams();
  searchParams.set('query', query);
  searchParams.set('page', page.toString());

  const results = await tmdbClient.get<PaginationResponse<PersonListItem>>(
    `/search/person`,
    searchParams,
  );

  return filterPermittedPageResults(results);
});

export const searchMulti = cache(async (query: string, page: number) => {
  const searchParams = new URLSearchParams();
  searchParams.set('query', query);
  searchParams.set('page', page.toString());

  const results = await tmdbClient.get<
    PaginationResponse<MovieListItem | PersonListItem>
  >(`/search/multi`, searchParams);

  return filterPermittedPageResults(results);
});
