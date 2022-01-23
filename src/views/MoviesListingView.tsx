import React from 'react';
import MovieCard from '@/movies-listing/MovieCard';
import InfiniteGridList from '@/common/InfiniteGridList';
import BaseSeo from '@/seo/BaseSeo';
import { Movie, InfiniteFetchResponse } from '@/common/CommonTypes';
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import { getAllPageResults } from '@/common/CommonUtils';
import PageTitle from '@/common/PageTitle';

function renderItem(movie: Movie) {
  return (
    <li>
      <MovieCard movie={movie} />
    </li>
  );
}

interface MoviesListingViewProps {
  title: string;
  description: string;
  apiQuery: UseInfiniteQueryOptions<InfiniteFetchResponse<Movie>>;
}

function MoviesListingView({
  title,
  description,
  apiQuery,
}: MoviesListingViewProps) {
  const { data, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteQuery<InfiniteFetchResponse<Movie>>(apiQuery);

  return (
    <>
      <BaseSeo title={title} description={description} />
      <PageTitle title={title} />
      <InfiniteGridList
        items={getAllPageResults(data)}
        loading={isFetching}
        hasNextPage={!!hasNextPage}
        onLoadMore={fetchNextPage}
        renderItem={renderItem}
      />
    </>
  );
}

export default MoviesListingView;
