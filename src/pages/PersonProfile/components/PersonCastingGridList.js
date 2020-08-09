import React from 'react';
import BaseGridList from '@/components/BaseGridList';
import PersonCastingGridListItem from './PersonCastingGridListItem';
import useFetch from '@/hooks/useFetch';

function renderItem(casting) {
  return <PersonCastingGridListItem castCredit={casting} />;
}

function PersonCastingGridList({ personId }) {
  const { data, loading } = useFetch(`/person/${personId}/movie_credits`);
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
