import { createProxyMiddleware } from 'http-proxy-middleware';
import runMiddleware from './runMiddleware';

const proxy = (options) => async (req, res) => {
  await runMiddleware(req, res, createProxyMiddleware(options));
  res.end();
};

export default proxy;
