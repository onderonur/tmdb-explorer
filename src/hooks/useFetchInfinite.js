const { useSWRInfinite } = require('swr');
const { createUrl, getLastOfArray } = require('@/utils');

function useFetchInfinite(url, params = {}, config) {
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => createUrl(url, { page: index + 1, ...params }),
    undefined,
    config,
  );

  const results = data?.flatMap((page) => page.results) || [];
  const lastPage = data ? getLastOfArray(data) : null;
  const totalPages = lastPage?.total_pages || 0;
  const hasNextPage = size < totalPages && !error;
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  function loadMore() {
    setSize(size + 1);
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
