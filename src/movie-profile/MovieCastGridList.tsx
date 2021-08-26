import React from 'react';
import BaseGridList from '@/common/BaseGridList';
import MovieCastGridListItem from './MovieCastGridListItem';
import useFetch from '@/common/useFetch';
import { ID } from '@/common/CommonTypes';
import { MovieCast } from './MovieProfileTypes';

function renderItem(castCredit: MovieCast) {
  return <MovieCastGridListItem castCredit={castCredit} />;
}

interface MovieCastGridListProps {
  movieId: ID;
}

function MovieCastGridList({ movieId }: MovieCastGridListProps) {
  const { data, loading } = useFetch<{ cast: MovieCast[] }>(
    `/movie/${movieId}/credits`,
  );
  const castCredits = data?.cast;

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
