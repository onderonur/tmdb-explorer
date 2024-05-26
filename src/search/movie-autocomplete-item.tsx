import { getMovieReleaseYear } from '@/movies/movie-utils';
import { AutocompleteItem } from './autocomplete-item';
import type { MovieSearchResult } from './search-types';

type MovieAutocompleteItemProps = {
  movie: MovieSearchResult;
};

export function MovieAutocompleteItem({
  movie,
  ...rest
}: MovieAutocompleteItemProps) {
  return (
    <AutocompleteItem
      avatarUrl={movie.poster_path}
      primaryText={movie.title}
      secondaryText={getMovieReleaseYear(movie)?.toString()}
      // Required for SearchAutocomplete
      {...rest}
    />
  );
}
