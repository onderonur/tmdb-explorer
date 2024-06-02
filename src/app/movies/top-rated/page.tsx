import { FIRST_PAGE } from '@/core/shared/shared.utils';
import { Padder } from '@/core/ui/components/padder';
import { PageTitle } from '@/core/ui/components/page-title';
import { FeaturedMovie } from '@/features/movies/components/featured-movie';
import { MovieInfiniteGridList } from '@/features/movies/components/movie-infinite-grid-list';
import { getTopRatedMovies } from '@/features/movies/movies.data';
import { Divider, Stack } from '@mui/material';

export default async function TopRatedMoviesPage() {
  const firstPage = await getTopRatedMovies(FIRST_PAGE);

  const [featuredMovie] = firstPage.results;

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <main>
      <FeaturedMovie movie={featuredMovie} />
      <Stack spacing={2}>
        <Divider />
        <Padder>
          <PageTitle title="Top Rated Movies" />
          <MovieInfiniteGridList
            pageKeyTemplate={`/api/movies/top-rated?${infiniteListSearchParams.toString()}`}
            firstPage={firstPage}
            skipFirstMovie
          />
        </Padder>
      </Stack>
    </main>
  );
}
