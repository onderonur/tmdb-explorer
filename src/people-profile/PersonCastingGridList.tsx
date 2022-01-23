import React from 'react';
import BaseGridList from '@/common/BaseGridList';
import PersonCastingGridListItem from './PersonCastingGridListItem';
import { ID } from '@/common/CommonTypes';
import { PersonCasting } from './PersonProfileTypes';
import { apiQueries } from '@/http-client/apiQueries';
import { useQuery } from 'react-query';

function renderItem(casting: PersonCasting) {
  return <PersonCastingGridListItem castCredit={casting} />;
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
      renderItem={renderItem}
      hasRowGutter
      listEmptyMessage="No casting has been found"
    />
  );
}

export default PersonCastingGridList;
