import { AppHeaderOffset } from '@/core/layouts/app-header';
import type { Maybe } from '@/core/shared/shared.types';
import { FIRST_PAGE } from '@/core/shared/shared.utils';
import { Padder } from '@/core/ui/components/padder';
import { PageTitle } from '@/core/ui/components/page-title';
import { MediaType } from '@/features/media/media.utils';
import { MovieInfiniteGridList } from '@/features/movies/components/movie-infinite-grid-list';
import { PeopleInfiniteGridList } from '@/features/people/components/people-infinite-list';
import { SearchResultsTabs } from '@/features/search/components/search-results-tabs';
import { searchMovies, searchPeople } from '@/features/search/search.data';
import { Box } from '@mui/material';
import { notFound } from 'next/navigation';

type SearchPageProps = {
  searchParams: {
    query?: string;
    type?: string;
  };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = searchParams;
  let type = searchParams.type as Maybe<MediaType>;

  if (!query) notFound();

  const [moviesFirstPage, peopleFirstPage] = await Promise.all([
    searchMovies(query, FIRST_PAGE),
    searchPeople(query, FIRST_PAGE),
  ]);

  if (!type) {
    if (moviesFirstPage.total_results) {
      type = MediaType.MOVIE;
    } else if (peopleFirstPage.total_results) {
      type = MediaType.PERSON;
    }
  }

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');
  infiniteListSearchParams.set('query', query);

  return (
    <AppHeaderOffset>
      <main>
        <Padder>
          <PageTitle title={`Search Results for: ${query}`} />
          <SearchResultsTabs
            value={type}
            isMoviesTabVisible={!!moviesFirstPage.total_pages}
            isPeopleTabVisible={!!peopleFirstPage.total_pages}
          />
          <Box sx={{ marginTop: 2 }}>
            {type === MediaType.MOVIE && (
              <MovieInfiniteGridList
                pageKeyTemplate={`/api/search/movies?${infiniteListSearchParams.toString()}`}
                firstPage={moviesFirstPage}
              />
            )}
            {type === MediaType.PERSON && (
              <PeopleInfiniteGridList
                pageKeyTemplate={`/api/search/people?${infiniteListSearchParams.toString()}`}
                firstPage={peopleFirstPage}
              />
            )}
          </Box>
        </Padder>
      </main>
    </AppHeaderOffset>
  );
}
