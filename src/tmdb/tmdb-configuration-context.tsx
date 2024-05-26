'use client';

import type { Maybe } from '@/common/common-types';
import { createSafeContext } from '@/common/safe-context';
import { getTmdbImageUrl } from './tmdb-configuration-utils';
import type { TmdbConfiguration, TmdbImageQuality } from './tmdb-types';

type TmdbConfigurationContextValue = TmdbConfiguration & {
  getImageUrl: (imagePath: Maybe<string>, quality?: TmdbImageQuality) => string;
};

const [TmdbConfigurationContext, useTmdbConfigurationContext] =
  createSafeContext<TmdbConfigurationContextValue>({
    displayName: 'TmdbConfigurationContext',
  });

export { useTmdbConfigurationContext as useTmdbConfigurationContext };

type TmdbConfigurationProviderProps = React.PropsWithChildren<{
  tmdbConfiguration: TmdbConfiguration;
}>;

export function TmdbConfigurationProvider({
  tmdbConfiguration,
  children,
}: TmdbConfigurationProviderProps) {
  const getImageUrl: TmdbConfigurationContextValue['getImageUrl'] = (
    imagePath,
    quality,
  ) => {
    return getTmdbImageUrl({
      tmdbConfiguration,
      imagePath,
      quality,
    });
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
