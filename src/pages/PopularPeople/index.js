import React from 'react';
import PersonCard from '@/components/PersonCard';
import InfiniteGridList from '@/components/InfiniteGridList';
import useFetchInfinite from '@/hooks/useFetchInfinite';
import { api, createUrl } from '@utils';
import BaseSeo from '@components/BaseSeo';

function renderItem(person) {
  return (
    <li>
      <PersonCard person={person} />
    </li>
  );
}

function PopularPeople({ initialData }) {
  const {
    data,
    hasNextPage,
    isLoading,
    loadMore,
  } = useFetchInfinite('/person/popular', undefined, { initialData });

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

export async function getServerSideProps() {
  const data = await api.get(createUrl('/person/popular'));
  return {
    props: {
      initialData: [data],
    },
  };
}

export default PopularPeople;
