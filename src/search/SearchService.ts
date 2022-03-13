import { PaginationResponse } from '@/common/CommonTypes';
import { Movie } from '@/movies/MoviesTypes';
import { Person } from '@/people/PeopleTypes';
import { filterViewablePageResults } from '@/view-filters/ViewFiltersUtils';
import { BaseService } from '../api/BaseService';

type SearchInput = { searchQuery?: string; page?: number };

class SearchService extends BaseService {
  searchMulti = async ({ searchQuery, page }: SearchInput) => {
    const results = await this.get<PaginationResponse<Movie | Person>>(
      `/search/multi`,
      { query: searchQuery, page },
    );
    return filterViewablePageResults(results);
  };

  searchMovies = async ({ searchQuery, page }: SearchInput) => {
    const results = await this.get<PaginationResponse<Movie>>(`/search/movie`, {
      query: searchQuery,
      page,
    });
    return filterViewablePageResults(results);
  };

  searchPeople = async ({ searchQuery, page }: SearchInput) => {
    const results = await this.get<PaginationResponse<Person>>(
      `/search/person`,
      { query: searchQuery, page },
    );
    return filterViewablePageResults(results);
  };
}

export const searchService = new SearchService();
