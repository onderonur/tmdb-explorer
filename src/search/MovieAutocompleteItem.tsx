import { getMovieReleaseYear } from '@/movies/MoviesUtils';
import { Movie } from '@/movies/MoviesTypes';
import AutocompleteItem from './AutocompleteItem';

interface MovieAutocompleteItemProps {
  movie: Movie;
}

function MovieAutocompleteItem({ movie, ...rest }: MovieAutocompleteItemProps) {
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

export default MovieAutocompleteItem;
