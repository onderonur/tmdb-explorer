import { Typography, Box, styled, Stack, List, ListItem } from '@mui/material';
import Introduction from '@/introduction/Introduction';
import MovieGenreChip from './MovieGenreChip';
import { MovieDetails } from '@/movies/MoviesTypes';
import MovieRating from '@/movies/MovieRating';
import { getMovieReleaseYear } from '@/movies/MoviesUtils';
import TextWithLabel from '@/common/TextWithLabel';
import NextLink from '@/routing/NextLink';

const Overview = styled(Typography)({
  whiteSpace: 'pre-wrap',
});

interface MovieIntroductionProps {
  movie: MovieDetails;
}

function MovieIntroduction({ movie }: MovieIntroductionProps) {
  const releaseYear = getMovieReleaseYear(movie);
  const crew = movie.credits.crew.filter((crew) => crew.job === 'Director');

  return (
    <Introduction
      imageSrc={movie.poster_path}
      imageAlt={movie.title}
      title={
        <Box>
          <Typography
            variant="h5"
            component="h1"
            sx={{ fontWeight: (theme) => theme.typography.fontWeightBold }}
          >
            {movie.title}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            {releaseYear && <span>{getMovieReleaseYear(movie)}</span>}
            <span>&middot;</span>
            <span>{movie.runtime} minutes</span>
          </Stack>
        </Box>
      }
      content={
        <Stack spacing={0.5} sx={{ marginTop: 1 }}>
          <MovieRating movie={movie} size="medium" />
          <div>
            <Typography variant="h6">Overview</Typography>
            {movie.tagline && (
              <Typography gutterBottom>{movie.tagline}</Typography>
            )}
            <Overview>{movie.overview}</Overview>
          </div>
          {!!crew.length && (
            <div>
              <List
                disablePadding
                sx={{
                  my: 1,
                  display: 'flex',
                  columnGap: 4,
                  rowGap: 2,
                  flexWrap: 'wrap',
                }}
              >
                {crew.map((crewPerson) => {
                  const allJobs = movie.credits.crew
                    .filter((crew) => crew.id === crewPerson.id)
                    .map((crewPerson) => crewPerson.job);
                  return (
                    <ListItem
                      key={crewPerson.id}
                      disablePadding
                      sx={{ width: 'auto' }}
                    >
                      <TextWithLabel
                        label={
                          <NextLink
                            href={`/person/${crewPerson.id}`}
                            sx={{
                              color: (theme) => theme.palette.text.secondary,
                            }}
                          >
                            {crewPerson.name}
                          </NextLink>
                        }
                        text={allJobs.join(', ')}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          )}
          <div>
            <Typography variant="h6" gutterBottom>
              Genres
            </Typography>
            <List
              disablePadding
              sx={{
                display: 'flex',
                gap: 0.75,
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
        </Stack>
      }
    />
  );
}

export default MovieIntroduction;
