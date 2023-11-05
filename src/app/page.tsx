import MovieCard from '@/movies/movie-card';
import FeaturedMovie from '@/movies/featured-movie';
import {
  getDiscoverMovies,
  getMovieGenres,
  getPopularMovies,
  getTopRatedMovies,
} from '@/movies/movie-fetchers';
import { Box, Divider, Stack } from '@mui/material';
import Padder from '@/common/padder';
import { FIRST_PAGE } from '@/common/common-constants';
import SectionTitle from '@/common/section-title';
import SingleRowGridList from '@/common/single-row-grid-list';
import SeeAllLink from '@/common/see-all-link';
import { getPopularPeople } from '@/people/people-fetchers';
import PersonCard from '@/people/person-card';
import ChipLink from '@/common/chip-link';
import type { PersonListItem } from '@/people/people-types';
import type { Genre, MovieListItem } from '@/movies/movie-types';
import { getMetadata } from '@/seo/seo-utils';

enum RootPageSectionType {
  MOVIES,
  PEOPLE,
  GENRES,
}

export const metadata = getMetadata({
  title: 'Home',
  pathname: '/',
});

export default async function RootPage() {
  const [popularMovies, topratedMovies, popularPeople, movieGenres] =
    await Promise.all([
      getPopularMovies(FIRST_PAGE),
      getTopRatedMovies(FIRST_PAGE),
      getPopularPeople(FIRST_PAGE),
      getMovieGenres(),
    ]);

  const [featuredMovie, ...restPopularMovies] = popularMovies.results;

  const genreMoviePromises = movieGenres
    .slice(0, 5)
    .map((genre) => getDiscoverMovies({ page: FIRST_PAGE, genreId: genre.id }));

  const genreMovies = await Promise.all(genreMoviePromises);

  const sections: Array<{
    title: string;
    seeAllHref?: string;
    type: RootPageSectionType;
    items: MovieListItem[] | PersonListItem[] | Genre[];
  }> = [
    {
      title: 'Popular Movies',
      type: RootPageSectionType.MOVIES,
      items: restPopularMovies,
      seeAllHref: '/movies/popular',
    },
    {
      title: 'Top Rated Movies',
      type: RootPageSectionType.MOVIES,
      items: topratedMovies.results,
      seeAllHref: '/movies/top-rated',
    },
    {
      title: 'Popular People',
      type: RootPageSectionType.PEOPLE,
      items: popularPeople.results,
      seeAllHref: '/people/popular',
    },
    {
      title: 'Movie Genres',
      type: RootPageSectionType.GENRES,
      items: movieGenres,
    },
    ...genreMovies.map((movies, i) => {
      const genre = movieGenres[i];

      return {
        title: `${genre.name} Movies`,
        type: RootPageSectionType.MOVIES,
        seeAllHref: `/movies/discover?genreId=${genre.id}`,
        items: movies.results,
      };
    }),
  ];

  return (
    <>
      <FeaturedMovie movie={featuredMovie} />
      <Stack spacing={2}>
        <Divider />
        {sections.map((section) => {
          return (
            <>
              <section key={section.title}>
                <Padder>
                  <SectionTitle title={section.title} />
                </Padder>
                {section.type === RootPageSectionType.GENRES ? (
                  <Padder>
                    <Box
                      component="ul"
                      sx={{
                        padding: 0,
                        listStyle: 'none',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                      }}
                    >
                      {section.items.map((item) => {
                        const genre = item as Genre;

                        return (
                          <Box key={genre.id} component="li">
                            <ChipLink
                              href={`/movies/discover?genreId=${genre.id}`}
                              label={genre.name}
                              variant="outlined"
                            />
                          </Box>
                        );
                      })}
                    </Box>
                  </Padder>
                ) : (
                  <Padder>
                    <SingleRowGridList
                      itemCount={{ xs: 2, sm: 4, md: 5, lg: 6, xl: 7 }}
                    >
                      {section.items.slice(0, 7).map((item) => {
                        return (
                          <li key={item.id}>
                            {section.type === RootPageSectionType.MOVIES ? (
                              <MovieCard movie={item as MovieListItem} />
                            ) : (
                              section.type === RootPageSectionType.PEOPLE && (
                                <PersonCard person={item as PersonListItem} />
                              )
                            )}
                          </li>
                        );
                      })}
                    </SingleRowGridList>
                  </Padder>
                )}
                {section.seeAllHref && (
                  <SeeAllLink isLinkVisible href={section.seeAllHref} />
                )}
              </section>
              {!section.seeAllHref && <Divider />}
            </>
          );
        })}
      </Stack>
    </>
  );
}
