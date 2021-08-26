import React from 'react';
import useFetch from '@/common/useFetch';
import { api, createUrl } from '@/common/CommonUtils';
import { useRouter } from 'next/router';
import BaseSeo from '@/seo/BaseSeo';
import { useApiConfiguration } from '@/api-configuration/ApiConfigurationContext';
import { GetServerSideProps, NextPage } from 'next';
import { Movie } from '@/common/CommonTypes';
import withError, {
  withGetServerSideError,
  ServerSideProps,
} from '@/errors/withError';
import MovieProfile from '@/movie-profile/MovieProfile';

type MovieProfileViewProps = ServerSideProps<Movie>;

const MovieProfileView: NextPage<MovieProfileViewProps> = ({ initialData }) => {
  const router = useRouter();
  const movieIdParam = router.query.movieId;
  const movieId =
    typeof movieIdParam === 'string' ? parseInt(movieIdParam) : null;
  const { data, loading } = useFetch<Movie>(`/movie/${movieId}`, undefined, {
    initialData: initialData || undefined,
  });

  const { getImageUrl } = useApiConfiguration();

  return (
    <>
      {data && (
        <BaseSeo
          title={data.title}
          description={data.overview}
          openGraph={{ images: [{ url: getImageUrl(data.poster_path) }] }}
        />
      )}
      <MovieProfile movie={data} loading={loading} />
    </>
  );
};

const getServerSidePropsFn: GetServerSideProps<
  MovieProfileViewProps,
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

export default withError(MovieProfileView);
