import { tmdbClient } from '@/tmdb/tmdb-client';
import type { TmdbConfiguration } from '@/tmdb/tmdb-types';
import { cache } from 'react';

export const getTmdbConfiguration = cache(async () => {
  const tmdbConfiguration =
    await tmdbClient.get<TmdbConfiguration>('/configuration');

  return tmdbConfiguration;
});
