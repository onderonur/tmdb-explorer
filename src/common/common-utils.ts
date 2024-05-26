import type { Maybe, PaginationResponse } from '@/common/common-types';
import _ from 'lodash';

export function getAllPageResults<T extends { id: number | string }>(
  allPages: Maybe<PaginationResponse<T>[]>,
): T[] {
  if (!allPages) {
    return [];
  }

  return _.uniqBy(
    allPages.flatMap((page) => page.results),
    (item) => item.id,
  );
}

export function getHasNextPage<T>(allPages: Maybe<PaginationResponse<T>[]>) {
  const lastPage = allPages?.[allPages.length - 1];

  if (!lastPage) {
    return false;
  }

  return lastPage.page < lastPage.total_pages;
}

export function isOfType<T>(obj: unknown, keys: Array<keyof T>): obj is T {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  return keys.every((key) => Object.prototype.hasOwnProperty.call(obj, key));
}

export const createMockArray = (length: number) => {
  const mockArray = [];

  for (let i = 0; i < length; i++) {
    mockArray.push(i);
  }

  return mockArray;
};
