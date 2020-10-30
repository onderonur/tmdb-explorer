import React from 'react';
import { Tabs, Tab, Box } from '@material-ui/core';
import SearchResultsHeader from '../../modules/search-results/SearchResultsHeader';
import InfiniteGridList from '@/modules/shared/InfiniteGridList';
import MovieCard from '@/modules/movies-listing/MovieCard';
import PersonCard from '@/modules/people-listing/PersonCard';
import useFetchInfinite from '@/modules/shared/useFetchInfinite';
import { useRouter } from 'next/router';
import BaseSeo from '@/modules/seo/BaseSeo';
import { Movie, Person } from '@/modules/shared/SharedTypes';
import { SearchType } from '@/modules/searcher/SearcherEnums';

function renderMovie(movie: Movie) {
  return <MovieCard movie={movie} />;
}

function renderPerson(person: Person) {
  return <PersonCard person={person} />;
}

function SearchResults() {
  const router = useRouter();
  const { searchType, query } = router.query;
  const params = { query };

  const {
    data: movies,
    isLoading: isLoadingMovies,
    hasNextPage: hasNextPageMovies,
    loadMore: loadMoreMovies,
    totalCount: totalMoviesCount,
  } = useFetchInfinite<Movie>('/search/movie', params);
  const {
    data: people,
    isLoading: isLoadingPeople,
    hasNextPage: hasNextPagePeople,
    loadMore: loadMorePeople,
    totalCount: totalPeopleCount,
  } = useFetchInfinite<Person>('/search/person', params);

  function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
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
    movies: totalMoviesCount,
    people: totalPeopleCount,
  };

  return (
    <>
      <BaseSeo
        title="Search"
        description="Search movies and people by their name."
      />
      <Tabs value={searchType} onChange={handleChange}>
        <Tab value={SearchType.MOVIES} label={`Movies (${totalMoviesCount})`} />
        <Tab value={SearchType.PEOPLE} label={`People (${totalPeopleCount})`} />
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
            items={movies}
            loading={isLoadingMovies}
            hasNextPage={hasNextPageMovies}
            onLoadMore={loadMoreMovies}
            renderItem={renderMovie}
          />
        )}
        {searchType === SearchType.PEOPLE && (
          <InfiniteGridList
            items={people}
            loading={isLoadingPeople}
            hasNextPage={hasNextPagePeople}
            onLoadMore={loadMorePeople}
            renderItem={renderPerson}
          />
        )}
      </Box>
    </>
  );
}

export default SearchResults;
