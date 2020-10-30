import React from 'react';
import useFetch from '@/modules/shared/useFetch';
import { api, createUrl } from '@/modules/shared/SharedUtils';
import { useRouter } from 'next/router';
import BaseSeo from '@/modules/seo/BaseSeo';
import { useApiConfiguration } from '@/modules/api-configuration/ApiConfigurationContext';
import { GetServerSideProps, NextPage } from 'next';
import { Movie } from '@/modules/shared/SharedTypes';
import withError, {
  withGetServerSideError,
  ServerSideProps,
} from '@/modules/errors/withError';
import MovieProfile from '@/modules/movie-profile/MovieProfile';

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
