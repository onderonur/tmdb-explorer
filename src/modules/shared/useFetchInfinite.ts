import { useSWRInfinite, SWRInfiniteConfigInterface } from 'swr';
import { UrlParams } from '@/modules/shared/SharedUtils';
import { createUrl, getLastOfArray } from '@/modules/shared/SharedUtils';
import { InfiniteFetchResponse } from '@/modules/shared/SharedTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useFetchInfinite<Data, Error = any>(
  url: string,
  params: UrlParams = {},
  config?: SWRInfiniteConfigInterface<InfiniteFetchResponse<Data>, Error>,
) {
  const { data, error, size, setSize } = useSWRInfinite<
    InfiniteFetchResponse<Data>,
    Error
  >(
    (index: number) => createUrl(url, { page: index + 1, ...params }),
    undefined,
    config,
  );

  const results: Data[] = data?.flatMap((page) => page.results) || [];
  const lastPage = data ? getLastOfArray(data) : null;
  const totalPages = lastPage?.total_pages || 0;
  const hasNextPage = size! < totalPages && !error;
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size! > 0 && data && typeof data[size! - 1] === 'undefined');

  function loadMore() {
    setSize?.(size! + 1);
  }

  const totalCount = lastPage?.total_results || 0;

  return {
    data: results,
    hasNextPage,
    isLoading: isLoadingMore,
    loadMore,
    totalCount,
  };
}

export default useFetchInfinite;
