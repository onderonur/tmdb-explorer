import React from 'react';
import { apiQueries } from '@/http-client/apiQueries';
import MoviesListingView from './MoviesListingView';
import { useRouter } from 'next/router';
import { dehydrate, useQuery } from 'react-query';
import { createQueryClient } from '@/http-client/queryClient';
import { withGetServerSideError } from '@/error-handling/withGetServerSideError';
import MovieSortingSelect, {
  getSelectedSorting,
} from '@/movies/MovieSortingSelect';

function DiscoverMoviesView() {
  const router = useRouter();

  const { data: genresData } = useQuery(apiQueries.genres.movieGenres());
  const genreId = Number(router.query.genreId);
  const genre = genresData?.genres.find((genre) => genre.id === genreId);

  const sorting = getSelectedSorting(router.query.sortBy);

  return (
    <MoviesListingView
      title={genre ? `${genre.name} Movies` : 'Discover Movies'}
      titleExtra={
        <MovieSortingSelect
          value={sorting.id}
          onChange={(sortBy) =>
            router.push({ query: { ...router.query, sortBy } }, undefined, {
              shallow: true,
            })
          }
        />
      }
      description={genre ? `${genre.name} movies list` : 'Discover movies list'}
      apiQuery={apiQueries.discover.discoverMovies({
        genreId,
        sortBy: sorting.id,
      })}
    />
  );
}

export const getServerSideProps = withGetServerSideError(async (ctx) => {
  const genreId = Number(ctx.query.genreId);
  const sorting = getSelectedSorting(ctx.query.sortBy);

  const queryClient = createQueryClient();
  await Promise.all([
    queryClient.fetchQuery(apiQueries.common.configuration()),
    queryClient.fetchQuery(apiQueries.genres.movieGenres()),
    queryClient.fetchInfiniteQuery(
      apiQueries.discover.discoverMovies({
        genreId,
        sortBy: sorting.id,
      }),
    ),
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

export default DiscoverMoviesView;
