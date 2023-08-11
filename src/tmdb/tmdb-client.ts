import { httpClient } from '@/http-client/http-client';

export const tmdbClient = {
  get: async <T>(
    endpoint: string,
    searchParams?: URLSearchParams,
  ): Promise<T> => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('api_key', process.env.API_KEY as string);

    const response = await httpClient.get<T>(
      `${process.env.API_URL}${endpoint}`,
      newSearchParams,
    );

    return response;
  },
};
