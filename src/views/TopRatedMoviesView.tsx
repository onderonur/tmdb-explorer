import { withGetServerSideError } from '@/error-handling/withGetServerSideError';
import { dehydrate } from 'react-query';
import { createQueryClient } from '@/http-client/queryClient';
import MoviesListingView from './MoviesListingView';
import { movieQueries } from '@/movies/movieQueries';
import { commonQueries } from '@/api-configuration/apiConfigurationQueries';

function TopRatedMoviesView() {
  return (
    <MoviesListingView
      title="Top Rated Movies"
      description="Top rated movies list"
      apiQuery={movieQueries.topRatedMovies()}
    />
  );
}

export const getServerSideProps = withGetServerSideError(async () => {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.fetchQuery(commonQueries.configuration()),
    queryClient.fetchInfiniteQuery(movieQueries.topRatedMovies()),
  ]);

  return {
    props: {
      // There is an issue when we use infinite query while SSR.
      // So, we use this workaround.
      // https://github.com/tannerlinsley/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
});

export default TopRatedMoviesView;
