import { CustomError } from '@/error-handling/ErrorHandlingUtils';
import { httpClient } from '@/http-client/httpClient';
import { NextApiRequest, NextApiResponse } from 'next';
import queryString from 'query-string';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let path = req.url ?? '/';
  path = path.replace('/api', '');
  const [base, query] = path.split('?');

  let parsedQuery = {};
  if (query) {
    parsedQuery = queryString.parse(query);
  }
  parsedQuery = { ...parsedQuery, api_key: process.env.API_KEY };

  const targetUrl = queryString.stringifyUrl({
    url: `${process.env.API_URL}${base}`,
    query: parsedQuery,
  });

  try {
    const apiResponse = await httpClient.get(targetUrl);
    return res.json(apiResponse);
  } catch (err) {
    if (err instanceof CustomError) {
      return res
        .status(err.statusCode)
        .json({ statusCode: err.statusCode, message: err.message });
    }
    const statusCode = 500;
    return res
      .status(statusCode)
      .json({ statusCode, message: 'Something went wrong' });
  }
}

export default handler;
