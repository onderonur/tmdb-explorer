import React from 'react';
import MovieCard from '@/components/MovieCard';

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
