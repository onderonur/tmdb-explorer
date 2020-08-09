import useSWR, { ConfigInterface } from 'swr';
import { createUrl, UrlParams } from '@/utils';
import { Maybe } from '@/types';

function useFetch<Data = unknown, Error = unknown>(
  url: Maybe<string>,
  params?: UrlParams,
  config?: ConfigInterface<Data, Error>,
) {
  const { data, error } = useSWR<Data, Error>(
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
