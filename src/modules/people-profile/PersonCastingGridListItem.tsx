import React from 'react';
import MovieCard from '@/modules/movies-listing/MovieCard';
import { PersonCasting } from './PersonProfileTypes';

interface PersonCastingGridListItemProps {
  castCredit: PersonCasting;
}

function PersonCastingGridListItem({
  castCredit,
}: PersonCastingGridListItemProps) {
  return (
    <li>
      <MovieCard movie={castCredit} subheader={castCredit.character} />
    </li>
  );
}

export default PersonCastingGridListItem;
