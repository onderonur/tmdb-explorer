// https://nextjs.org/docs/api-routes/api-middlewares
// Helper method to wait for a middleware to execute before continuing

import { NextApiRequest, NextApiResponse } from 'next';

// And to throw an error when an error happens in a middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

export default runMiddleware;
