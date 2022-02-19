import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import SearchResultsHeader from '@/search/SearchResultsHeader';
import InfiniteGridList from '@/common/InfiniteGridList';
import MovieCard from '@/movies/MovieCard';
import PersonCard from '@/people/PersonCard';
import { useRouter } from 'next/router';
import BaseSeo from '@/seo/BaseSeo';
import { useInfiniteQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';
import {
  getAllPageResults,
  getLastOfArray,
  idExtractor,
} from '@/common/CommonUtils';
import { Movie } from '@/movies/MovieTypes';
import { Person } from '@/people/PeopleTypes';
import { MediaType } from '@/common/CommonEnums';

function renderMovie(movie: Movie) {
  return <MovieCard movie={movie} />;
}

function renderPerson(person: Person) {
  return <PersonCard person={person} />;
}

function SearchResultsView() {
  const router = useRouter();
  const { mediaType, query } = router.query;

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

  function handleChange(event: React.ChangeEvent<unknown>, mediaType: string) {
    router.push(
      { pathname: '/search', query: { ...router.query, mediaType } },
      undefined,
      // To prevent page to be replaced and change route
      // without losing current state.
      // https://nextjs.org/docs/routing/shallow-routing
      { shallow: true },
    );
  }

  const totalCounts: Record<MediaType, number> = {
    [MediaType.MOVIE]: getLastOfArray(movies?.pages ?? [])?.total_results ?? 0,
    [MediaType.PERSON]: getLastOfArray(people?.pages ?? [])?.total_results ?? 0,
  };

  return (
    <>
      <BaseSeo
        title="Search"
        description="Search movies and people by their name."
      />
      <Tabs value={mediaType} onChange={handleChange}>
        <Tab value={MediaType.MOVIE} label={`Movies (${totalCounts.movie})`} />
        <Tab
          value={MediaType.PERSON}
          label={`People (${totalCounts.person})`}
        />
      </Tabs>
      <Box marginTop={2}>
        <SearchResultsHeader
          query={typeof query === 'string' ? query : ''}
          totalResults={
            typeof mediaType === 'string'
              ? totalCounts[mediaType as MediaType]
              : 0
          }
        />
        {mediaType === MediaType.MOVIE && (
          <InfiniteGridList
            items={getAllPageResults(movies)}
            keyExtractor={idExtractor}
            loading={isFetchingMovies}
            hasNextPage={!!hasNextPageMovies}
            onLoadMore={fetchNextPageMovies}
            renderItem={renderMovie}
          />
        )}
        {mediaType === MediaType.PERSON && (
          <InfiniteGridList
            items={getAllPageResults(people)}
            keyExtractor={idExtractor}
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

export default SearchResultsView;
