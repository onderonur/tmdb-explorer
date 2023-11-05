import {
  Typography,
  Stack,
  List,
  ListItem,
  Box,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import MovieRating from '@/movies/movie-rating';
import { getMovieReleaseYear } from '@/movies/movie-utils';
import type { MovieDetails } from '@/movies/movie-types';
import SectionTitle from '@/common/section-title';
import { visuallyHidden } from '@mui/utils';
import ListItemLink from '@/common/list-item-link';
import TmdbAvatar from '@/tmdb/tmdb-avatar';
import NextLink from '@/routing/next-link';
import { Fragment } from 'react';
import MovieOverview from '@/movies/movie-overview';
import MovieTitle from '@/movies/movie-title';

type MovieSummaryProps = {
  movie: MovieDetails;
};

export default function MovieSummary({ movie }: MovieSummaryProps) {
  const releaseYear = getMovieReleaseYear(movie);
  const filteredCrew = movie.credits?.crew.filter(
    (crew) => crew.job === 'Director',
  );

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

        {!!filteredCrew?.length && (
          <section>
            <SectionTitle title="Top Crew" sx={visuallyHidden} />
            <List
              disablePadding
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
              }}
            >
              {filteredCrew.map((crewPerson) => {
                const allJobs = movie.credits?.crew
                  .filter((crew) => crew.id === crewPerson.id)
                  .map((crewInfoOfPerson) => crewInfoOfPerson.job);

                return (
                  <ListItem
                    key={crewPerson.id}
                    disablePadding
                    dense
                    sx={{
                      width: 'auto',
                      border: 1,
                      borderRadius: 2,
                      borderColor: 'divider',
                    }}
                  >
                    <ListItemLink href={`/people/${crewPerson.id}`}>
                      <ListItemAvatar>
                        <TmdbAvatar
                          src={crewPerson.profile_path}
                          alt={crewPerson.name}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={crewPerson.name}
                        secondary={allJobs?.join(', ')}
                      />
                    </ListItemLink>
                  </ListItem>
                );
              })}
            </List>
          </section>
        )}
      </Stack>
    </Box>
  );
}
