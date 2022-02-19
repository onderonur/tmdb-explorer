import { PaginationResponse, ItemWithId, Maybe } from '@/common/CommonTypes';
import { InfiniteData } from 'react-query';
import _ from 'lodash';

export const IS_SERVER = typeof window === 'undefined';

export function getLastOfArray<T>(arr: T[]): Maybe<T> {
  const { length, [length - 1]: last } = arr;
  return last;
}

export function idExtractor<Item extends ItemWithId>(item: Item) {
  return item.id;
}

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
