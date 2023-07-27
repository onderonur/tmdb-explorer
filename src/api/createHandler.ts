import { CustomError } from '@/error-handling/CustomError';
import { NextApiHandler } from 'next';

// TODO: Husky fix.

export const createHandler =
  (fn: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    try {
      // TODO: Buna bi bak app router'da nasıl yapılabilir vs.
      // For caching:
      // https://vercel.com/docs/concepts/functions/edge-caching
      const maxAgeInSeconds = 24 * 60 * 60;
      res.setHeader('Cache-Control', `s-maxage=${maxAgeInSeconds}`);

      const result = await fn(req, res);
      return result;
    } catch (err) {
      let statusCode = 500;
      let message = 'Something went wrong';
      if (err instanceof CustomError) {
        statusCode = err.statusCode ?? statusCode;
        message = err.message ?? message;
      }
      return res.status(statusCode).json({ statusCode, message });
    }
  };
