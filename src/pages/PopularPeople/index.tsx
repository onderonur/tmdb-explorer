import React from 'react';
import PersonCard from '@/components/PersonCard';
import InfiniteGridList from '@/components/InfiniteGridList';
import useFetchInfinite from '@/hooks/useFetchInfinite';
import { api, createUrl } from '@/utils';
import BaseSeo from '@/components/BaseSeo';
import { Person, InfiniteFetchResponse } from '@/types';
import { GetServerSideProps } from 'next';

function renderItem(person: Person) {
  return (
    <li>
      <PersonCard person={person} />
    </li>
  );
}

interface PopularPeopleProps {
  initialData: InfiniteFetchResponse<Person>[];
}

const PopularPeople = ({ initialData }: PopularPeopleProps) => {
  const { data, hasNextPage, isLoading, loadMore } = useFetchInfinite<Person>(
    '/person/popular',
    undefined,
    { initialData },
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
};

export const getServerSideProps: GetServerSideProps<PopularPeopleProps> = async () => {
  const data = await api.get<InfiniteFetchResponse<Person>>(
    createUrl('/person/popular'),
  );
  return {
    props: {
      initialData: [data],
    },
  };
};

export default PopularPeople;
