import React from 'react';
import ListItemWithAvatar from '@/common/ListItemWithAvatar';
import { getMovieReleaseYear } from '@/common/CommonUtils';
import { Movie } from '@/common/CommonTypes';

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
