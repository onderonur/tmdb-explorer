import { PaginationResponse } from '@/common/common-types';
import { MovieListItem } from '@/movies/movie-types';
import { PersonListItem } from '@/people/people-types';
import { tmdbClient } from '@/tmdb/tmdb-client';
import { filterViewablePageResults } from '@/view-filters/view-filter-utils';
import { cache } from 'react';

type SearchInput = { query: string; page?: number };

export const searchMovies = cache(async ({ query, page }: SearchInput) => {
  const results = await tmdbClient.get<PaginationResponse<MovieListItem>>(
    `/search/movie`,
    {
      query,
      page,
    },
  );

  return filterViewablePageResults(results);
});

export const searchPeople = cache(async ({ query, page }: SearchInput) => {
  const results = await tmdbClient.get<PaginationResponse<PersonListItem>>(
    `/search/person`,
    {
      query,
      page,
    },
  );

  return filterViewablePageResults(results);
});

export const searchMulti = cache(async ({ query, page }: SearchInput) => {
  const results = await tmdbClient.get<
    // TODO: Biri ListItem. Biri normal. Name fix.
    PaginationResponse<MovieListItem | PersonListItem>
  >(`/search/multi`, {
    query,
    page,
  });

  return filterViewablePageResults(results);
});
