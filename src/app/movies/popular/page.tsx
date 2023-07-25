import PageTitle from '@/common/PageTitle';
import FeaturedMovie from '@/movies/featured-movie';
import { getPopularMovies } from '@/movies/movie-fetchers';
import MovieInfiniteGridList from '@/movies/movie-infinite-grid-list';
import PageRoot from '@/common/page-root';

// TODO: Page naming'ine Next'ten falan bak. Hatta genel naming'lere bak root page, layout vs vs.
export default async function PopularMoviesPage() {
  const firstPage = await getPopularMovies(1);

  const [featuredMovie] = firstPage.results;

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <PageRoot
      hero={<FeaturedMovie movie={featuredMovie} />}
      sx={{ display: 'grid', gap: 2 }}
    >
      <PageTitle title="Popular Movies" />
      <MovieInfiniteGridList
        pageKeyTemplate={`/movies/popular/api?${infiniteListSearchParams.toString()}`}
        firstPage={firstPage}
        skipFirstMovie
      />
    </PageRoot>
  );
}
