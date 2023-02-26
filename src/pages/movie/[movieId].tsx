import { useRouter } from 'next/router';
import BaseSeo from '@/seo/BaseSeo';
import MovieProfile from '@/movies-profile/MovieProfile';
import { dehydrate, useQuery } from '@tanstack/react-query';
import { createQueryClient } from '@/http-client/queryClient';
import useApiConfiguration from '@/api-configuration/ApiConfigurationHooks';
import { moviesAPI } from '@/movies/moviesAPI';
import { apiConfigurationAPI } from '@/api-configuration/apiConfigurationAPI';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';

function getMovieId(query: ParsedUrlQuery) {
  return Number(query.movieId);
}

function MovieProfilePage() {
  const router = useRouter();
  const movieId = getMovieId(router.query);
  const { data, isLoading } = useQuery(moviesAPI.movieDetails(movieId));

  const { getImageUrl } = useApiConfiguration();

  return (
    <>
      {data && (
        <BaseSeo
          title={data.title}
          description={data.overview}
          openGraph={{
            images: [
              {
                url: getImageUrl(data.poster_path),
                width: 500,
                height: 750,
                alt: data.title,
              },
            ],
          }}
        />
      )}
      <MovieProfile movie={data} loading={isLoading} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const movieId = getMovieId(ctx.params ?? {});
  const queryClient = createQueryClient();

  // Any query with an error is automatically excluded from dehydration.
  // This means that the default behavior is to pretend these queries were never loaded on the server,
  // usually showing a loading state instead, and retrying the queries on the queryClient.
  // This happens regardless of error.
  // Sometimes this behavior is not desirable, maybe you want to render an error page with a
  // correct status code instead on certain errors or queries.
  // In those cases, use fetchQuery and catch any errors to handle those manually.
  // https://@tanstack/react-query.tanstack.com/guides/ssr#only-successful-queries-are-included-in-dehydration
  await Promise.all([
    queryClient.fetchQuery(apiConfigurationAPI.configuration()),
    queryClient.fetchQuery(moviesAPI.movieDetails(movieId)),
    queryClient.fetchInfiniteQuery(moviesAPI.movieRecommendations(movieId)),
  ]);

  return {
    props: {
      // There is an issue when we use infinite query while SSR.
      // So, we use this workaround.
      // https://github.com/tannerlinsley/@tanstack/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default MovieProfilePage;
