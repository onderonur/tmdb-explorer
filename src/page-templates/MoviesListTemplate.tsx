import MovieCard from '@/movies/MovieCard';
import BaseSeo from '@/seo/BaseSeo';
import { PaginationResponse } from '@/common/CommonTypes';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { getAllPageResults } from '@/common/CommonUtils';
import PageTitle from '@/common/PageTitle';
import { Movie } from '@/movies/MoviesTypes';
import InfiniteGridList from '@/common/InfiniteGridList';

interface MoviesListTemplateProps {
  title: string;
  titleExtra?: React.ReactNode;
  description: string;
  apiQuery: UseInfiniteQueryOptions<PaginationResponse<Movie>>;
}

function MoviesListTemplate({
  title,
  titleExtra,
  description,
  apiQuery,
}: MoviesListTemplateProps) {
  const { data, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteQuery<PaginationResponse<Movie>>(apiQuery);

  return (
    <>
      <BaseSeo title={title} description={description} />
      <PageTitle title={title} extra={titleExtra} />
      <InfiniteGridList
        loading={isFetching}
        hasNextPage={!!hasNextPage}
        onLoadMore={fetchNextPage}
      >
        {getAllPageResults(data).map((movie) => {
          return (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          );
        })}
      </InfiniteGridList>
    </>
  );
}

export default MoviesListTemplate;
