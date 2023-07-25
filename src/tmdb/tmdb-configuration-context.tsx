'use client';

import { createSafeContext } from '@/common/safe-context';
import { TmdbConfiguration, TmdbImageQuality } from './tmdb-types';
import { Maybe } from '@/common/CommonTypes';

type TmdbConfigurationContextValue = TmdbConfiguration & {
  getImageUrl: (
    path: Maybe<string>,
    config?: { quality?: TmdbImageQuality },
  ) => string;
};

const [TmdbConfigurationContext, useTmdbConfigurationContext] =
  createSafeContext<TmdbConfigurationContextValue>({
    displayName: 'TmdbConfigurationContext',
  });

export { useTmdbConfigurationContext as useTmdbConfigurationContext };

type TmdbConfigurationProviderProps = React.PropsWithChildren<{
  tmdbConfiguration: TmdbConfiguration;
}>;

export default function TmdbConfigurationProvider({
  tmdbConfiguration,
  children,
}: TmdbConfigurationProviderProps) {
  const getImageUrl: TmdbConfigurationContextValue['getImageUrl'] = (
    path,
    config,
  ) => {
    if (!path) {
      return '/placeholder.png';
    }

    return `${tmdbConfiguration.images.secure_base_url}${
      config?.quality ?? 'w500'
    }${path}`;
  };

  return (
    <TmdbConfigurationContext.Provider
      value={{
        ...tmdbConfiguration,
        getImageUrl,
      }}
    >
      {children}
    </TmdbConfigurationContext.Provider>
  );
}
