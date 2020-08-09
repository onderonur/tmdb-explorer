import React from 'react';
import { Typography } from '@material-ui/core';
import Profile from '@/components/Profile';
import MovieIntroduction from './components/MovieIntroduction';
import MovieImageGridList from './components/MovieImageGridList';
import MovieVideoList from './components/MovieVideoList';
import MovieCastGridList from './components/MovieCastGridList';
import Recommendations from './components/Recommendations';
import useFetch from '@/hooks/useFetch';
import { api, createUrl } from '@utils';
import { useRouter } from 'next/router';
import BaseSeo from '@components/BaseSeo';
import { useConfiguration } from '@contexts/ConfigurationContext';

function MovieProfile({ initialData }) {
  const router = useRouter();
  const { movieId } = router.query;
  const { data, loading } = useFetch(`/movie/${movieId}`, undefined, {
    initialData,
  });

  const { getImageUrl } = useConfiguration();

  return (
    <>
      <BaseSeo
        title={data.title}
        description={data.overview}
        openGraph={{ images: [{ url: getImageUrl(data.poster_path) }] }}
      />
      <Profile
        loading={loading}
        introduction={<MovieIntroduction movie={data} />}
        main={
          <>
            <Typography variant="h6" gutterBottom>
              Videos
            </Typography>
            <MovieVideoList movieId={movieId} />

            <Typography variant="h6" gutterBottom>
              Images
            </Typography>
            <MovieImageGridList movie={data} />

            <Typography variant="h6" gutterBottom>
              Cast
            </Typography>
            <MovieCastGridList movieId={movieId} />
          </>
        }
        rightSide={
          <>
            <Typography variant="h6" gutterBottom>
              Recommendations
            </Typography>
            <Recommendations movieId={movieId} />
          </>
        }
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { movieId } = context.params;
  const initialData = await api.get(createUrl(`/movie/${movieId}`));
  return {
    props: {
      initialData,
    },
  };
}

export default MovieProfile;
