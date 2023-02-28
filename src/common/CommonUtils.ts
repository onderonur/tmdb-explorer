import { PaginationResponse, ItemWithId, Maybe } from '@/common/CommonTypes';
import { InfiniteData } from '@tanstack/react-query';
import _ from 'lodash';
import { CustomError } from '@/error-handling/CustomError';

export const IS_SERVER = typeof window === 'undefined';

export function getNextPageParam(pageData: PaginationResponse<unknown>) {
  return pageData.total_pages > pageData.page ? pageData.page + 1 : undefined;
}

export function getAllPageResults<T extends ItemWithId>(
  allPages: Maybe<InfiniteData<PaginationResponse<T>>>,
): T[] {
  return _.uniqBy(
    allPages?.pages.flatMap((page) => page.results) ?? [],
    (item) => item.id,
  );
}

export const FIRST_PAGE = 1;

export function isOfType<T extends object>(
  obj: object,
  keys: Array<keyof T>,
): obj is T {
  return keys.every((key) => Object.prototype.hasOwnProperty.call(obj, key));
}

export function validateId(val: unknown) {
  const id = Number(val);
  if (!id) {
    throw new CustomError(422, 'Bad Request');
  }
  return id;
}
