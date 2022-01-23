import React from 'react';
import MovieCard from '@/movies-listing/MovieCard';
import { useTheme } from '@mui/material';
import { Movie, ID } from '@/common/CommonTypes';
import { useInfiniteQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';
import InfiniteGridList from '@/common/InfiniteGridList';
import { getAllPageResults } from '@/common/CommonUtils';

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
  const theme = useTheme();
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
    apiQueries.movies.movieRecommendations(movieId),
  );
  return (
    <InfiniteGridList
      items={getAllPageResults(data)}
      loading={isFetching}
      hasNextPage={!!hasNextPage}
      onLoadMore={fetchNextPage}
      renderItem={renderItem}
      minItemWidth={260 / 2 - parseInt(theme.spacing(2))}
      listEmptyMessage="No recommendation has been found"
    />
  );
}

export default Recommendations;
