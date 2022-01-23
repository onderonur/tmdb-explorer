import {
  ID,
  InfiniteFetchResponse,
  Maybe,
  Movie,
  Person,
} from '@/common/CommonTypes';
import { InfiniteData } from 'react-query';
import _ from 'lodash';

export const IS_SERVER = typeof window === 'undefined';

export function getMovieReleaseYear(movie: Movie) {
  const date = movie?.release_date;

  if (!date) {
    return null;
  }

  const year = new Date(movie.release_date).getFullYear();
  return year;
}

export function getLastOfArray<T>(arr: T[]): Maybe<T> {
  const { length, [length - 1]: last } = arr;
  return last;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const idExtractor = (item: any) => item.id;

export function isOfType<T>(value: unknown, keys: (keyof T)[]): value is T {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const valueKeys = Object.keys(value);
  return keys.every((key) => valueKeys.includes(key as string));
}

export function isMovie(value: unknown): value is Movie {
  return isOfType<Movie>(value, ['title']);
}

export function isPerson(value: unknown): value is Person {
  return isOfType<Person>(value, ['name']);
}

export function getNextPageParam(pageData: InfiniteFetchResponse<unknown>) {
  return pageData.total_pages > pageData.page ? pageData.page + 1 : undefined;
}

export function getAllPageResults<T extends { id: ID }>(
  allPages: Maybe<InfiniteData<InfiniteFetchResponse<T>>>,
): T[] {
  return _.uniqBy(
    allPages?.pages.flatMap((page) => page.results) ?? [],
    (item) => item.id,
  );
}

export const FIRST_PAGE = 1;
