import { PaginationResponse } from '@/common/CommonTypes';
import { MovieListItem } from '@/movies/movie-types';
import { Person } from '@/people/PeopleTypes';
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
  const results = await tmdbClient.get<PaginationResponse<Person>>(
    `/search/person`,
    {
      query,
      page,
    },
  );

  return filterViewablePageResults(results);
});
