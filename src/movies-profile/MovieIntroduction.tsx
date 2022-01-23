import React from 'react';
import { Typography, Box, Grid, styled } from '@mui/material';
import Rating from './Rating';
import { getMovieReleaseYear } from '@/common/CommonUtils';
import Introduction from '@/introduction/Introduction';
import MovieGenreChip from './MovieGenreChip';
import { Movie } from '@/common/CommonTypes';
import ImdbLink, { ImdbProfileType } from '../introduction/ImdbLink';

const Year = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const StyledMovieGenreChip = styled(MovieGenreChip)(({ theme }) => ({
  color: theme.palette.text.secondary,
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
            {releaseYear && (
              <>
                {' '}
                <Year>{`(${getMovieReleaseYear(movie)})`}</Year>
              </>
            )}
          </Typography>
          {movie.tagline && (
            <Typography color="textSecondary">{movie.tagline}</Typography>
          )}
        </Box>
      }
      content={
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Rating value={movie.vote_average * 10} />
                <Box marginLeft={2}>
                  <ImdbLink
                    type={ImdbProfileType.MOVIE}
                    imdbId={movie.imdb_id}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Genres
              </Typography>
              <Box display="flex" gap={0.75} flexWrap={'wrap'}>
                {movie.genres.map((genre) => (
                  <StyledMovieGenreChip key={genre.id} genre={genre} />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Overview
              </Typography>
              <Overview variant="body2">{movie.overview}</Overview>
            </Grid>
          </Grid>
        </>
      }
    />
  );
}

export default MovieIntroduction;
