import { withGetServerSideError } from '@/error-handling/withGetServerSideError';
import { dehydrate } from '@tanstack/react-query';
import { createQueryClient } from '@/http-client/queryClient';
import MoviesListingView from './MoviesListingView';
import { movieQueries } from '@/movies/movieQueries';
import { commonQueries } from '@/api-configuration/apiConfigurationQueries';

function PopularMoviesView() {
  return (
    <MoviesListingView
      title="Popular Movies"
      description="Popular movies list"
      apiQuery={movieQueries.popularMovies()}
    />
  );
}

export const getServerSideProps = withGetServerSideError(async () => {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.fetchQuery(commonQueries.configuration()),
    queryClient.fetchInfiniteQuery(movieQueries.popularMovies()),
  ]);

  return {
    props: {
      // There is an issue when we use infinite query while SSR.
      // So, we use this workaround.
      // https://github.com/tannerlinsley/@tanstack/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
});

export default PopularMoviesView;
