import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import { Movie } from '@/common/CommonTypes';

interface MovieRatingTagProps {
  movie: Movie;
}

function MovieRatingTag({ movie }: MovieRatingTagProps) {
  const theme = useTheme();

  return (
    <Box bgcolor={theme.palette.secondary.main} paddingY={0.25} paddingX={0.5}>
      <Typography variant="caption">
        {movie.vote_average.toFixed(2)} / 10
      </Typography>
    </Box>
  );
}

export default MovieRatingTag;
