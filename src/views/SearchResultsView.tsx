import { Tabs, Tab, Box } from '@mui/material';
import SearchResultsHeader from '@/search/SearchResultsHeader';
import MovieCard from '@/movies/MovieCard';
import PersonCard from '@/people/PersonCard';
import { useRouter } from 'next/router';
import BaseSeo from '@/seo/BaseSeo';
import { useInfiniteQuery } from 'react-query';
import { getAllPageResults } from '@/common/CommonUtils';
import { MediaType } from '@/common/CommonEnums';
import { searchQueries } from '@/search/searchQueries';
import InfiniteGridList from '@/common/InfiniteGridList';

function SearchResultsView() {
  const router = useRouter();
  const { mediaType, searchQuery } = router.query;

  const {
    data: movies,
    isFetching: isFetchingMovies,
    hasNextPage: hasNextPageMovies,
    fetchNextPage: fetchNextPageMovies,
  } = useInfiniteQuery(
    searchQueries.searchMovies(
      typeof searchQuery === 'string' ? searchQuery : '',
    ),
  );

  const {
    data: people,
    isFetching: isFetchingPeople,
    hasNextPage: hasNextPagePeople,
    fetchNextPage: fetchNextPagePeople,
  } = useInfiniteQuery(
    searchQueries.searchPeople(
      typeof searchQuery === 'string' ? searchQuery : '',
    ),
  );

  function handleChange(event: React.ChangeEvent<unknown>, mediaType: string) {
    router.replace(
      { pathname: '/search', query: { ...router.query, mediaType } },
      undefined,
      // To prevent page to be replaced and change route
      // without losing current state.
      // https://nextjs.org/docs/routing/shallow-routing
      { shallow: true },
    );
  }

  const allMovies = getAllPageResults(movies);
  const allPeople = getAllPageResults(people);

  return (
    <>
      <BaseSeo
        title="Search"
        description="Search movies and people by their name."
      />
      <SearchResultsHeader
        searchQuery={typeof searchQuery === 'string' ? searchQuery : ''}
      />
      <Tabs value={mediaType} onChange={handleChange}>
        {!!allMovies.length && <Tab value={MediaType.MOVIE} label={'Movies'} />}
        {!!allPeople.length && (
          <Tab value={MediaType.PERSON} label={'People'} />
        )}
      </Tabs>
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

export default SearchResultsView;
