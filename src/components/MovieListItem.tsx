import React from 'react';
import ListItemWithAvatar from '@/components/ListItemWithAvatar';
import { getMovieReleaseYear } from '@/utils';
import { Movie } from '@/types';

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
