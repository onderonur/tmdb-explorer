import PageTitle from '@/common/page-title';
import MovieSortingSelect from '@/movies/movie-sorting-select';
import FeaturedMovie from '@/movies/featured-movie';
import { getDiscoverMovies, getMovieGenre } from '@/movies/movie-fetchers';
import MovieInfiniteGridList from '@/movies/movie-infinite-grid-list';
import { Divider, Stack } from '@mui/material';
import Padder from '@/common/padder';
import { FIRST_PAGE } from '@/common/common-constants';
import type { Metadata } from 'next';
import { getMetadata } from '@/seo/seo-utils';

// TODO: Hem Next'in hem SWR'nin cache mantığını bi anla.

type DiscoverMoviesPageProps = {
  searchParams: {
    genreId?: string;
    sortBy?: string;
  };
};

export async function generateMetadata({
  searchParams,
}: DiscoverMoviesPageProps): Promise<Metadata> {
  const defaultMetadata = getMetadata({
    title: 'Discover Movies',
  });

  const genreId = Number(searchParams.genreId);

  if (!genreId) {
    return defaultMetadata;
  }

  const genre = await getMovieGenre(genreId);

  if (!genre) {
    return defaultMetadata;
  }

  let pathname = '/movies/discover';

  const searchQuery = new URLSearchParams(searchParams).toString();

  if (searchQuery) {
    pathname = `${pathname}?${searchQuery}`;
  }

  return getMetadata({
    title: `${genre.name} Movies`,
    description: `Discover ${genre.name} movies!`,
    pathname,
  });
}

export default async function DiscoverMoviesPage({
  searchParams,
}: DiscoverMoviesPageProps) {
  const genreId = Number(searchParams.genreId);

  const [genre, firstPage] = await Promise.all([
    getMovieGenre(genreId),
    getDiscoverMovies({
      page: FIRST_PAGE,
      genreId,
      sortBy: searchParams.sortBy,
    }),
  ]);

  const [featuredMovie] = firstPage.results;

  const infiniteListSearchParams = new URLSearchParams(searchParams);
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <>
      <FeaturedMovie movie={featuredMovie} />
      <Stack spacing={2}>
        <Divider />
        <Padder>
          <PageTitle
            title={genre ? `${genre.name} Movies` : 'Discover Movies'}
            extra={<MovieSortingSelect />}
          />
          <MovieInfiniteGridList
            pageKeyTemplate={`/movies/discover/api?${infiniteListSearchParams.toString()}`}
            firstPage={firstPage}
            skipFirstMovie
          />
        </Padder>
      </Stack>
    </>
  );
}
