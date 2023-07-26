import { PaginationResponse, ItemWithId, Maybe } from '@/common/CommonTypes';
import _ from 'lodash';

export function getAllPageResults<T extends ItemWithId>(
  allPages: Maybe<PaginationResponse<T>[]>,
): T[] {
  if (!allPages) {
    return [];
  }

  return _.uniqBy(
    allPages.flatMap((page) => page.results) ?? [],
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

export const FIRST_PAGE = 1;

export function isOfType<T extends object>(
  obj: object,
  keys: Array<keyof T>,
): obj is T {
  return keys.every((key) => Object.prototype.hasOwnProperty.call(obj, key));
}
