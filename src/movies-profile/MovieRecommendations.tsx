import MovieCard from '@/movies/MovieCard';
import { ID } from '@/common/CommonTypes';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllPageResults } from '@/common/CommonUtils';
import { moviesAPI } from '@/movies/moviesAPI';
import InfiniteGridList from '@/common/InfiniteGridList';

interface RecommendationsProps {
  movieId: ID;
}

function Recommendations({ movieId }: RecommendationsProps) {
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
    moviesAPI.movieRecommendations(movieId),
  );

  return (
    <InfiniteGridList
      loading={isFetching}
      listEmptyMessage="No recommendation has been found."
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
  );
}

export default Recommendations;
