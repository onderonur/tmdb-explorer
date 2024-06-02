import { getMetadata } from '@/core/seo/seo.utils';
import { FIRST_PAGE } from '@/core/shared/shared.utils';
import { Padder } from '@/core/ui/components/padder';
import { PageTitle } from '@/core/ui/components/page-title';
import { FeaturedMovie } from '@/features/movies/components/featured-movie';
import { MovieInfiniteGridList } from '@/features/movies/components/movie-infinite-grid-list';
import { getPopularMovies } from '@/features/movies/movies.data';
import { Divider, Stack } from '@mui/material';

export const metadata = getMetadata({
  title: 'Popular Movies',
  pathname: '/movies/popular',
});

export default async function PopularMoviesPage() {
  const firstPage = await getPopularMovies(FIRST_PAGE);

  const [featuredMovie] = firstPage.results;

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <main>
      <FeaturedMovie movie={featuredMovie} />
      <Stack spacing={2}>
        <Divider />
        <Padder>
          <PageTitle title="Popular Movies" />
          <MovieInfiniteGridList
            pageKeyTemplate={`/api/movies/popular?${infiniteListSearchParams.toString()}`}
            firstPage={firstPage}
            skipFirstMovie
          />
        </Padder>
      </Stack>
    </main>
  );
}
