import React from 'react';
import BaseGridList from '@/modules/shared/BaseGridList';
import PersonCastingGridListItem from './PersonCastingGridListItem';
import useFetch from '@/modules/shared/useFetch';
import { ID } from '@/modules/shared/SharedTypes';
import { PersonCasting, PersonCredits } from './PersonProfileTypes';

function renderItem(casting: PersonCasting) {
  return <PersonCastingGridListItem castCredit={casting} />;
}

interface PersonCastingGridListProps {
  personId: ID;
}

function PersonCastingGridList({ personId }: PersonCastingGridListProps) {
  const { data, loading } = useFetch<PersonCredits>(
    `/person/${personId}/movie_credits`,
  );
  const castings = data?.cast ?? [];

  return (
    <BaseGridList
      items={castings}
      loading={loading}
      renderItem={renderItem}
      listEmptyMessage="No casting has been found"
    />
  );
}

export default PersonCastingGridList;
