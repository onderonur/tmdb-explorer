'use client';

import { createSafeContext } from '@/common/safe-context';
import { TmdbConfiguration, TmdbImageQuality } from './tmdb-types';
import { Maybe } from '@/common/common-types';
import { getTmdbImageUrl } from './tmdb-configuration-utils';

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

export default function TmdbConfigurationProvider({
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
