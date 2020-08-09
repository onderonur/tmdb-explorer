import React from 'react';
import { useTheme } from '@material-ui/styles';
import MovieCard from '@/components/MovieCard';
import BaseGridList from '@/components/BaseGridList';
import useFetch from '@/hooks/useFetch';

function renderItem(recommendation) {
  return (
    <li>
      <MovieCard movie={recommendation} />
    </li>
  );
}

function Recommendations({ movieId }) {
  const theme = useTheme();
  const { data, loading } = useFetch(`/movie/${movieId}/recommendations`);
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
