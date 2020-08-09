import React from 'react';
import MovieCard from '@/components/MovieCard';

function PersonCastingGridListItem({ castCredit }) {
  return (
    <li>
      <MovieCard movie={castCredit} subheader={castCredit.character} />
    </li>
  );
}

export default PersonCastingGridListItem;
