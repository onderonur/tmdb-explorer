import PageTitle from '@/common/PageTitle';
import MovieSortingSelect from '@/movies/movie-sorting-select';
import FeaturedMovie from '@/movies/featured-movie';
import { getDiscoverMovies, getMovieGenres } from '@/movies/movie-fetchers';
import MovieInfiniteGridList from '@/movies/movie-infinite-grid-list';
import PageRoot from '@/common/page-root';

// TODO: Hem Next'in hem SWR'nin cache mantığını bi anla.

type DiscoverMoviesPageProps = {
  searchParams: {
    genreId?: string;
    sortBy?: string;
  };
};

export default async function DiscoverMoviesPage({
  searchParams,
}: DiscoverMoviesPageProps) {
  const genreId = Number(searchParams.genreId) || undefined;

  const [genres, firstPage] = await Promise.all([
    getMovieGenres(),
    getDiscoverMovies(1, {
      genreId,
      sortBy: searchParams.sortBy,
    }),
  ]);

  const genre = genres.find((genre) => genre.id === genreId);

  const [featuredMovie] = firstPage.results;

  const infiniteListSearchParams = new URLSearchParams(searchParams);
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <PageRoot
      hero={<FeaturedMovie movie={featuredMovie} />}
      sx={{ display: 'grid', gap: 2 }}
    >
      <PageTitle
        // TODO: Fix title
        title={genre ? `${genre.name} Movies` : 'Discover Movies'}
        extra={<MovieSortingSelect />}
      />
      <MovieInfiniteGridList
        pageKeyTemplate={`/movies/discover/api?${infiniteListSearchParams.toString()}`}
        firstPage={firstPage}
        skipFirstMovie
      />
    </PageRoot>
  );
}
