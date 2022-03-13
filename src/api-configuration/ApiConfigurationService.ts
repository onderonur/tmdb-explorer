import { APIConfiguration } from '@/api-configuration/ApiConfigurationTypes';
import { BaseService } from '../api/BaseService';

class ApiConfigurationService extends BaseService {
  getApiConfiguration = async () => {
    const apiConfiguration = await this.get<APIConfiguration>('/configuration');
    return apiConfiguration;
  };
}

export const apiConfigurationService = new ApiConfigurationService();
