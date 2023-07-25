import BaseGridList from '@/common/BaseGridList';
import MovieCard from '@/movies/movie-card';
import FeaturedMovie from '@/movies/featured-movie';
import { getPopularMovies } from '@/movies/movie-fetchers';
import { Box, Container } from '@mui/material';

export default async function RootPage() {
  const moviesPage = await getPopularMovies(1);

  const [featuredMovie, ...restMovies] = moviesPage.results;

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <FeaturedMovie movie={featuredMovie} />
      <Container maxWidth={false}>
        <BaseGridList>
          {restMovies.map((movie) => {
            return (
              <li key={movie.id}>
                <MovieCard movie={movie} />
              </li>
            );
          })}
        </BaseGridList>
      </Container>
    </Box>
  );
}
