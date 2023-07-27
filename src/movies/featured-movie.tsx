import { Box, Typography } from '@mui/material';
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
            // TODO: Fix for theming
            'radial-gradient(farthest-side at 70% 20%, transparent, #141f29)',
        }}
      />
      <Box
        sx={{
          height: '100%',
          display: 'grid',
          alignContent: 'end',
        }}
      >
        {/* TODO: Stack de kullanılabilir burada, eğer hala öneriliyosa. */}
        <Padder paddingY>
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              display: 'grid',
              gap: 1,
              justifyItems: 'start',
              maxWidth: '75ch',
            }}
          >
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
              {/* TODO: max line ekle. */}
            </div>
            <div>
              <Typography variant="h6" component="p" sx={{ ...lineClamp(4) }}>
                {movie.overview}
              </Typography>
            </div>
            <ButtonLink
              href={`/movies/${movie.id}`}
              variant="outlined"
              color="primary"
              sx={{ marginTop: 1 }}
              startIcon={<InfoIcon />}
            >
              More Info
            </ButtonLink>
          </Box>
        </Padder>
      </Box>
    </Box>
  );
}
