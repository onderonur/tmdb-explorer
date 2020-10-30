import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import runMiddleware from './runMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';

const proxy = (options: Options) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await runMiddleware(req, res, createProxyMiddleware(options));
  res.end();
};

export default proxy;
