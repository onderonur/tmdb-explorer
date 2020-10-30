import React from 'react';
import MovieCard from '@/modules/movies-listing/MovieCard';
import BaseGridList from '@/modules/shared/BaseGridList';
import useFetch from '@/modules/shared/useFetch';
import { useTheme } from '@material-ui/core';
import { Movie, ID, InfiniteFetchResponse } from '@/modules/shared/SharedTypes';

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
  const { data, loading } = useFetch<InfiniteFetchResponse<Movie>>(
    `/movie/${movieId}/recommendations`,
  );
  return (
    <BaseGridList
      items={data?.results}
      loading={loading}
      renderItem={renderItem}
      minItemWidth={260 / 2 - theme.spacing(2)}
      listEmptyMessage="No recommendation has been found"
    />
  );
}

export default Recommendations;
