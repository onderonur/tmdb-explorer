import React, { useMemo, useCallback, useContext } from 'react';
import { api, createUrl } from '@utils';

const ConfigurationContext = React.createContext();

// For "getServerSideProps"
export const fetchConfiguration = () => api.get(createUrl('/configuration'));

export function useConfiguration() {
  const value = useContext(ConfigurationContext);
  return value;
}

function ConfigurationProvider({ configuration, children }) {
  const getImageUrl = useCallback(
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

  const value = useMemo(() => ({ configuration, getImageUrl }), [
    configuration,
    getImageUrl,
  ]);

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
}

export default ConfigurationProvider;
