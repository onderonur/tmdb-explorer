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
import { GetServerSideProps, NextPage } from 'next';
import { Movie } from '@/types';
import withError, {
  withGetServerSideError,
  ServerSideProps,
} from '@/hocs/withError';

type MovieProfileProps = ServerSideProps<Movie>;

const MovieProfile: NextPage<MovieProfileProps> = ({ initialData }) => {
  const router = useRouter();
  const movieIdParam = router.query.movieId;
  const movieId =
    typeof movieIdParam === 'string' ? parseInt(movieIdParam) : null;
  const { data, loading } = useFetch<Movie>(`/movie/${movieId}`, undefined, {
    initialData: initialData || undefined,
  });

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
};

const getServerSidePropsFn: GetServerSideProps<
  MovieProfileProps,
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> = async (context) => {
  const { movieId } = context.params;
  const initialData = await api.get<Movie>(createUrl(`/movie/${movieId}`));
  return {
    props: {
      initialData,
    },
  };
};

export const getServerSideProps = withGetServerSideError(getServerSidePropsFn);

export default withError(MovieProfile);
