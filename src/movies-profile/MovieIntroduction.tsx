import React from 'react';
import { Typography, Box, styled, Stack } from '@mui/material';
import Introduction from '@/introduction/Introduction';
import MovieGenreChip from './MovieGenreChip';
import { Movie } from '@/movies/MoviesTypes';
import MovieRating from '@/movies/MovieRating';
import { getMovieReleaseYear } from '@/movies/MoviesUtils';

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
      imageAlt={movie.title}
      title={
        <Box>
          <Typography variant="h5">{movie.title}</Typography>
          <Stack
            direction="row"
            spacing={0.5}
            color={(theme) => theme.palette.grey[300]}
          >
            {releaseYear && <span>{getMovieReleaseYear(movie)}</span>}
            <span>·</span>
            <span>{movie.runtime} minutes</span>
          </Stack>
        </Box>
      }
      content={
        <Stack spacing={0.5} mt={1}>
          <MovieRating movie={movie} size="medium" />
          <div>
            <Typography variant="h6">Overview</Typography>
            {movie.tagline && (
              <Typography
                color={(theme) => theme.palette.grey[300]}
                gutterBottom
              >
                &quot;{movie.tagline}&quot;
              </Typography>
            )}
            <Overview>{movie.overview}</Overview>
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
