'use client';

import type { Maybe, PaginationResponse } from '@/core/shared/shared.types';
import { getAllPageResults, getHasNextPage } from '@/core/shared/shared.utils';
import {
  InfiniteGridList,
  getInfiniteSwrKey,
} from '@/core/ui/components/infinite-grid-list';
import { MovieCard } from '@/features/movies/components/movie-card';
import type { MovieListItem } from '@/features/movies/movies.types';
import useSWRInfinite from 'swr/infinite';

type MovieInfiniteGridListProps = {
  firstPage: Maybe<PaginationResponse<MovieListItem>>;
  pageKeyTemplate: string;
  skipFirstMovie?: boolean;
};

export function MovieInfiniteGridList({
  firstPage,
  pageKeyTemplate,
  skipFirstMovie,
}: MovieInfiniteGridListProps) {
  const { data, setSize, isValidating } = useSWRInfinite<
    PaginationResponse<MovieListItem>
  >((pageIndex: number) => getInfiniteSwrKey({ pageIndex, pageKeyTemplate }), {
    fallbackData: firstPage ? [firstPage] : [],
    // To stop fetching the first page too, when the next page is loading.
    revalidateFirstPage: false,
  });

  const hasNextPage = getHasNextPage(data);

  return (
    <InfiniteGridList
      loading={isValidating}
      hasNextPage={hasNextPage}
      onLoadMore={() => setSize((currentSize) => currentSize + 1)}
    >
      {getAllPageResults(data).map((movie, i) => {
        // Since we show the first movie as featured, we ignore it in the list.
        if (skipFirstMovie && i === 0) return null;

        return (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        );
      })}
    </InfiniteGridList>
  );
}
