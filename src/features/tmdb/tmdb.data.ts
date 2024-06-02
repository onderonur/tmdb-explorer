import type { TmdbConfiguration } from '@/features/tmdb/tmdb.types';
import { tmdbClient } from '@/features/tmdb/tmdb.utils';
import { cache } from 'react';
import 'server-only';

export const getTmdbConfiguration = cache(async () => {
  const tmdbConfiguration =
    await tmdbClient.get<TmdbConfiguration>('/configuration');

  return tmdbConfiguration;
});
