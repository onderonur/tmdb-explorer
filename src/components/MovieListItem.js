import React from 'react';
import ListItemWithAvatar from '@/components/ListItemWithAvatar';
import { getMovieReleaseYear } from '@/utils';

function MovieListItem({ movie }) {
  const releaseYear = getMovieReleaseYear(movie);

  return (
    <ListItemWithAvatar
      avatarUrl={movie.poster_path}
      primaryText={movie.title}
      secondaryText={releaseYear}
    />
  );
}

export default MovieListItem;
