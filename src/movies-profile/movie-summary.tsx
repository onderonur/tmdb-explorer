import { SectionTitle } from '@/common/section-title';
import { MovieOverview } from '@/movies/movie-overview';
import { MovieRating } from '@/movies/movie-rating';
import { MovieTitle } from '@/movies/movie-title';
import type { MovieDetails } from '@/movies/movie-types';
import { getMovieReleaseYear } from '@/movies/movie-utils';
import { NextLink } from '@/routing/next-link';
import { Box, Stack, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Fragment, Suspense } from 'react';
import { MovieTopCrew, MovieTopCrewSkeleton } from './movie-top-crew';

type MovieSummaryProps = {
  movie: MovieDetails;
};

export function MovieSummary({ movie }: MovieSummaryProps) {
  const releaseYear = getMovieReleaseYear(movie);

  return (
    <Box sx={{ paddingTop: { xs: 24, md: 32 } }}>
      <Stack spacing={2}>
        <Stack spacing={0.4} sx={{ maxWidth: '75ch' }}>
          <MovieTitle
            component="h1"
            title={movie.title}
            subtitle={movie.tagline && `"${movie.tagline}"`}
          />
          <Stack
            direction="row"
            spacing={0.8}
            sx={{
              color: 'text.secondary',
              typography: { xs: 'body2', md: 'body1' },
            }}
          >
            {releaseYear && <span>{releaseYear}</span>}
            <span>&middot;</span>
            <span>{movie.runtime} minutes</span>
            <span>&middot;</span>
            <MovieRating movie={movie} />
          </Stack>
          <Typography
            component="p"
            sx={{ typography: { xs: 'subtitle2', md: 'subtitle1' } }}
          >
            {movie.genres.map((genre, i) => {
              const isLastItem = i === movie.genres.length - 1;

              return (
                <Fragment key={genre.id}>
                  <NextLink href={`/movies/discover?genreId=${genre.id}`}>
                    {genre.name}
                  </NextLink>
                  {!isLastItem && <span>, </span>}
                </Fragment>
              );
            })}
          </Typography>
        </Stack>

        <Box component="section" sx={{ maxWidth: '75ch' }}>
          <SectionTitle title="Overview" sx={visuallyHidden} />
          <MovieOverview text={movie.overview} />
        </Box>

        {/* TODO: Bu buradan çıkartılıp direkt top level page'de de kullanılabilir ya. */}
        <Suspense fallback={<MovieTopCrewSkeleton />}>
          <MovieTopCrew movieId={movie.id} />
        </Suspense>
      </Stack>
    </Box>
  );
}
