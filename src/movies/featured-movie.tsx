import { Box, Stack } from '@mui/material';
import type { MovieBase } from './movie-types';
import { getMovieReleaseYear } from './movie-utils';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import TmdbImage from '@/tmdb/tmdb-image';
import ButtonLink from '@/common/button-link';
import Padder from '@/common/padder';
import MovieOverview from './movie-overview';
import MovieTitle from './movie-title';

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
          marginBottom: 2,
        }}
      >
        <Padder>
          <Stack spacing={2} sx={{ position: 'relative', maxWidth: '75ch' }}>
            <MovieTitle
              title={movie.title}
              subtitle={getMovieReleaseYear(movie)?.toString()}
            />
            <div>
              <MovieOverview text={movie.overview} maxLines={4} />
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
