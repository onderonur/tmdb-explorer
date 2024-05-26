import { FIRST_PAGE } from '@/common/common-constants';
import { Padder } from '@/common/padder';
import { PageTitle } from '@/common/page-title';
import { FeaturedMovie } from '@/movies/featured-movie';
import { getPopularMovies } from '@/movies/movie-fetchers';
import { MovieInfiniteGridList } from '@/movies/movie-infinite-grid-list';
import { getMetadata } from '@/seo/seo-utils';
import { Divider, Stack } from '@mui/material';

export const metadata = getMetadata({
  title: 'Popular Movies',
  description: 'TODO',
  pathname: '/movies/popular',
});

export default async function PopularMoviesPage() {
  const firstPage = await getPopularMovies(FIRST_PAGE);

  const [featuredMovie] = firstPage.results;

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <>
      <FeaturedMovie movie={featuredMovie} />
      <Stack spacing={2}>
        <Divider />
        <Padder>
          <PageTitle title="Popular Movies" />
          <MovieInfiniteGridList
            pageKeyTemplate={`/movies/popular/api?${infiniteListSearchParams.toString()}`}
            firstPage={firstPage}
            skipFirstMovie
          />
        </Padder>
      </Stack>
    </>
  );
}
