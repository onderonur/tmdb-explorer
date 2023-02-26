import { apiConfigurationAPI } from '@/api-configuration/apiConfigurationAPI';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

function useApiConfiguration() {
  const { data: configuration } = useQuery({
    ...apiConfigurationAPI.configuration(),
    staleTime: Infinity,
  });

  const getImageUrl = useCallback(
    (path: string, config?: { quality: 'w500' | 'original' }) => {
      if (!path || !configuration) {
        return '/placeholder.png';
      }

      const { images } = configuration;
      const { secure_base_url } = images;

      return `${secure_base_url}${config?.quality ?? 'w500'}${path}`;
    },
    [configuration],
  );

  return { getImageUrl };
}

export default useApiConfiguration;
