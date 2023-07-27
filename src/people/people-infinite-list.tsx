'use client';

import InfiniteGridList from '@/common/InfiniteGridList';
import { PaginationResponse } from '@/common/common-types';
import useSWRInfinite from 'swr/infinite';
import { getAllPageResults, getHasNextPage } from '@/common/common-utils';
import { PersonListItem } from './people-types';
import PersonCard from './person-card';

type PeopleInfiniteListProps = {
  firstPage: PaginationResponse<PersonListItem>;
  pageKeyTemplate: string;
};

// TODO: People -> Person yapılabilir belki.

export default function PeopleInfiniteGridList({
  firstPage,
  pageKeyTemplate,
}: PeopleInfiniteListProps) {
  const { data, setSize, isValidating } = useSWRInfinite<
    PaginationResponse<PersonListItem>
  >(
    (pageIndex: number) =>
      // TODO: Bu function ortak bi yere konulabilir.
      decodeURIComponent(pageKeyTemplate).replace(
        '%pageIndex%',
        (pageIndex + 1).toString(),
      ),
    {
      // TODO: İlk sayfayı client'ta yine çekiyor. Bunu kapatmanın yolu var mı bak.
      fallbackData: [firstPage],
      // To stop fetching the first page too, when the next page is loading.
      revalidateFirstPage: false,
    },
  );

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
