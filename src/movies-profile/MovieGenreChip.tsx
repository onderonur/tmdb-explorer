import React from 'react';
import { Chip } from '@mui/material';
import { Genre } from '@/common/CommonTypes';
import NextLink from '@/routing/NextLink';

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
    />
  );
}

export default MovieGenreChip;
