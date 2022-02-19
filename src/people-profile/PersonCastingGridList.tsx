import React from 'react';
import BaseGridList from '@/common/BaseGridList';
import { ID } from '@/common/CommonTypes';
import { PersonCasting } from './PersonProfileTypes';
import { apiQueries } from '@/http-client/apiQueries';
import { useQuery } from 'react-query';
import { idExtractor } from '@/common/CommonUtils';
import MovieCard from '@/movies/MovieCard';

function renderItem(casting: PersonCasting) {
  return (
    <li>
      <MovieCard movie={casting} subheader={casting.character} />
    </li>
  );
}

interface PersonCastingGridListProps {
  personId: ID;
}

function PersonCastingGridList({ personId }: PersonCastingGridListProps) {
  const { data, isLoading } = useQuery(
    apiQueries.people.personCredits(personId),
  );
  const castings = data?.cast ?? [];

  return (
    <BaseGridList
      items={castings}
      loading={isLoading}
      keyExtractor={idExtractor}
      renderItem={renderItem}
      hasRowGutter
      listEmptyMessage="No casting has been found."
    />
  );
}

export default PersonCastingGridList;
