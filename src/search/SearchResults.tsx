import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import SearchResultsHeader from '@/search/SearchResultsHeader';
import InfiniteGridList from '@/common/InfiniteGridList';
import MovieCard from '@/movies-listing/MovieCard';
import PersonCard from '@/people-listing/PersonCard';
import { useRouter } from 'next/router';
import BaseSeo from '@/seo/BaseSeo';
import { Movie, Person } from '@/common/CommonTypes';
import { SearchType } from '@/search/SearchEnums';
import { useInfiniteQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';
import { getAllPageResults, getLastOfArray } from '@/common/CommonUtils';

function renderMovie(movie: Movie) {
  return <MovieCard movie={movie} />;
}

function renderPerson(person: Person) {
  return <PersonCard person={person} />;
}

function SearchResults() {
  const router = useRouter();
  const { searchType, query } = router.query;

  const {
    data: movies,
    isFetching: isFetchingMovies,
    hasNextPage: hasNextPageMovies,
    fetchNextPage: fetchNextPageMovies,
  } = useInfiniteQuery(
    apiQueries.search.searchMovies(typeof query === 'string' ? query : ''),
  );

  const {
    data: people,
    isFetching: isFetchingPeople,
    hasNextPage: hasNextPagePeople,
    fetchNextPage: fetchNextPagePeople,
  } = useInfiniteQuery(
    apiQueries.search.searchPeople(typeof query === 'string' ? query : ''),
  );

  function handleChange(event: React.ChangeEvent<unknown>, newValue: string) {
    router.push(
      { pathname: '/search', query: { ...router.query, searchType: newValue } },
      undefined,
      // To prevent page to be replaced and change route
      // without losing current state.
      // https://nextjs.org/docs/routing/shallow-routing
      { shallow: true },
    );
  }

  const totalCounts: Record<SearchType, number> = {
    movies: getLastOfArray(movies?.pages ?? [])?.total_results ?? 0,
    people: getLastOfArray(people?.pages ?? [])?.total_results ?? 0,
  };

  return (
    <>
      <BaseSeo
        title="Search"
        description="Search movies and people by their name."
      />
      <Tabs value={searchType} onChange={handleChange}>
        <Tab
          value={SearchType.MOVIES}
          label={`Movies (${totalCounts.movies})`}
        />
        <Tab
          value={SearchType.PEOPLE}
          label={`People (${totalCounts.people})`}
        />
      </Tabs>
      <Box marginTop={2}>
        <SearchResultsHeader
          query={typeof query === 'string' ? query : ''}
          totalResults={
            typeof searchType === 'string'
              ? totalCounts[searchType as SearchType]
              : 0
          }
        />
        {searchType === SearchType.MOVIES && (
          <InfiniteGridList
            items={getAllPageResults(movies)}
            loading={isFetchingMovies}
            hasNextPage={!!hasNextPageMovies}
            onLoadMore={fetchNextPageMovies}
            renderItem={renderMovie}
          />
        )}
        {searchType === SearchType.PEOPLE && (
          <InfiniteGridList
            items={getAllPageResults(people)}
            loading={isFetchingPeople}
            hasNextPage={!!hasNextPagePeople}
            onLoadMore={fetchNextPagePeople}
            renderItem={renderPerson}
          />
        )}
      </Box>
    </>
  );
}

export default SearchResults;
