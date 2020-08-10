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
import { GetServerSideProps, NextPage, GetServerSidePropsContext } from 'next';
import { Movie } from '@/types';
import ErrorPage from '../Error';

interface MovieProfileProps {
  initialData: Movie;
}

const MovieProfile: NextPage<MovieProfileProps> = ({ initialData }) => {
  const router = useRouter();
  const movieIdParam = router.query.movieId;
  const movieId =
    typeof movieIdParam === 'string' ? parseInt(movieIdParam) : null;
  const { data, loading } = useFetch<Movie>(`/movie/${movieId}`, undefined, {
    initialData,
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

export const getServerSideProps: GetServerSideProps<
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> = withGetServerSideError<MovieProfileProps>(async (context) => {
  const { movieId } = context.params;
  const initialData = await api.get<Movie>(createUrl(`/movie/${movieId}`));
  return {
    props: {
      initialData,
    },
  };
});

type Q = any;

function withGetServerSideError<P /* Q */>(
  getServerSideFn: GetServerSideProps<P, Q>,
) {
  return async function (ctx: GetServerSidePropsContext<Q>) {
    try {
      const result = await getServerSideFn(ctx);
      return result;
    } catch (err) {
      return {
        props: {
          error: {
            statusCode: err.statusCode,
            message: err.message,
          },
        },
      };
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withError(SomePage: NextPage<any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function ({ error, ...rest }: any) {
    if (error) {
      return (
        <ErrorPage statusCode={error.statusCode} message={error.message} />
      );
    }

    return <SomePage {...rest} />;
  };
}

export default withError(MovieProfile);
