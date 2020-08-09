import React from 'react';
import MovieCard from '@/components/MovieCard';
import InfiniteGridList from '@/components/InfiniteGridList';
import useFetchInfinite from '@/hooks/useFetchInfinite';
import { api, createUrl } from '@utils';
import BaseSeo from '@components/BaseSeo';

function renderItem(movie) {
  return (
    <li>
      <MovieCard movie={movie} />
    </li>
  );
}

function PopularMovies({ initialData }) {
  const {
    data,
    hasNextPage,
    isLoading,
    loadMore,
  } = useFetchInfinite('/movie/popular', undefined, { initialData });

  return (
    <>
      <BaseSeo title="Popular Movies" description="Popular movies list" />
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
  const data = await api.get(createUrl('/movie/popular'));
  return {
    props: {
      initialData: [data],
    },
  };
}

export default PopularMovies;
