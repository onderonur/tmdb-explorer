import React from 'react';
import { withGetServerSideError } from '@/error-handling/withGetServerSideError';
import { dehydrate } from 'react-query';
import { createQueryClient } from '@/http-client/queryClient';
import { apiQueries } from '@/http-client/apiQueries';
import MoviesListingView from './MoviesListingView';

function UpcomingMoviesView() {
  return (
    <MoviesListingView
      title="Upcoming Movies"
      description="Upcoming movies list"
      apiQuery={apiQueries.movies.upcomingMovies()}
    />
  );
}

export const getServerSideProps = withGetServerSideError(async () => {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.fetchQuery(apiQueries.common.configuration()),
    queryClient.fetchInfiniteQuery(apiQueries.movies.upcomingMovies()),
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

export default UpcomingMoviesView;
