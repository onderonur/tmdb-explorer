import React from 'react';
import MovieCard from '@/components/MovieCard';
import InfiniteGridList from '@/components/InfiniteGridList';
import useFetchInfinite from '@/hooks/useFetchInfinite';
import { api, createUrl } from '@/utils';
import BaseSeo from '@/components/BaseSeo';
import { Movie, InfiniteFetchResponse } from '@/types';
import { GetServerSideProps } from 'next';

function renderItem(movie: Movie) {
  return (
    <li>
      <MovieCard movie={movie} />
    </li>
  );
}

interface PopularMoviesProps {
  initialData: InfiniteFetchResponse<Movie>[];
}

function PopularMovies({ initialData }: PopularMoviesProps) {
  const { data, hasNextPage, isLoading, loadMore } = useFetchInfinite<Movie>(
    '/movie/popular',
    undefined,
    { initialData },
  );

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

export const getServerSideProps: GetServerSideProps<PopularMoviesProps> = async () => {
  const data = await api.get<InfiniteFetchResponse<Movie>>(
    createUrl('/movie/popular'),
  );
  return {
    props: {
      initialData: [data],
    },
  };
};

export default PopularMovies;
