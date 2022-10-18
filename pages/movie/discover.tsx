import MoviesListTemplate from '@/page-templates/MoviesListTemplate';
import { useRouter } from 'next/router';
import { dehydrate, useQuery } from '@tanstack/react-query';
import { createQueryClient } from '@/http-client/queryClient';
import MovieSortingSelect, {
  getSelectedSorting,
} from '@/movies/MovieSortingSelect';
import { moviesAPI } from '@/movies/moviesAPI';
import { apiConfigurationAPI } from '@/api-configuration/apiConfigurationAPI';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';

function getFilterValues(query: ParsedUrlQuery) {
  const sorting = getSelectedSorting(query.sortBy);
  const genreId = Number(query.genreId) || undefined;
  return { sorting, genreId };
}

function DiscoverMoviesPage() {
  const router = useRouter();

  const { data: genres } = useQuery(moviesAPI.genres());
  const { genreId, sorting } = getFilterValues(router.query);
  const genre = genres?.find((genre) => genre.id === genreId);

  return (
    <MoviesListTemplate
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
      apiQuery={moviesAPI.discoverMovies({
        genreId,
        sortBy: sorting.id,
      })}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { genreId, sorting } = getFilterValues(ctx.query);
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.fetchQuery(apiConfigurationAPI.configuration()),
    queryClient.fetchQuery(moviesAPI.genres()),
    queryClient.fetchInfiniteQuery(
      moviesAPI.discoverMovies({
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
};

export default DiscoverMoviesPage;
