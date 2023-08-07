import { httpClient } from '@/http-client/http-client';

export const tmdbClient = {
  get: async <T>(endpoint: string, params?: URLSearchParams): Promise<T> => {
    const searchParams = new URLSearchParams(params);
    searchParams.set('api_key', process.env.API_KEY as string);

    const response = await httpClient.get<T>(
      `${process.env.API_URL}${endpoint}`,
      searchParams,
    );

    return response;
  },
};
