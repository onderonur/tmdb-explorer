import React from 'react';
import MovieCard from '@/movies/MovieCard';
import InfiniteGridList from '@/common/InfiniteGridList';
import BaseSeo from '@/seo/BaseSeo';
import { PaginationResponse } from '@/common/CommonTypes';
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import { getAllPageResults, idExtractor } from '@/common/CommonUtils';
import PageTitle from '@/common/PageTitle';
import { Movie } from '@/movies/MovieTypes';

function renderItem(movie: Movie) {
  return (
    <li>
      <MovieCard movie={movie} />
    </li>
  );
}

interface MoviesListingViewProps {
  title: string;
  titleExtra?: React.ReactNode;
  description: string;
  apiQuery: UseInfiniteQueryOptions<PaginationResponse<Movie>>;
}

function MoviesListingView({
  title,
  titleExtra,
  description,
  apiQuery,
}: MoviesListingViewProps) {
  const { data, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteQuery<PaginationResponse<Movie>>(apiQuery);

  return (
    <>
      <BaseSeo title={title} description={description} />
      <PageTitle title={title} extra={titleExtra} />
      <InfiniteGridList
        items={getAllPageResults(data)}
        keyExtractor={idExtractor}
        loading={isFetching}
        hasNextPage={!!hasNextPage}
        onLoadMore={fetchNextPage}
        renderItem={renderItem}
      />
    </>
  );
}

export default MoviesListingView;
