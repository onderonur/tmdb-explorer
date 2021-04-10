import useSWR, { SWRConfiguration } from 'swr';
import { api, createUrl, UrlParams } from '@/modules/shared/SharedUtils';
import { Maybe } from '@/modules/shared/SharedTypes';

function useFetch<Data = unknown, Error = unknown>(
  url: Maybe<string>,
  params?: UrlParams,
  config?: SWRConfiguration<Data, Error>,
) {
  const { data, error } = useSWR<Data, Error>(
    url ? createUrl(url, params) : null,
    // Global "fetcher" provided by SWRConfig is not working for some reason.
    // It can be a bug in swr@0.5.5.
    // For now, we used fetcher function here too.
    api.get,
    config,
  );

  if (error) {
    throw error;
  }

  return { data, error, loading: !data && !error };
}

export default useFetch;
