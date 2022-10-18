import { APIConfiguration } from '@/api-configuration/ApiConfigurationTypes';
import { IS_SERVER } from '@/common/CommonUtils';
import { apiConfigurationService } from '@/api-configuration/ApiConfigurationService';
import { httpClient } from '@/http-client/httpClient';

export const apiConfigurationAPI = {
  configuration: () => ({
    queryKey: ['configuration'],
    queryFn: () =>
      IS_SERVER
        ? apiConfigurationService.getApiConfiguration()
        : httpClient.get<APIConfiguration>('/api/api-configuration'),
  }),
};
