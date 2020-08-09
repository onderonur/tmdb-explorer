import React from 'react';
import { Tabs, Tab, Box } from '@material-ui/core';
import SearchResultsHeader from './components/SearchResultsHeader';
import InfiniteGridList from '@/components/InfiniteGridList';
import MovieCard from '@/components/MovieCard';
import PersonCard from '@/components/PersonCard';
import useFetchInfinite from '@/hooks/useFetchInfinite';
import { useRouter } from 'next/router';
import BaseSeo from '@components/BaseSeo';

function renderMovie(movie) {
  return <MovieCard movie={movie} />;
}

function renderPerson(person) {
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
    totalCount: totalMovieCount,
  } = useFetchInfinite('/search/movie', params);
  const {
    data: people,
    isLoading: isLoadingPeople,
    hasNextPage: hasNextPagePeople,
    loadMore: loadMorePeople,
    totalCount: totalPersonCount,
  } = useFetchInfinite('/search/person', params);

  function handleChange(event, newValue) {
    router.push(
      { pathname: '/search', query: { ...router.query, searchType: newValue } },
      undefined,
      // To prevent page to be replaced and change route
      // without losing current state.
      // https://nextjs.org/docs/routing/shallow-routing
      { shallow: true },
    );
  }

  const totalResults = {
    movie: totalMovieCount,
    person: totalPersonCount,
  };

  return (
    <>
      <BaseSeo
        title="Search"
        description="Search movies and people by their name."
      />
      <Tabs value={searchType} onChange={handleChange}>
        <Tab value="movie" label={`Movies (${totalMovieCount})`} />
        <Tab value="person" label={`People (${totalPersonCount})`} />
      </Tabs>
      <Box marginTop={2}>
        <SearchResultsHeader
          query={query}
          totalResults={totalResults[searchType]}
        />
        {searchType === 'movie' && (
          <InfiniteGridList
            items={movies}
            loading={isLoadingMovies}
            hasNextPage={hasNextPageMovies}
            onLoadMore={loadMoreMovies}
            renderItem={renderMovie}
          />
        )}
        {searchType === 'person' && (
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
