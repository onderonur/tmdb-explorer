import { Movie } from '@/movies/MoviesTypes';
import { PaginationResponse } from '@/common/CommonTypes';
import { FIRST_PAGE, getNextPageParam, IS_SERVER } from '@/common/CommonUtils';
import { Person } from '@/people/PeopleTypes';
import { searchService } from '@/search/SearchService';
import { httpClient } from '@/http-client/httpClient';

export const searchAPI = {
  searchMulti: (searchQuery: string) => ({
    queryKey: ['searchMulti', searchQuery],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? searchService.searchMulti({ searchQuery, page: pageParam })
        : httpClient.get<PaginationResponse<Movie | Person>>(
            `/api/search/multi`,
            {
              searchQuery,
              page: pageParam,
            },
          ),
    getNextPageParam,
  }),
  searchMovies: (searchQuery: string) => ({
    queryKey: ['searchMovies', searchQuery],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? searchService.searchMovies({ searchQuery, page: pageParam })
        : httpClient.get<PaginationResponse<Movie>>(`/api/search/movies`, {
            searchQuery,
            page: pageParam,
          }),
    getNextPageParam,
  }),
  searchPeople: (searchQuery: string) => ({
    queryKey: ['searchPeople', searchQuery],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? searchService.searchPeople({ searchQuery, page: pageParam })
        : httpClient.get<PaginationResponse<Person>>(`/api/search/people`, {
            searchQuery,
            page: pageParam,
          }),
    getNextPageParam,
  }),
};
