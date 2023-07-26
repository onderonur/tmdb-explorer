import TmdbConfigurationProvider from '@/tmdb/tmdb-configuration-context';
import { getTmdbConfiguration } from '@/tmdb/tmdb-configuration-fetchers';
import BaseSWRConfig from './base-swr-config';
import ThemeRegistry from '@/theme/theme-registry';

type AppProvidersProps = React.PropsWithChildren;

export default async function AppProviders({ children }: AppProvidersProps) {
  const tmdbConfiguration = await getTmdbConfiguration();

  return (
    <ThemeRegistry options={{ key: 'mui' }}>
      <BaseSWRConfig>
        <TmdbConfigurationProvider tmdbConfiguration={tmdbConfiguration}>
          {children}
        </TmdbConfigurationProvider>
      </BaseSWRConfig>
    </ThemeRegistry>
  );
}
