import React from 'react';
import BaseGridList from '@/common/BaseGridList';
import MovieCastGridListItem from './MovieCastGridListItem';
import { ID } from '@/common/CommonTypes';
import { MovieCast } from './MovieProfileTypes';
import { useQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';

function renderItem(castCredit: MovieCast) {
  return <MovieCastGridListItem castCredit={castCredit} />;
}

interface MovieCastGridListProps {
  movieId: ID;
}

function MovieCastGridList({ movieId }: MovieCastGridListProps) {
  const { data, isLoading } = useQuery(apiQueries.movies.movieCast(movieId));
  const castCredits = data?.cast;

  return (
    <BaseGridList
      items={castCredits}
      loading={isLoading}
      minItemWidth={230}
      renderItem={renderItem}
      listEmptyMessage="No cast has been found"
    />
  );
}

export default MovieCastGridList;
