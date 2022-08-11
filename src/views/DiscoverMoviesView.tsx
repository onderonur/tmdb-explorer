import MoviesListingView from './MoviesListingView';
import { useRouter } from 'next/router';
import { dehydrate, useQuery } from '@tanstack/react-query';
import { createQueryClient } from '@/http-client/queryClient';
import { withGetServerSideError } from '@/error-handling/withGetServerSideError';
import MovieSortingSelect, {
  getSelectedSorting,
} from '@/movies/MovieSortingSelect';
import { movieQueries } from '@/movies/movieQueries';
import { commonQueries } from '@/api-configuration/apiConfigurationQueries';
import { ParsedUrlQuery } from 'querystring';

function getFilterValues(query: ParsedUrlQuery) {
  const sorting = getSelectedSorting(query.sortBy);
  const genreId = Number(query.genreId) || undefined;
  return { sorting, genreId };
}

function DiscoverMoviesView() {
  const router = useRouter();

  const { data: genres } = useQuery(movieQueries.genres());
  const { genreId, sorting } = getFilterValues(router.query);
  const genre = genres?.find((genre) => genre.id === genreId);

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
      apiQuery={movieQueries.discoverMovies({
        genreId,
        sortBy: sorting.id,
      })}
    />
  );
}

export const getServerSideProps = withGetServerSideError(async (ctx) => {
  const { genreId, sorting } = getFilterValues(ctx.query);

  const queryClient = createQueryClient();
  await Promise.all([
    queryClient.fetchQuery(commonQueries.configuration()),
    queryClient.fetchQuery(movieQueries.genres()),
    queryClient.fetchInfiniteQuery(
      movieQueries.discoverMovies({
        genreId,
        sortBy: sorting.id,
      }),
    ),
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

export default DiscoverMoviesView;
