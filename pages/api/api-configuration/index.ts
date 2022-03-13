import { APIConfiguration } from '@/api-configuration/ApiConfigurationTypes';
import { apiConfigurationService } from '@/api-configuration/ApiConfigurationService';
import { createHandler } from '@/api/createHandler';
import { NextApiHandler } from 'next';

const handler: NextApiHandler<APIConfiguration> = async (req, res) => {
  const apiConfiguration = await apiConfigurationService.getApiConfiguration();
  res.status(200).json(apiConfiguration);
};

export default createHandler(handler);
