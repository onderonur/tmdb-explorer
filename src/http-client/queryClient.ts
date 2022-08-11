import { QueryClient } from '@tanstack/react-query';

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        // For SSR:
        // Because staleTime defaults to 0, queries will be refetched in the background on page load by default.
        // You might want to use a higher staleTime to avoid this double fetching, especially if you don't cache your markup.
        // https://@tanstack/react-query.tanstack.com/guides/ssr#staleness-is-measured-from-when-the-query-was-fetched-on-the-server
        staleTime: 60 * 1000,
      },
    },
  });
