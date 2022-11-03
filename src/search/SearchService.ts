import { PaginationResponse } from '@/common/CommonTypes';
import { Movie } from '@/movies/MoviesTypes';
import { Person } from '@/people/PeopleTypes';
import { tmdbClient } from '@/tmdb-client/tmdbClient';
import { filterViewablePageResults } from '@/view-filters/ViewFiltersUtils';

type SearchInput = { searchQuery?: string; page?: number };

const searchMulti = async ({ searchQuery, page }: SearchInput) => {
  const results = await tmdbClient.get<PaginationResponse<Movie | Person>>(
    `/search/multi`,
    { query: searchQuery, page },
  );
  return filterViewablePageResults(results);
};

const searchMovies = async ({ searchQuery, page }: SearchInput) => {
  const results = await tmdbClient.get<PaginationResponse<Movie>>(
    `/search/movie`,
    {
      query: searchQuery,
      page,
    },
  );
  return filterViewablePageResults(results);
};

const searchPeople = async ({ searchQuery, page }: SearchInput) => {
  const results = await tmdbClient.get<PaginationResponse<Person>>(
    `/search/person`,
    {
      query: searchQuery,
      page,
    },
  );
  return filterViewablePageResults(results);
};

export const searchService = {
  searchMulti,
  searchMovies,
  searchPeople,
};
