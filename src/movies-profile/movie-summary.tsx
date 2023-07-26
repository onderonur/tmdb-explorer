'use client';

import { Typography, Stack, List, ListItem, Box } from '@mui/material';
import MovieRating from '@/movies/movie-rating';
import { getMovieReleaseYear } from '@/movies/movie-utils';
import TextWithLabel from '@/common/TextWithLabel';
import NextLink from '@/routing/NextLink';
import MovieGenreChip from './movie-genre-chip';
import { Movie } from '@/movies/movie-types';
import SectionTitle from '@/common/section-title';

// TODO: styled yerine sx mi önerilio next için bi bak

type MovieSummaryProps = {
  movie: Movie;
};

function MovieSummary({ movie }: MovieSummaryProps) {
  const releaseYear = getMovieReleaseYear(movie);
  const crew = movie.credits?.crew.filter((crew) => crew.job === 'Director');

  return (
    <Box sx={{ paddingTop: 32, maxWidth: '75ch' }}>
      <Stack spacing={1}>
        <div>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
            {movie.title}
          </Typography>
          {/* TODO: Burada semantic header vs belki olabilir daha */}
          {movie.tagline && (
            <Typography
              variant="h6"
              component="p"
              sx={{ color: 'text.secondary' }}
            >
              &quot;{movie.tagline}&quot;
            </Typography>
          )}
        </div>

        <Stack direction="row" spacing={0.8} sx={{ color: 'text.secondary' }}>
          {releaseYear && <span>{releaseYear}</span>}
          <span>&middot;</span>
          <span>{movie.runtime} minutes</span>
          <span>&middot;</span>
          <MovieRating movie={movie} />
        </Stack>

        <div>
          <SectionTitle title="Overview" />
          <Typography
            sx={{
              whiteSpace: 'pre-wrap',
              fontSize: 'h6.fontSize',
            }}
          >
            {movie.overview}
          </Typography>
        </div>

        <div>
          <SectionTitle title="Genres" />
          <List
            disablePadding
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            {movie.genres.map((genre) => (
              <ListItem key={genre.id} disablePadding sx={{ width: 'auto' }}>
                <MovieGenreChip genre={genre} />
              </ListItem>
            ))}
          </List>
        </div>

        {!!crew?.length && (
          <List
            disablePadding
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              paddingTop: 1,
            }}
          >
            {crew.map((crewPerson) => {
              const allJobs = movie.credits?.crew
                .filter((crew) => crew.id === crewPerson.id)
                .map((crewPerson) => crewPerson.job);

              return (
                <ListItem key={crewPerson.id} disablePadding>
                  <TextWithLabel
                    label={
                      <NextLink
                        href={`/people/${crewPerson.id}`}
                        sx={{ color: 'inherit' }}
                      >
                        {crewPerson.name}
                      </NextLink>
                    }
                    text={allJobs?.join(', ')}
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </Stack>
    </Box>
  );
}

export default MovieSummary;
