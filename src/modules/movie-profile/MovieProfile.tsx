import React from 'react';
import { Typography } from '@material-ui/core';
import Profile from '@/modules/profile/Profile';
import MovieIntroduction from './MovieIntroduction';
import MovieImageGridList from './MovieImageGridList';
import MovieVideoList from './MovieVideoList';
import MovieCastGridList from './MovieCastGridList';
import MovieRecommendations from './MovieRecommendations';
import { Maybe, Movie } from '@/modules/shared/SharedTypes';

interface MovieProfileProps {
  movie: Maybe<Movie>;
  loading: boolean;
}

function MovieProfile({ movie, loading }: MovieProfileProps) {
  const movieId = movie?.id;
  return (
    <Profile
      loading={loading}
      introduction={movie && <MovieIntroduction movie={movie} />}
      main={
        typeof movieId === 'number' && (
          <>
            <Typography variant="h6" gutterBottom>
              Videos
            </Typography>
            <MovieVideoList movieId={movieId} />

            {movie && (
              <>
                <Typography variant="h6" gutterBottom>
                  Images
                </Typography>
                <MovieImageGridList movie={movie} />
              </>
            )}

            <Typography variant="h6" gutterBottom>
              Cast
            </Typography>
            <MovieCastGridList movieId={movieId} />
          </>
        )
      }
      rightSide={
        typeof movieId === 'number' && (
          <>
            <Typography variant="h6" gutterBottom>
              Recommendations
            </Typography>
            <MovieRecommendations movieId={movieId} />
          </>
        )
      }
    />
  );
}

export default MovieProfile;
