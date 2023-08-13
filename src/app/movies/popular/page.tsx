import { FIRST_PAGE } from '@/common/common-constants';
import PageTitle from '@/common/page-title';
import Padder from '@/common/padder';
import FeaturedMovie from '@/movies/featured-movie';
import { getPopularMovies } from '@/movies/movie-fetchers';
import MovieInfiniteGridList from '@/movies/movie-infinite-grid-list';
import { Divider, Stack } from '@mui/material';

export default async function PopularMoviesPage() {
  const firstPage = await getPopularMovies(FIRST_PAGE);

  const [featuredMovie] = firstPage.results;

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <>
      <FeaturedMovie movie={featuredMovie} />
      <Padder>
        <Stack spacing={2}>
          <Divider />
          <PageTitle title="Popular Movies" />
          <MovieInfiniteGridList
            pageKeyTemplate={`/movies/popular/api?${infiniteListSearchParams}`}
            firstPage={firstPage}
            skipFirstMovie
          />
        </Stack>
      </Padder>
    </>
  );
}
