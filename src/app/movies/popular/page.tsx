import PageTitle from '@/common/PageTitle';
import FeaturedMovie from '@/movies/featured-movie';
import { getPopularMovies } from '@/movies/movie-fetchers';
import { Box, Container } from '@mui/material';
import MovieInfiniteGridList from '@/movies/movie-infinite-grid-list';

// TODO: Page naming'ine Next'ten falan bak. Hatta genel naming'lere bak root page, layout vs vs.
export default async function PopularMoviesPage() {
  const firstPage = await getPopularMovies(1);

  const [featuredMovie] = firstPage.results;

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <FeaturedMovie movie={featuredMovie} />
      <Container maxWidth={false}>
        <PageTitle title="Popular Movies" />
        <MovieInfiniteGridList
          pageKeyTemplate={`/movies/popular/api?${infiniteListSearchParams.toString()}`}
          firstPage={firstPage}
          skipFirstMovie
        />
      </Container>
    </Box>
  );
}
