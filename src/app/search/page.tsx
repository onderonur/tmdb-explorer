import type { Maybe } from '@/common/common-types';
import PageTitle from '@/common/page-title';
import Padder from '@/common/padder';
import { SearchResultType } from '@/medias/media-enums';
import MovieInfiniteGridList from '@/movies/movie-infinite-grid-list';
import PeopleInfiniteGridList from '@/people/people-infinite-list';
import { searchMovies, searchPeople } from '@/search/search-fetchers';
import SearchResultsTabs from '@/search/search-results-tabs';
import { Box } from '@mui/material';
import { notFound } from 'next/navigation';
import PageRoot from '@/layout/page-root';

type SearchPageProps = {
  searchParams: {
    query?: string;
    type?: string;
  };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = searchParams;
  let type = searchParams.type as Maybe<SearchResultType>;

  if (!query) {
    notFound();
  }

  const [moviesFirstPage, peopleFirstPage] = await Promise.all([
    searchMovies({
      query,
      page: 1,
    }),
    searchPeople({
      query,
      page: 1,
    }),
  ]);

  if (!type) {
    if (moviesFirstPage.total_results) {
      type = SearchResultType.MOVIE;
    } else if (peopleFirstPage.total_results) {
      type = SearchResultType.PERSON;
    }
  }

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');
  infiniteListSearchParams.set('query', query);

  return (
    <PageRoot hasHeaderGutter>
      <Padder>
        {/* TODO: Mobile'da paddingTop lazım buna */}
        <PageTitle title={`Search Results for: ${query}`} />
        <SearchResultsTabs
          value={type}
          isMoviesTabVisible={!!moviesFirstPage.total_pages}
          isPeopleTabVisible={!!peopleFirstPage.total_pages}
        />
        <Box sx={{ marginTop: 2 }}>
          {type === SearchResultType.MOVIE && (
            <MovieInfiniteGridList
              pageKeyTemplate={`/search/movies/api?${infiniteListSearchParams.toString()}`}
              firstPage={moviesFirstPage}
            />
          )}
          {type === SearchResultType.PERSON && (
            <PeopleInfiniteGridList
              pageKeyTemplate={`/search/people/api?${infiniteListSearchParams.toString()}`}
              firstPage={peopleFirstPage}
            />
          )}
        </Box>
      </Padder>
    </PageRoot>
  );
}
