import TmdbConfigurationProvider from '@/tmdb/tmdb-configuration-context';
import { getTmdbConfiguration } from '@/tmdb/tmdb-configuration-fetchers';
import BaseSWRConfig from './base-swr-config';

// TODO: Bi proptypes hatası var bi yerlerde bi bak.

type AppProvidersProps = React.PropsWithChildren;

export default async function AppProviders({ children }: AppProvidersProps) {
  const tmdbConfiguration = await getTmdbConfiguration();

  return (
    <BaseSWRConfig>
      <TmdbConfigurationProvider tmdbConfiguration={tmdbConfiguration}>
        {children}
      </TmdbConfigurationProvider>
    </BaseSWRConfig>
  );
}
