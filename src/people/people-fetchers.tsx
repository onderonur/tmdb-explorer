import { ID, PaginationResponse } from '@/common/CommonTypes';
import { tmdbClient } from '@/tmdb/tmdb-client';
import { cache } from 'react';
import { Person, PersonDetails } from './PeopleTypes';
import {
  filterViewableMovies,
  filterViewablePageResults,
  shouldViewPerson,
} from '@/view-filters/view-filter-utils';

export const getPopularPeople = cache(async (page: number) => {
  const people = await tmdbClient.get<PaginationResponse<Person>>(
    '/person/popular',
    {
      page,
    },
  );

  return filterViewablePageResults(people);
});

export const getPersonDetails = cache(async (personId: ID) => {
  const person = await tmdbClient.get<PersonDetails>(`/person/${personId}`, {
    append_to_response: 'images,credits',
  });

  if (!shouldViewPerson(person)) {
    return null;
  }

  person.credits.cast = filterViewableMovies(person.credits.cast);
  person.credits.crew = filterViewableMovies(person.credits.crew);

  return person;
});
