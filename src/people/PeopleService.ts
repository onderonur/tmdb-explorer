import { ID, PaginationResponse } from '@/common/CommonTypes';
import { CustomError } from '@/error-handling/CustomError';
import { Person, PersonDetails } from '@/people/PeopleTypes';
import {
  filterViewablePageResults,
  filterViewableMovies,
  shouldViewPerson,
} from '@/view-filters/ViewFiltersUtils';
import { BaseService } from '../api/BaseService';

class PeopleService extends BaseService {
  getPopularPeople = async (page: number) => {
    const people = await this.get<PaginationResponse<Person>>(
      '/person/popular',
      {
        page,
      },
    );

    return filterViewablePageResults(people);
  };

  getPersonDetails = async (personId: ID): Promise<PersonDetails> => {
    const person = await this.get<PersonDetails>(`/person/${personId}`, {
      append_to_response: 'images,credits',
    });

    if (!shouldViewPerson(person)) {
      throw new CustomError(
        404,
        'The resource you requested could not be found.',
      );
    }

    person.credits.cast = filterViewableMovies(person.credits.cast);
    person.credits.crew = filterViewableMovies(person.credits.crew);

    return person;
  };
}

export const peopleService = new PeopleService();
