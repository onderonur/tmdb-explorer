import { Box, colors, Typography } from '@mui/material';
import { Movie } from '@/movies/MoviesTypes';
import StarIcon from '@mui/icons-material/Star';

interface MovieRatingProps {
  movie: Movie;
  size: 'small' | 'medium';
}

function MovieRating({ movie, size }: MovieRatingProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0.5,
        alignItems: 'center',
        fontSize: (theme) =>
          size === 'small'
            ? theme.typography.subtitle2.fontSize
            : theme.typography.h6.fontSize,
      }}
    >
      <StarIcon
        fontSize={size}
        sx={{
          color: colors.yellow[700],
        }}
      />
      <Typography fontSize={'inherit'}>
        <Box component={'span'}>{movie.vote_average.toFixed(2)}</Box>
        <Box component={'span'} sx={{ opacity: 0.6 }}>
          {' '}
          / 10
        </Box>
      </Typography>
    </Box>
  );
}

export default MovieRating;
