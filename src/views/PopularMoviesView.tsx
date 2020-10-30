import React from 'react';
import MovieCard from '@/modules/movies-listing/MovieCard';
import InfiniteGridList from '@/modules/shared/InfiniteGridList';
import useFetchInfinite from '@/modules/shared/useFetchInfinite';
import { api, createUrl } from '@/modules/shared/SharedUtils';
import BaseSeo from '@/modules/seo/BaseSeo';
import { Movie, InfiniteFetchResponse } from '@/modules/shared/SharedTypes';
import { GetServerSideProps } from 'next';
import withError, {
  withGetServerSideError,
  ServerSideProps,
} from '@/modules/errors/withError';

function renderItem(movie: Movie) {
  return (
    <li>
      <MovieCard movie={movie} />
    </li>
  );
}

type PopularMoviesViewProps = ServerSideProps<InfiniteFetchResponse<Movie>[]>;

function PopularMoviesView({ initialData }: PopularMoviesViewProps) {
  const { data, hasNextPage, isLoading, loadMore } = useFetchInfinite<Movie>(
    '/movie/popular',
    undefined,
    { initialData: initialData || undefined },
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

const getServerSidePropsFn: GetServerSideProps<PopularMoviesViewProps> = async () => {
  const data = await api.get<InfiniteFetchResponse<Movie>>(
    createUrl('/movie/popular'),
  );
  return {
    props: {
      initialData: [data],
    },
  };
};

export const getServerSideProps = withGetServerSideError(getServerSidePropsFn);

export default withError(PopularMoviesView);
