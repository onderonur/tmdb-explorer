'use client';

import InfiniteGridList, {
  getInfiniteSwrKey,
} from '@/common/infinite-grid-list';
import type { PaginationResponse } from '@/common/common-types';
import useSWRInfinite from 'swr/infinite';
import { getAllPageResults, getHasNextPage } from '@/common/common-utils';
import type { PersonListItem } from './people-types';
import PersonCard from './person-card';

type PeopleInfiniteListProps = {
  firstPage: PaginationResponse<PersonListItem>;
  pageKeyTemplate: string;
};

export default function PeopleInfiniteGridList({
  firstPage,
  pageKeyTemplate,
}: PeopleInfiniteListProps) {
  const { data, setSize, isValidating } = useSWRInfinite<
    PaginationResponse<PersonListItem>
  >((pageIndex: number) => getInfiniteSwrKey({ pageIndex, pageKeyTemplate }), {
    // TODO: İlk sayfayı client'ta yine çekiyor. Bunu kapatmanın yolu var mı bak.
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
