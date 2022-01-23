import React from 'react';
import ListItemButtonWithAvatar from '@/common/ListItemWithAvatar';
import { getMovieReleaseYear } from '@/common/CommonUtils';
import { Movie } from '@/common/CommonTypes';

interface MovieListItemProps {
  movie: Movie;
}

function MovieListItem({ movie, ...rest }: MovieListItemProps) {
  return (
    <ListItemButtonWithAvatar
      avatarUrl={movie.poster_path}
      primaryText={movie.title}
      secondaryText={getMovieReleaseYear(movie)}
      // Required for MovieAndPersonAutocomplete
      {...rest}
    />
  );
}

export default MovieListItem;
