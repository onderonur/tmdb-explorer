'use client';

import InfiniteGridList from '@/common/InfiniteGridList';
import { PaginationResponse } from '@/common/CommonTypes';
import { MovieListItem } from './movie-types';
import useSWRInfinite from 'swr/infinite';
import { getAllPageResults, getHasNextPage } from '@/common/CommonUtils';
import MovieCard from './movie-card';

type MovieInfiniteGridListProps = {
  firstPage: PaginationResponse<MovieListItem>;
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
  >(
    (pageIndex: number) =>
      decodeURIComponent(pageKeyTemplate).replace(
        '%pageIndex%',
        (pageIndex + 1).toString(),
      ),
    {
      // TODO: İlk sayfayı client'ta yine çekiyor. Bunu kapatmanın yolu var mı bak.
      fallbackData: [firstPage],
      // To stop fetching the first page too, when the next page is loading.
      revalidateFirstPage: false,
    },
  );

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