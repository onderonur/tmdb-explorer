import React, { useMemo, useCallback, useContext } from 'react';
import { api, createUrl } from '@/modules/shared/SharedUtils';
import { APIConfiguration } from './ApiConfigurationTypes';

interface ApiConfigurationContextValue {
  getImageUrl: (path: string, options?: { original?: boolean }) => string;
}

const ApiConfigurationContext = React.createContext<
  ApiConfigurationContextValue
>({} as ApiConfigurationContextValue);

// For "getServerSideProps"
export const fetchApiConfiguration = () =>
  api.get<APIConfiguration>(createUrl('/configuration'));

export function useApiConfiguration() {
  const value = useContext(ApiConfigurationContext);
  return value;
}

type ApiConfigurationProviderProps = React.PropsWithChildren<{
  configuration: APIConfiguration;
}>;

function ApiConfigurationProvider({
  configuration,
  children,
}: ApiConfigurationProviderProps) {
  const getImageUrl = useCallback<ApiConfigurationContextValue['getImageUrl']>(
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
    <ApiConfigurationContext.Provider value={value}>
      {children}
    </ApiConfigurationContext.Provider>
  );
}

export default ApiConfigurationProvider;
