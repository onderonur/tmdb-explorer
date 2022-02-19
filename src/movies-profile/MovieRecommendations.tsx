import React from 'react';
import MovieCard from '@/movies/MovieCard';
import { ID } from '@/common/CommonTypes';
import { useInfiniteQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';
import InfiniteGridList from '@/common/InfiniteGridList';
import { getAllPageResults, idExtractor } from '@/common/CommonUtils';
import { Movie } from '@/movies/MovieTypes';

function renderItem(recommendation: Movie) {
  return (
    <li>
      <MovieCard movie={recommendation} />
    </li>
  );
}

interface RecommendationsProps {
  movieId: ID;
}

function Recommendations({ movieId }: RecommendationsProps) {
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
    apiQueries.movies.movieRecommendations(movieId),
  );
  return (
    <InfiniteGridList
      items={getAllPageResults(data)}
      keyExtractor={idExtractor}
      loading={isFetching}
      hasNextPage={!!hasNextPage}
      onLoadMore={fetchNextPage}
      renderItem={renderItem}
      listEmptyMessage="No recommendation has been found."
    />
  );
}

export default Recommendations;
