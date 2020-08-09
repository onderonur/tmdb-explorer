import React from 'react';
import BaseGridList from '@/components/BaseGridList';
import MovieCastGridListItem from './MovieCastGridListItem';
import useFetch from '@/hooks/useFetch';

function renderItem(castCredit) {
  return <MovieCastGridListItem castCredit={castCredit} button />;
}

function MovieCastGridList({ movieId }) {
  const { data, loading } = useFetch(`/movie/${movieId}/credits`);
  const castCredits = data?.cast || [];

  return (
    <BaseGridList
      items={castCredits}
      loading={loading}
      minItemWidth={230}
      renderItem={renderItem}
      listEmptyMessage="No cast has been found"
    />
  );
}

export default MovieCastGridList;
