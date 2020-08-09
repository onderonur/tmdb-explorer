import proxy from '@/api/middlewares/proxy';
import queryString from 'query-string';

// Note about CORS:
// https://nextjs.org/docs/api-routes/introduction
// API Routes do not specify CORS headers, meaning they are same-origin only by default.
// You can customize such behavior by wrapping the request handler with the cors middleware.

export const config = {
  api: {
    bodyParser: false,
  },
};

export default proxy({
  target: process.env.API_URL,
  changeOrigin: true,
  logLevel: 'silent',
  pathRewrite: async function (path) {
    let formattedPath = path.replace('/api', '');
    const [base, query] = formattedPath.split('?');
    let parsedQuery = {};
    if (query) {
      parsedQuery = queryString.parse(query);
    }
    parsedQuery = { ...parsedQuery, api_key: process.env.API_KEY };
    return `${base}?${queryString.stringify(parsedQuery)}`;
  },
});
