import type { Id, PaginationResponse } from '@/core/shared/shared.types';
import type { ImageInfo } from '@/features/media/media.types';
import type {
  PersonCasting,
  PersonCrew,
  PersonDetails,
  PersonListItem,
} from '@/features/people/people.types';
import {
  filterPermittedMovies,
  filterPermittedPageResults,
  isPersonPermitted,
} from '@/features/permitted-contents/permitted-contents.utils';
import { tmdbClient } from '@/features/tmdb/tmdb.utils';
import { cache } from 'react';
import 'server-only';

export const getPopularPeople = cache(async (page: number) => {
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());

  const people = await tmdbClient.get<PaginationResponse<PersonListItem>>(
    '/person/popular',
    searchParams,
  );

  return filterPermittedPageResults(people);
});

export const getPerson = cache(async (personId: Id) => {
  const searchParams = new URLSearchParams();

  const person = await tmdbClient.get<PersonDetails>(
    `/person/${personId}`,
    searchParams,
  );

  if (!isPersonPermitted(person)) return null;

  return person;
});

export const getPersonImages = cache(async (personId: Id) => {
  const images = await tmdbClient.get<{ profiles: ImageInfo[] }>(
    `/person/${personId}/images`,
  );

  return images.profiles;
});

export const getPersonCredits = cache(async (personId: Id) => {
  const credits = await tmdbClient.get<{
    cast: PersonCasting[];
    crew: PersonCrew[];
  }>(`/person/${personId}/credits`);

  credits.cast = filterPermittedMovies(credits.cast);
  credits.crew = filterPermittedMovies(credits.crew);

  return credits;
});
