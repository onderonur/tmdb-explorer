import useSWR from 'swr';
import { createUrl } from '@/utils';

function useFetch(url, params, config) {
  const { data, error } = useSWR(
    url ? createUrl(url, params) : null,
    undefined,
    config,
  );

  if (error) {
    throw error;
  }

  return { data, error, loading: !data && !error };
}

export default useFetch;
