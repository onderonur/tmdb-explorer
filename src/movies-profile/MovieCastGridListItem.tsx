import React from 'react';
import NextLink from '@/routing/NextLink';
import PersonListItem from '../people-listing/PersonListItem';
import { MovieCast } from './MovieProfileTypes';

interface MovieCastGridListItemProps {
  castCredit: MovieCast;
}

function MovieCastGridListItem({ castCredit }: MovieCastGridListItemProps) {
  const person = castCredit;

  return (
    <PersonListItem
      person={person}
      secondaryText={castCredit.character}
      href={`/person/${person.id}`}
      component={NextLink}
    />
  );
}

export default MovieCastGridListItem;
