import { useSWRInfinite, SWRInfiniteConfiguration } from 'swr';
import { api, UrlParams } from '@/common/CommonUtils';
import { createUrl, getLastOfArray } from '@/common/CommonUtils';
import { InfiniteFetchResponse } from '@/common/CommonTypes';
import { useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useFetchInfinite<Data, Error = any>(
  url: string,
  params: UrlParams = {},
  config?: SWRInfiniteConfiguration<InfiniteFetchResponse<Data>, Error>,
) {
  const { data, error, size, setSize } = useSWRInfinite<
    InfiniteFetchResponse<Data>,
    Error
  >(
    (index: number) => createUrl(url, { page: index + 1, ...params }),
    // Global "fetcher" provided by SWRConfig is not working for some reason.
    // It can be a bug in swr@0.5.5.
    // For now, we used fetcher function here too.
    api.get,
    config,
  );

  const results: Data[] = data?.flatMap((page) => page.results) || [];
  const lastPage = data ? getLastOfArray(data) : null;
  const totalPages = lastPage?.total_pages || 0;
  const hasNextPage = size < totalPages && !error;
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  const loadMore = useCallback(() => {
    setSize?.(size + 1);
  }, [setSize, size]);

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
