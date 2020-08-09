import React from 'react';
import BaseGridList from '@/components/BaseGridList';
import PersonCastingGridListItem from './PersonCastingGridListItem';
import useFetch from '@/hooks/useFetch';
import { ID } from '@/types';

function renderItem(casting: any) {
  return <PersonCastingGridListItem castCredit={casting} />;
}

interface PersonCastingGridList {
  personId: ID;
}

function PersonCastingGridList({ personId }: PersonCastingGridList) {
  const { data, loading } = useFetch<any>(`/person/${personId}/movie_credits`);
  const castings = data?.cast || [];

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
