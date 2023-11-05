import type { Id, PaginationResponse } from '@/common/common-types';
import { tmdbClient } from '@/tmdb/tmdb-client';
import { cache } from 'react';
import type { PersonListItem, PersonDetails } from './people-types';
import {
  filterViewableMovies,
  filterViewablePageResults,
  shouldViewPerson,
} from '@/view-filters/view-filter-utils';

export const getPopularPeople = cache(async (page: number) => {
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());

  const people = await tmdbClient.get<PaginationResponse<PersonListItem>>(
    '/person/popular',
    searchParams,
  );

  return filterViewablePageResults(people);
});

export const getPersonDetails = cache(async (personId: Id) => {
  const searchParams = new URLSearchParams();
  searchParams.set('append_to_response', 'images,credits');

  const person = await tmdbClient.get<PersonDetails>(
    `/person/${personId}`,
    searchParams,
  );

  if (!shouldViewPerson(person)) {
    return null;
  }

  person.credits.cast = filterViewableMovies(person.credits.cast);
  person.credits.crew = filterViewableMovies(person.credits.crew);

  return person;
});
