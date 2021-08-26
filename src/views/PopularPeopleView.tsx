import React from 'react';
import PersonCard from '@/people-listing/PersonCard';
import InfiniteGridList from '@/common/InfiniteGridList';
import useFetchInfinite from '@/common/useFetchInfinite';
import { api, createUrl } from '@/common/CommonUtils';
import BaseSeo from '@/seo/BaseSeo';
import { Person, InfiniteFetchResponse } from '@/common/CommonTypes';
import { GetServerSideProps } from 'next';
import withError, {
  ServerSideProps,
  withGetServerSideError,
} from '@/errors/withError';

function renderItem(person: Person) {
  return (
    <li>
      <PersonCard person={person} />
    </li>
  );
}

type PopularPeopleViewProps = ServerSideProps<InfiniteFetchResponse<Person>[]>;

function PopularPeopleView({ initialData }: PopularPeopleViewProps) {
  const { data, hasNextPage, isLoading, loadMore } = useFetchInfinite<Person>(
    '/person/popular',
    undefined,
    { initialData: initialData || undefined },
  );

  return (
    <>
      <BaseSeo title="Popular People" description="Popular people list" />
      <InfiniteGridList
        items={data}
        loading={isLoading}
        hasNextPage={hasNextPage}
        onLoadMore={loadMore}
        renderItem={renderItem}
      />
    </>
  );
}

const getServerSidePropsFn: GetServerSideProps<PopularPeopleViewProps> =
  async () => {
    const data = await api.get<InfiniteFetchResponse<Person>>(
      createUrl('/person/popular'),
    );
    return {
      props: {
        initialData: [data],
      },
    };
  };

export const getServerSideProps = withGetServerSideError(getServerSidePropsFn);

export default withError(PopularPeopleView);
