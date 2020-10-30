import React from 'react';
import MovieCard from '@/modules/movies-listing/MovieCard';

interface PersonCastingGridListItemProps {
  castCredit: any;
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
