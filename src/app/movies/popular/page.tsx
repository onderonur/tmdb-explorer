import { FIRST_PAGE } from '@/common/CommonUtils';
import PageTitle from '@/common/PageTitle';
import Padder from '@/common/padder';
import FeaturedMovie from '@/movies/featured-movie';
import { getPopularMovies } from '@/movies/movie-fetchers';
import MovieInfiniteGridList from '@/movies/movie-infinite-grid-list';
import { Divider, Stack } from '@mui/material';

// TODO: Page naming'ine Next'ten falan bak. Hatta genel naming'lere bak root page, layout vs vs.
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
            pageKeyTemplate={`/movies/popular/api?${infiniteListSearchParams.toString()}`}
            firstPage={firstPage}
            skipFirstMovie
          />
        </Stack>
      </Padder>
    </>
  );
}
