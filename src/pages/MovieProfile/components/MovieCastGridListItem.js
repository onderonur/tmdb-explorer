import React from 'react';
import PersonListItem from '@/components/PersonListItem';
import NextLink from '@components/NextLink';

function MovieCastGridListItem({ castCredit }) {
  const person = castCredit;

  return (
    <PersonListItem
      person={person}
      secondaryText={castCredit.character}
      button
      href="/person/[personId]"
      as={`/person/${person.id}`}
      component={NextLink}
    />
  );
}

export default MovieCastGridListItem;
