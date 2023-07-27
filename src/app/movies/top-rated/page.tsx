import { FIRST_PAGE } from '@/common/common-constants';
import PageTitle from '@/common/PageTitle';
import Padder from '@/common/padder';
import FeaturedMovie from '@/movies/featured-movie';
import { getTopRatedMovies } from '@/movies/movie-fetchers';
import MovieInfiniteGridList from '@/movies/movie-infinite-grid-list';
import { Divider, Stack } from '@mui/material';

// TODO: Page naming'ine Next'ten falan bak. Hatta genel naming'lere bak root page, layout vs vs.
export default async function TopRatedMoviesPage() {
  const firstPage = await getTopRatedMovies(FIRST_PAGE);

  const [featuredMovie] = firstPage.results;

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <>
      <FeaturedMovie movie={featuredMovie} />
      <Padder>
        <Stack spacing={2}>
          <Divider />
          <PageTitle title="Top Rated Movies" />
          <MovieInfiniteGridList
            pageKeyTemplate={`/movies/top-rated/api?${infiniteListSearchParams.toString()}`}
            firstPage={firstPage}
            skipFirstMovie
          />
        </Stack>
      </Padder>
    </>
  );
}
