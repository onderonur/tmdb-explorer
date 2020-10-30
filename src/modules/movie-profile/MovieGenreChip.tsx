import React from 'react';
import { Chip } from '@material-ui/core';
import { Genre } from '@/modules/shared/SharedTypes';

interface MovieGenreChipProps {
  className: string;
  genre: Genre;
}

function MovieGenreChip({ className, genre }: MovieGenreChipProps) {
  return <Chip className={className} label={genre.name} />;
}

export default MovieGenreChip;
