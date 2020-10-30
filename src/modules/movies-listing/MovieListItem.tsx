import React from 'react';
import ListItemWithAvatar from '@/modules/shared/ListItemWithAvatar';
import { getMovieReleaseYear } from '@/modules/shared/SharedUtils';
import { Movie } from '@/modules/shared/SharedTypes';

interface MovieListItemProps {
  movie: Movie;
}

function MovieListItem({ movie }: MovieListItemProps) {
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
