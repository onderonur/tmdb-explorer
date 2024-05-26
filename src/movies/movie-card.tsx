import { CardLinkArea } from '@/common/card-link-area';
import type { MovieBase } from '@/movies/movie-types';
import { getMovieReleaseYear } from '@/movies/movie-utils';
import { lineClamp } from '@/theme/theme-utils';
import { TmdbImage } from '@/tmdb/tmdb-image';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from '@mui/material';
import { MovieRating } from './movie-rating';

// TODO: Card ve Skeleton'ı refactor gerekebilir

type MovieCardProps = {
  movie: MovieBase;
  subheader?: string;
};

export function MovieCard({ movie, subheader }: MovieCardProps) {
  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
      <CardLinkArea href={`/movies/${movie.id}`}>
        <Box sx={{ position: 'relative', aspectRatio: '2 / 3' }}>
          <TmdbImage
            src={movie.poster_path}
            alt={movie.title}
            fill
            sx={{ objectFit: 'cover' }}
          />
        </Box>
        <CardHeader
          title={movie.title}
          titleTypographyProps={{
            variant: 'body2',
            fontWeight: 'bold',
            sx: {
              ...lineClamp(2),
              wordBreak: 'break-word',
            },
          }}
          subheader={subheader}
          subheaderTypographyProps={{
            variant: 'subtitle2',
          }}
          sx={{ padding: 1, paddingBottom: 0.25 }}
        />
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingX: 1,
            paddingTop: 0,
            paddingBottom: 1,
          }}
        >
          <Typography
            variant="subtitle2"
            component="p"
            sx={{ color: 'text.secondary' }}
          >
            {getMovieReleaseYear(movie)}
          </Typography>
          <MovieRating movie={movie} sx={{ typography: 'subtitle2' }} />
        </CardContent>
      </CardLinkArea>
    </Card>
  );
}

export function MovieCardSkeleton() {
  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
      <Box sx={{ aspectRatio: '2 / 3' }}>
        <Skeleton variant="rounded" height="100%" />
      </Box>
      <CardHeader
        title={
          <div>
            <Skeleton />
            <Skeleton width="60%" />
          </div>
        }
        titleTypographyProps={{
          variant: 'body2',
          fontWeight: 'bold',
          sx: {
            ...lineClamp(2),
            wordBreak: 'break-word',
          },
        }}
        // TODO: Conditional olmalı bu
        // subheader={<Skeleton width="40%" />}
        subheaderTypographyProps={{
          variant: 'subtitle2',
        }}
        sx={{ padding: 1, paddingBottom: 0.25 }}
      />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingX: 1,
          paddingTop: 0,
          paddingBottom: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          component="p"
          sx={{ color: 'text.secondary' }}
        >
          <Skeleton width="4ch" />
        </Typography>
      </CardContent>
    </Card>
  );
}
