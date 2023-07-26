import { Maybe } from '@/common/CommonTypes';
import PageTitle from '@/common/PageTitle';
import Padder from '@/common/padder';
import { MediaType } from '@/medias/media-enums';
import MovieInfiniteGridList from '@/movies/movie-infinite-grid-list';
import PeopleInfiniteGridList from '@/people/people-infinite-list';
import { searchMovies, searchPeople } from '@/search/search-fetchers';
import SearchResultsTabs from '@/search/search-results-tabs';
import { Box, Toolbar } from '@mui/material';

type SearchPageProps = {
  params: {
    query: string;
  };
  searchParams: {
    mediaType?: string;
  };
};

// TODO: mediaType ismi çok kötü onu değiştir.

export default async function SearchPage({
  params: { query },
  searchParams,
}: SearchPageProps) {
  let { mediaType } = searchParams;

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

  if (!mediaType) {
    if (moviesFirstPage.total_results) {
      mediaType = MediaType.MOVIE;
    } else if (peopleFirstPage.total_results) {
      mediaType = MediaType.PERSON;
    }
  }

  const infiniteListSearchParams = new URLSearchParams();

  infiniteListSearchParams.set('page', '%pageIndex%');

  // searchQuery boş oluncaki durumu handle et veya bunu param'a çevir query string'dense
  if (query) {
    infiniteListSearchParams.set('query', query);
  }

  return (
    <>
      <Toolbar />
      <Padder paddingY>
        <PageTitle title={`Search Results for: ${query}`} />
        <SearchResultsTabs
          value={mediaType as Maybe<MediaType>}
          isMoviesTabVisible={!!moviesFirstPage.total_pages}
          isPeopleTabVisible={!!peopleFirstPage.total_pages}
        />
        <Box marginTop={2}>
          {mediaType === MediaType.MOVIE && (
            <MovieInfiniteGridList
              pageKeyTemplate={`/search/${query}/movies/api?${infiniteListSearchParams.toString()}`}
              firstPage={moviesFirstPage}
            />
          )}
          {mediaType === MediaType.PERSON && (
            <PeopleInfiniteGridList
              pageKeyTemplate={`/search/${query}/people/api?${infiniteListSearchParams.toString()}`}
              firstPage={peopleFirstPage}
            />
          )}
        </Box>
      </Padder>
    </>
  );
}
