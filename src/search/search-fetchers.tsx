import { PaginationResponse } from '@/common/common-types';
import { MovieListItem } from '@/movies/movie-types';
import { PersonListItem } from '@/people/people-types';
import { tmdbClient } from '@/tmdb/tmdb-client';
import { filterViewablePageResults } from '@/view-filters/view-filter-utils';
import { cache } from 'react';

type SearchInput = { query: string; page: number };

export const searchMovies = cache(async ({ query, page }: SearchInput) => {
  const searchParams = new URLSearchParams();
  searchParams.set('query', query);
  searchParams.set('page', page.toString());

  const results = await tmdbClient.get<PaginationResponse<MovieListItem>>(
    `/search/movie`,
    searchParams,
  );

  return filterViewablePageResults(results);
});

export const searchPeople = cache(async ({ query, page }: SearchInput) => {
  const searchParams = new URLSearchParams();
  searchParams.set('query', query);
  searchParams.set('page', page.toString());

  const results = await tmdbClient.get<PaginationResponse<PersonListItem>>(
    `/search/person`,
    searchParams,
  );

  return filterViewablePageResults(results);
});

export const searchMulti = cache(async ({ query, page }: SearchInput) => {
  const searchParams = new URLSearchParams();
  searchParams.set('query', query);
  searchParams.set('page', page.toString());

  const results = await tmdbClient.get<
    // TODO: Biri ListItem. Biri normal. Name fix.
    PaginationResponse<MovieListItem | PersonListItem>
  >(`/search/multi`, searchParams);

  return filterViewablePageResults(results);
});
