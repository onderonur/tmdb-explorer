import { Chip } from '@mui/material';
import NextLink from '@/routing/NextLink';
import { Genre } from '@/movies/MoviesTypes';

interface MovieGenreChipProps {
  className?: string;
  genre: Genre;
}

function MovieGenreChip({ className, genre }: MovieGenreChipProps) {
  return (
    <Chip
      className={className}
      label={genre.name}
      href={{ pathname: '/movie/discover', query: { genreId: genre.id } }}
      component={NextLink}
      clickable
      color="secondary"
    />
  );
}

export default MovieGenreChip;
