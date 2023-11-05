'use client';

import InfiniteGridList, {
  getInfiniteSwrKey,
} from '@/common/infinite-grid-list';
import type { Maybe, PaginationResponse } from '@/common/common-types';
import type { MovieListItem } from './movie-types';
import useSWRInfinite from 'swr/infinite';
import { getAllPageResults, getHasNextPage } from '@/common/common-utils';
import MovieCard from './movie-card';

type MovieInfiniteGridListProps = {
  firstPage: Maybe<PaginationResponse<MovieListItem>>;
  pageKeyTemplate: string;
  skipFirstMovie?: boolean;
};

// TODO: InfiniteGridList -> InfiniteList olarak değiştirilebilir.
export default function MovieInfiniteGridList({
  firstPage,
  pageKeyTemplate,
  skipFirstMovie,
}: MovieInfiniteGridListProps) {
  const { data, setSize, isValidating } = useSWRInfinite<
    PaginationResponse<MovieListItem>
  >((pageIndex: number) => getInfiniteSwrKey({ pageIndex, pageKeyTemplate }), {
    // TODO: İlk sayfayı client'ta yine çekiyor. Bunu kapatmanın yolu var mı bak.
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
        if (skipFirstMovie && i === 0) {
          return null;
        }

        return (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        );
      })}
    </InfiniteGridList>
  );
}
