import { APIConfiguration } from '@/api-configuration/ApiConfigurationTypes';
import { tmdbClient } from '@/tmdb-client/tmdbClient';

const getApiConfiguration = async () => {
  const apiConfiguration = await tmdbClient.get<APIConfiguration>(
    '/configuration',
  );
  return apiConfiguration;
};

export const apiConfigurationService = {
  getApiConfiguration,
};
