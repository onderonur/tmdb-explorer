import React from 'react';
import { Chip } from '@material-ui/core';

function MovieGenreChip({ className, genre }) {
  return <Chip className={className} label={genre?.name} />;
}

export default MovieGenreChip;
