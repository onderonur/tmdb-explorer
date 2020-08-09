import React, { useMemo, useCallback, useContext } from 'react';
import { api, createUrl } from '@/utils';
import { APIConfiguration } from '@/types';

interface ConfigurationContextValue {
  getImageUrl: (path: string, options?: { original?: boolean }) => string;
}

const ConfigurationContext = React.createContext<ConfigurationContextValue>(
  {} as ConfigurationContextValue,
);

// For "getServerSideProps"
export const fetchConfiguration = () =>
  api.get<APIConfiguration>(createUrl('/configuration'));

export function useConfiguration() {
  const value = useContext(ConfigurationContext);
  return value;
}

type ConfigurationProviderProps = React.PropsWithChildren<{
  configuration: APIConfiguration;
}>;

function ConfigurationProvider({
  configuration,
  children,
}: ConfigurationProviderProps) {
  const getImageUrl = useCallback<ConfigurationContextValue['getImageUrl']>(
    (path, { original } = {}) => {
      if (!path || !configuration) {
        return '/placeholder.png';
      }

      const { images } = configuration;
      const { secure_base_url } = images;

      return `${secure_base_url}/${original ? 'original' : 'w500'}${path}`;
    },
    [configuration],
  );

  const value = useMemo(() => ({ getImageUrl }), [getImageUrl]);

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
}

export default ConfigurationProvider;
