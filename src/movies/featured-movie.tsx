import { Box, Stack, Typography } from '@mui/material';
import { MovieBase } from './movie-types';
import { getMovieReleaseYear } from './movie-utils';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import { lineClamp } from '@/theme/theme-utils';
import TmdbImage from '@/tmdb/tmdb-image';
import ButtonLink from '@/common/button-link';
import Padder from '@/common/padder';

type FeaturedMovieProps = {
  movie: MovieBase;
};

export default function FeaturedMovie({ movie }: FeaturedMovieProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 460, sm: 560, md: 660 },
        display: 'grid',
      }}
    >
      <TmdbImage
        // TODO: Bu key belki BaseImage'a da alınabilir bilemedim.
        // TODO: Ayrıca bu key işe yaramıyo gibi. Bi üstteki Box'a key={movie.id} koyunca oluyo gibi. Genel olarak bi bak.
        key={movie.id}
        src={movie.backdrop_path}
        alt={movie.title}
        tmdbImageQuality="original"
        fill
        priority
        sx={{
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(farthest-side at 70% 20%, transparent, #141f29)',
        }}
      />
      <Box
        sx={{
          marginTop: 'auto',
        }}
      >
        <Padder paddingY>
          <Stack spacing={2} sx={{ position: 'relative', maxWidth: '75ch' }}>
            <div>
              <Typography
                variant="h3"
                component="p"
                sx={{ fontWeight: 'bold' }}
              >
                {movie.title}
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{ color: 'text.secondary', fontWeight: 'bold' }}
              >
                {getMovieReleaseYear(movie)}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" component="p" sx={{ ...lineClamp(4) }}>
                {movie.overview}
              </Typography>
            </div>
            <div>
              <ButtonLink
                href={`/movies/${movie.id}`}
                variant="outlined"
                color="primary"
                startIcon={<InfoIcon />}
              >
                More Info
              </ButtonLink>
            </div>
          </Stack>
        </Padder>
      </Box>
    </Box>
  );
}
