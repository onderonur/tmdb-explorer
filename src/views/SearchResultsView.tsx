import { Tabs, Tab, Box } from '@mui/material';
import SearchResultsHeader from '@/search/SearchResultsHeader';
import MovieCard from '@/movies/MovieCard';
import PersonCard from '@/people/PersonCard';
import { useRouter } from 'next/router';
import BaseSeo from '@/seo/BaseSeo';
import { dehydrate, useInfiniteQuery } from 'react-query';
import { getAllPageResults } from '@/common/CommonUtils';
import { MediaType } from '@/common/CommonEnums';
import { searchQueries } from '@/search/searchQueries';
import InfiniteGridList from '@/common/InfiniteGridList';
import LoadingIndicator from '@/common/LoadingIndicator';
import { withGetServerSideError } from '@/error-handling/withGetServerSideError';
import { createQueryClient } from '@/http-client/queryClient';
import { commonQueries } from '@/api-configuration/apiConfigurationQueries';
import { ParsedUrlQuery } from 'querystring';

function getSearchQuery(query: ParsedUrlQuery) {
  const { searchQuery } = query;
  return typeof searchQuery === 'string' ? searchQuery : '';
}

function SearchResultsView() {
  const router = useRouter();
  const searchQuery = getSearchQuery(router.query);

  const {
    data: movies,
    isFetching: isFetchingMovies,
    hasNextPage: hasNextPageMovies,
    fetchNextPage: fetchNextPageMovies,
    isFetched: isFetchedMovies,
  } = useInfiniteQuery(searchQueries.searchMovies(searchQuery));

  const {
    data: people,
    isFetching: isFetchingPeople,
    hasNextPage: hasNextPagePeople,
    fetchNextPage: fetchNextPagePeople,
    isFetched: isFetchedPeople,
  } = useInfiniteQuery(searchQueries.searchPeople(searchQuery));

  function handleTabChange(
    event: React.ChangeEvent<unknown>,
    mediaType: string,
  ) {
    router.replace({ query: { ...router.query, mediaType } }, undefined, {
      shallow: true,
    });
  }

  const allMovies = getAllPageResults(movies);
  const allPeople = getAllPageResults(people);

  let { mediaType } = router.query;
  if (!mediaType && isFetchedMovies && isFetchedPeople) {
    if (allMovies.length) {
      mediaType = MediaType.MOVIE;
    } else if (allPeople.length) {
      mediaType = MediaType.PERSON;
    }
  }

  return (
    <>
      <BaseSeo
        title="Search"
        description="Search movies and people by their name."
      />
      <SearchResultsHeader
        searchQuery={typeof searchQuery === 'string' ? searchQuery : ''}
      />
      <LoadingIndicator loading={!mediaType}>
        <Tabs value={mediaType} onChange={handleTabChange}>
          {!!allMovies.length && (
            <Tab value={MediaType.MOVIE} label={'Movies'} />
          )}
          {!!allPeople.length && (
            <Tab value={MediaType.PERSON} label={'People'} />
          )}
        </Tabs>
      </LoadingIndicator>
      <Box marginTop={2}>
        {mediaType === MediaType.MOVIE && (
          <InfiniteGridList
            loading={isFetchingMovies}
            hasNextPage={!!hasNextPageMovies}
            onLoadMore={fetchNextPageMovies}
          >
            {allMovies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
          </InfiniteGridList>
        )}
        {mediaType === MediaType.PERSON && (
          <InfiniteGridList
            loading={isFetchingPeople}
            hasNextPage={!!hasNextPagePeople}
            onLoadMore={fetchNextPagePeople}
          >
            {allPeople.map((person) => {
              return <PersonCard key={person.id} person={person} />;
            })}
          </InfiniteGridList>
        )}
      </Box>
    </>
  );
}

export const getServerSideProps = withGetServerSideError(async (ctx) => {
  const searchQuery = getSearchQuery(ctx.query);
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.fetchQuery(commonQueries.configuration()),
    queryClient.fetchInfiniteQuery(searchQueries.searchMovies(searchQuery)),
    queryClient.fetchInfiniteQuery(searchQueries.searchPeople(searchQuery)),
  ]);

  return {
    props: {
      // There is an issue when we use infinite query while SSR.
      // So, we use this workaround.
      // https://github.com/tannerlinsley/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
});

export default SearchResultsView;
