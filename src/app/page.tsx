import { getMetadata } from '@/core/seo/seo.utils';
import { FIRST_PAGE } from '@/core/shared/shared.utils';
import { FeaturedListSection } from '@/features/home/components/featured-list-section';
import { MediaType } from '@/features/media/media.utils';
import { FeaturedMovie } from '@/features/movies/components/featured-movie';
import {
  getDiscoverMovies,
  getMovieGenres,
  getPopularMovies,
  getTopRatedMovies,
} from '@/features/movies/movies.data';
import { getPopularPeople } from '@/features/people/people.data';
import { Divider, Stack } from '@mui/material';

export const metadata = getMetadata({
  title: 'Home',
  pathname: '/',
});

export default async function HomePage() {
  const [movieGenres, popularMovies] = await Promise.all([
    getMovieGenres(),
    getPopularMovies(FIRST_PAGE),
  ]);

  const [featuredMovie] = popularMovies.results;

  return (
    <main>
      <FeaturedMovie movie={featuredMovie} />

      <Stack spacing={2}>
        <Divider />

        <FeaturedListSection
          title="Popular Movies"
          seeAllHref="/movies/popular"
          mediaType={MediaType.MOVIE}
          promise={getPopularMovies(FIRST_PAGE)}
          // Since we show the first popular movie as the featured movie,
          // we don't show it here in the list again.
          skipFirstItem
        />

        <FeaturedListSection
          title="Top Rated Movies"
          seeAllHref="/movies/top-rated"
          mediaType={MediaType.MOVIE}
          promise={getTopRatedMovies(FIRST_PAGE)}
        />

        <FeaturedListSection
          title="Popular People"
          seeAllHref="/people/popular"
          mediaType={MediaType.PERSON}
          promise={getPopularPeople(FIRST_PAGE)}
        />

        {movieGenres.slice(0, 5).map((genre) => {
          const searchParams = new URLSearchParams();
          searchParams.set('genreId', genre.id.toString());

          return (
            <FeaturedListSection
              key={genre.id}
              title={`${genre.name} Movies`}
              seeAllHref={`/movies/discover?${searchParams.toString()}`}
              mediaType={MediaType.MOVIE}
              promise={getDiscoverMovies(FIRST_PAGE, genre.id)}
            />
          );
        })}
      </Stack>
    </main>
  );
}
