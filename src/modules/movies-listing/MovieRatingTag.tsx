import React from 'react';
import { Typography, Box, useTheme } from '@material-ui/core';
import { Movie } from '@/modules/shared/SharedTypes';

interface MovieRatingTagProps {
  movie: Movie;
}

function MovieRatingTag({ movie }: MovieRatingTagProps) {
  const theme = useTheme();

  return (
    <Box bgcolor={theme.palette.secondary.main} paddingY={0.25} paddingX={0.5}>
      <Typography variant="caption">{movie.vote_average} / 10</Typography>
    </Box>
  );
}

export default MovieRatingTag;
