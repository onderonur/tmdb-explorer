'use client';

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
import { MovieDetails } from '@/movies/movie-types';
import SectionTitle from '@/common/section-title';
import { visuallyHidden } from '@mui/utils';
import ListItemLink from '@/common/list-item-link';
import TmdbAvatar from '@/tmdb/tmdb-avatar';
import NextLink from '@/routing/next-link';

// TODO: styled yerine sx mi önerilio next için bi bak

type MovieSummaryProps = {
  movie: MovieDetails;
};

function MovieSummary({ movie }: MovieSummaryProps) {
  const releaseYear = getMovieReleaseYear(movie);
  const crew = movie.credits?.crew.filter((crew) => crew.job === 'Director');

  return (
    <Box sx={{ paddingTop: 32 }}>
      <Stack spacing={2}>
        <Stack spacing={0.4} sx={{ maxWidth: '75ch' }}>
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
          <Stack direction="row" spacing={0.8} sx={{ color: 'text.secondary' }}>
            {releaseYear && <span>{releaseYear}</span>}
            <span>&middot;</span>
            <span>{movie.runtime} minutes</span>
            <span>&middot;</span>
            <MovieRating movie={movie} />
          </Stack>
          <Typography variant="subtitle1" component="p">
            {movie.genres.map((genre, i) => {
              const isLastItem = i === movie.genres.length - 1;

              return (
                <>
                  <NextLink
                    key={genre.id}
                    href={`/movies/discover?genreId=${genre.id}`}
                  >
                    {genre.name}
                  </NextLink>
                  {!isLastItem && <span>, </span>}
                </>
              );
            })}
          </Typography>
        </Stack>

        <Box component="section" sx={{ maxWidth: '75ch' }}>
          <SectionTitle title="Overview" sx={visuallyHidden} />
          <Typography
            variant="h6"
            component="p"
            sx={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {movie.overview}
          </Typography>
        </Box>

        {!!crew?.length && (
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
              {crew.map((crewPerson) => {
                const allJobs = movie.credits?.crew
                  .filter((crew) => crew.id === crewPerson.id)
                  .map((crewPerson) => crewPerson.job);

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

export default MovieSummary;
