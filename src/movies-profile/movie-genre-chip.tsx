// TODO: component={NextLink}'ten dolayı eklendi bu. Bi bak çözümü var mı.
'use client';

import { Chip } from '@mui/material';
import NextLink from '@/routing/next-link';
import { Genre } from '@/movies/movie-types';

type MovieGenreChipProps = {
  className?: string;
  genre: Genre;
};

function MovieGenreChip({ className, genre }: MovieGenreChipProps) {
  const newSearchParams = new URLSearchParams();
  newSearchParams.set('genreId', genre.id.toString());

  return (
    <Chip
      className={className}
      label={genre.name}
      href={`/movies/discover?${newSearchParams.toString()}`}
      component={NextLink}
      clickable
      color="secondary"
    />
  );
}

export default MovieGenreChip;
