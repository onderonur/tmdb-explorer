import BaseGridList from '@/common/BaseGridList';
import MovieCard from '@/movies/movie-card';
import FeaturedMovie from '@/movies/featured-movie';
import { getPopularMovies } from '@/movies/movie-fetchers';
import { Divider, Stack } from '@mui/material';
import Padder from '@/common/padder';
import { FIRST_PAGE } from '@/common/CommonUtils';

export default async function RootPage() {
  const moviesPage = await getPopularMovies(FIRST_PAGE);

  const [featuredMovie, ...restMovies] = moviesPage.results;

  return (
    <>
      <FeaturedMovie movie={featuredMovie} />
      <Padder>
        <Stack spacing={2}>
          <Divider />
          <BaseGridList>
            {restMovies.map((movie) => {
              return (
                <li key={movie.id}>
                  <MovieCard movie={movie} />
                </li>
              );
            })}
          </BaseGridList>
        </Stack>
      </Padder>
    </>
  );
}
