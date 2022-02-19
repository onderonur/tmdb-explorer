import React from 'react';
import { Typography, Box, styled, Stack } from '@mui/material';
import Introduction from '@/introduction/Introduction';
import MovieGenreChip from './MovieGenreChip';
import { Movie } from '@/movies/MovieTypes';
import ImdbLink, { ImdbProfileType } from '../introduction/ImdbLink';
import MovieRating from '@/movies/MovieRating';
import { getMovieReleaseYear } from '@/movies/MovieUtils';

const Year = styled('span')(({ theme }) => ({
  color: theme.palette.grey[400],
  marginLeft: theme.spacing(1),
}));

const Overview = styled(Typography)({
  whiteSpace: 'pre-wrap',
});

interface MovieIntroductionProps {
  movie: Movie;
}

function MovieIntroduction({ movie }: MovieIntroductionProps) {
  const releaseYear = getMovieReleaseYear(movie);

  if (!movie) {
    return null;
  }

  return (
    <Introduction
      backgroundImageSrc={movie.backdrop_path}
      imageSrc={movie.poster_path}
      title={
        <Box marginBottom={2}>
          <Typography variant="h5" gutterBottom={!movie.tagline}>
            {movie.title}
            {releaseYear && <Year>{`(${getMovieReleaseYear(movie)})`}</Year>}
          </Typography>
          {movie.tagline && (
            <Typography color={(theme) => theme.palette.grey[300]}>
              {movie.tagline}
            </Typography>
          )}
        </Box>
      }
      content={
        <Stack spacing={2}>
          <div>
            <Box display="flex" alignItems="center" gap={2}>
              <MovieRating movie={movie} size="medium" />
              <ImdbLink type={ImdbProfileType.MOVIE} imdbId={movie.imdb_id} />
            </Box>
          </div>
          <div>
            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            <Overview variant="body2">{movie.overview}</Overview>
          </div>
          <div>
            <Typography variant="h6" gutterBottom>
              Genres
            </Typography>
            <Box display="flex" gap={0.75} flexWrap={'wrap'}>
              {movie.genres.map((genre) => (
                <MovieGenreChip key={genre.id} genre={genre} />
              ))}
            </Box>
          </div>
        </Stack>
      }
    />
  );
}

export default MovieIntroduction;
