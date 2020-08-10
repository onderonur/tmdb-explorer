import React from 'react';
import { Typography } from '@material-ui/core';
import Profile from '@/components/Profile';
import MovieIntroduction from './components/MovieIntroduction';
import MovieImageGridList from './components/MovieImageGridList';
import MovieVideoList from './components/MovieVideoList';
import MovieCastGridList from './components/MovieCastGridList';
import Recommendations from './components/Recommendations';
import useFetch from '@/hooks/useFetch';
import { api, createUrl } from '@/utils';
import { useRouter } from 'next/router';
import BaseSeo from '@/components/BaseSeo';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import { GetServerSideProps } from 'next';
import { Movie, Maybe } from '@/types';

interface MovieProfileProps {
  initialData: Maybe<Movie>;
}

function MovieProfile({ initialData }: MovieProfileProps) {
  const router = useRouter();
  const movieIdParam = router.query.movieId;
  const movieId =
    typeof movieIdParam === 'string' ? parseInt(movieIdParam) : null;
  const { data, loading } = useFetch<Movie>(
    initialData ? `/movie/${movieId}` : undefined,
    undefined,
    {
      initialData: initialData || undefined,
    },
  );

  const { getImageUrl } = useConfiguration();

  return (
    <>
      {data && (
        <BaseSeo
          title={data.title}
          description={data.overview}
          openGraph={{ images: [{ url: getImageUrl(data.poster_path) }] }}
        />
      )}
      <Profile
        loading={loading}
        introduction={data && <MovieIntroduction movie={data} />}
        main={
          typeof movieId === 'number' && (
            <>
              <Typography variant="h6" gutterBottom>
                Videos
              </Typography>
              <MovieVideoList movieId={movieId} />

              {data && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Images
                  </Typography>
                  <MovieImageGridList movie={data} />
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
              <Recommendations movieId={movieId} />
            </>
          )
        }
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  MovieProfileProps,
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> = async (context) => {
  const { movieId } = context.params;
  let initialData;
  try {
    initialData = await api.get<Movie>(createUrl(`/movie/${movieId}`));
  } catch (err) {
    context.res.statusCode = err.statusCode || 404;
  }
  return {
    props: {
      initialData,
    },
  };
};

export default MovieProfile;
