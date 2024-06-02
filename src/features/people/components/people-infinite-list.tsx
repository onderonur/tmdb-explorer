'use client';

import type { PaginationResponse } from '@/core/shared/shared.types';
import { getAllPageResults, getHasNextPage } from '@/core/shared/shared.utils';
import {
  InfiniteGridList,
  getInfiniteSwrKey,
} from '@/core/ui/components/infinite-grid-list';
import type { PersonListItem } from '@/features/people/people.types';
import useSWRInfinite from 'swr/infinite';
import { PersonCard } from './person-card';

type PeopleInfiniteListProps = {
  firstPage: PaginationResponse<PersonListItem>;
  pageKeyTemplate: string;
};

export function PeopleInfiniteGridList({
  firstPage,
  pageKeyTemplate,
}: PeopleInfiniteListProps) {
  const { data, setSize, isValidating } = useSWRInfinite<
    PaginationResponse<PersonListItem>
  >((pageIndex: number) => getInfiniteSwrKey({ pageIndex, pageKeyTemplate }), {
    fallbackData: [firstPage],
    // To stop fetching the first page too, when the next page is loading.
    revalidateFirstPage: false,
  });

  const hasNextPage = getHasNextPage(data);

  return (
    <InfiniteGridList
      loading={isValidating}
      hasNextPage={hasNextPage}
      onLoadMore={() => setSize((currentSize) => currentSize + 1)}
    >
      {getAllPageResults(data).map((person) => {
        return (
          <li key={person.id}>
            <PersonCard person={person} />
          </li>
        );
      })}
    </InfiniteGridList>
  );
}
