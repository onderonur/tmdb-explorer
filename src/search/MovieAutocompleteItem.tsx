import React from 'react';
import { getMovieReleaseYear } from '@/movies/MovieUtils';
import { Movie } from '@/movies/MovieTypes';
import AutocompleteItem from './AutocompleteItem';

interface MovieAutocompleteItemProps {
  movie: Movie;
}

function MovieAutocompleteItem({ movie, ...rest }: MovieAutocompleteItemProps) {
  return (
    <AutocompleteItem
      avatarUrl={movie.poster_path}
      primaryText={movie.title}
      secondaryText={getMovieReleaseYear(movie)}
      // Required for MovieAndPersonAutocomplete
      {...rest}
    />
  );
}

export default MovieAutocompleteItem;
