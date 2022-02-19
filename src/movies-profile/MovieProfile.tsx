import React from 'react';
import { Stack, Typography } from '@mui/material';
import MovieIntroduction from './MovieIntroduction';
import MovieImageCarousel from './MovieImageCarousel';
import MovieVideoCarousel from './MovieVideoCarousel';
import MovieCastCarousel from './MovieCastCarousel';
import MovieRecommendations from './MovieRecommendations';
import { Maybe } from '@/common/CommonTypes';
import LoadingIndicator from '@/common/LoadingIndicator';
import { Movie } from '@/movies/MovieTypes';

interface MovieProfileProps {
  movie: Maybe<Movie>;
  loading: boolean;
}

function MovieProfile({ movie, loading }: MovieProfileProps) {
  return (
    <LoadingIndicator loading={loading}>
      {movie && (
        <Stack spacing={2}>
          <MovieIntroduction movie={movie} />

          <div>
            <Typography variant="h6" gutterBottom>
              Videos
            </Typography>
            <MovieVideoCarousel movieId={movie.id} />
          </div>

          <div>
            <Typography variant="h6" gutterBottom>
              Images
            </Typography>
            <MovieImageCarousel movie={movie} />
          </div>

          <div>
            <Typography variant="h6" gutterBottom>
              Cast
            </Typography>
            <MovieCastCarousel movieId={movie.id} />
          </div>

          <div>
            <Typography variant="h6" gutterBottom>
              Recommendations
            </Typography>
            <MovieRecommendations movieId={movie.id} />
          </div>
        </Stack>
      )}
    </LoadingIndicator>
  );
}

export default MovieProfile;
