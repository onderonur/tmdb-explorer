import { getMovieReleaseYear } from '@/movies/movie-utils';
import { Movie } from '@/movies/movie-types';
import AutocompleteItem from './AutocompleteItem';

type MovieAutocompleteItemProps = {
  movie: Movie;
};

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
