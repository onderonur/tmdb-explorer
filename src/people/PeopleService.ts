import { ID, PaginationResponse } from '@/common/CommonTypes';
import { CustomError } from '@/error-handling/CustomError';
import { Person, PersonDetails } from '@/people/PeopleTypes';
import { tmdbClient } from '@/tmdb-client/tmdbClient';
import {
  filterViewablePageResults,
  filterViewableMovies,
  shouldViewPerson,
} from '@/view-filters/ViewFiltersUtils';

const getPopularPeople = async (page: number) => {
  const people = await tmdbClient.get<PaginationResponse<Person>>(
    '/person/popular',
    {
      page,
    },
  );

  return filterViewablePageResults(people);
};

const getPersonDetails = async (personId: ID): Promise<PersonDetails> => {
  const person = await tmdbClient.get<PersonDetails>(`/person/${personId}`, {
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

export const peopleService = {
  getPopularPeople,
  getPersonDetails,
};
