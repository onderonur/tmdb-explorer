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

  getPerson = async (personId: ID) => {
    const person = await this.get<Person>(`/person/${personId}`);

    if (!shouldViewPerson(person)) {
      throw new CustomError(
        404,
        'The resource you requested could not be found.',
      );
    }

    return person;
  };

  getPersonDetails = async (personId: ID): Promise<PersonDetails> => {
    const person = await this.getPerson(personId);

    const [personImages, personCredits] = await Promise.all([
      this.get<PersonDetails['personImages']>(`/person/${personId}/images`),
      this.get<PersonDetails['personCredits']>(
        `/person/${personId}/movie_credits`,
      ),
    ]);

    personCredits.cast = filterViewableMovies(personCredits.cast);
    personCredits.crew = filterViewableMovies(personCredits.crew);

    return { person, personImages, personCredits };
  };
}

export const peopleService = new PeopleService();
