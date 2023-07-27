import { Box, SxProps, Theme, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';
import { MovieBase } from '@/movies/movie-types';
import StarIcon from '@mui/icons-material/Star';

type MovieRatingProps = {
  movie: MovieBase;
  sx?: SxProps<Theme>;
};

function MovieRating({ movie, sx }: MovieRatingProps) {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          gap: 0.5,
          alignItems: 'center',
        },
        // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
        // https://mui.com/system/getting-started/the-sx-prop/#passing-the-sx-prop
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <StarIcon
        sx={{
          color: yellow[700],
          fontSize: 'inherit',
        }}
      />
      <Typography sx={{ fontSize: 'inherit' }}>
        <Box component="span">{movie.vote_average.toFixed(2)}</Box>
        <Box component="span" sx={{ opacity: 0.6 }}>
          {' '}
          / 10
        </Box>
      </Typography>
    </Box>
  );
}

export default MovieRating;
