import { createUrl } from '@/core/routing/routing.utils';
import { getMetadata } from '@/core/seo/seo.utils';
import { FIRST_PAGE } from '@/core/shared/shared.utils';
import { Padder } from '@/core/ui/components/padder';
import { PageTitle } from '@/core/ui/components/page-title';
import { FeaturedMovie } from '@/features/movies/components/featured-movie';
import { MovieInfiniteGridList } from '@/features/movies/components/movie-infinite-grid-list';
import { MovieSortingSelect } from '@/features/movies/components/movie-sorting-select';
import {
  getDiscoverMovies,
  getMovieGenre,
} from '@/features/movies/movies.data';
import { Divider, Stack } from '@mui/material';
import type { Metadata } from 'next';
import { Suspense } from 'react';

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

  if (!genreId) return defaultMetadata;

  const genre = await getMovieGenre(genreId);

  if (!genre) return defaultMetadata;

  return getMetadata({
    title: `${genre.name} Movies`,
    description: `Discover ${genre.name} movies!`,
    pathname: createUrl('/movies/discover', new URLSearchParams(searchParams)),
  });
}

export default async function DiscoverMoviesPage({
  searchParams,
}: DiscoverMoviesPageProps) {
  const genreId = Number(searchParams.genreId);

  const [genre, firstPage] = await Promise.all([
    getMovieGenre(genreId),
    getDiscoverMovies(FIRST_PAGE, genreId, searchParams.sortBy),
  ]);

  const [featuredMovie] = firstPage.results;

  const infiniteListSearchParams = new URLSearchParams(searchParams);
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <main>
      <FeaturedMovie movie={featuredMovie} />
      <Stack spacing={2}>
        <Divider />
        <Padder>
          <PageTitle
            title={genre ? `${genre.name} Movies` : 'Discover Movies'}
            extra={
              // Since we use `useSearchParams` in `<MovieSortingSelect>`, we wrap it with `<Suspense>`
              <Suspense>
                <MovieSortingSelect />
              </Suspense>
            }
          />
          <MovieInfiniteGridList
            pageKeyTemplate={`/api/movies/discover?${infiniteListSearchParams.toString()}`}
            firstPage={firstPage}
            skipFirstMovie
          />
        </Padder>
      </Stack>
    </main>
  );
}
