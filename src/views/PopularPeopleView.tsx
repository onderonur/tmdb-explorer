import React from 'react';
import PersonCard from '@/modules/people-listing/PersonCard';
import InfiniteGridList from '@/modules/shared/InfiniteGridList';
import useFetchInfinite from '@/modules/shared/useFetchInfinite';
import { api, createUrl } from '@/modules/shared/SharedUtils';
import BaseSeo from '@/modules/seo/BaseSeo';
import { Person, InfiniteFetchResponse } from '@/modules/shared/SharedTypes';
import { GetServerSideProps } from 'next';
import withError, {
  ServerSideProps,
  withGetServerSideError,
} from '@/modules/errors/withError';

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

const getServerSidePropsFn: GetServerSideProps<PopularPeopleViewProps> = async () => {
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
