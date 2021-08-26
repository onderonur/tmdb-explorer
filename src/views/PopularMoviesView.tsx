import React from 'react';
import MovieCard from '@/movies-listing/MovieCard';
import InfiniteGridList from '@/common/InfiniteGridList';
import useFetchInfinite from '@/common/useFetchInfinite';
import { api, createUrl } from '@/common/CommonUtils';
import BaseSeo from '@/seo/BaseSeo';
import { Movie, InfiniteFetchResponse } from '@/common/CommonTypes';
import { GetServerSideProps } from 'next';
import withError, {
  withGetServerSideError,
  ServerSideProps,
} from '@/errors/withError';

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

const getServerSidePropsFn: GetServerSideProps<PopularMoviesViewProps> =
  async () => {
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
