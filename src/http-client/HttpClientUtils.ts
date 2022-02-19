import queryString from 'query-string';
import { IS_SERVER } from '@/common/CommonUtils';

export const createUrl = (
  endpoint: string,
  params?: queryString.StringifiableRecord,
) => {
  let query = params;
  // On the server side (getServerSideProps etc) we directly call the TMDb API.
  // So, we need to add api_key to our query params.
  // On the client side, we call our own API route and proxy the request to TMDb API.
  if (IS_SERVER) {
    query = { ...query, api_key: process.env.API_KEY };
  }
  return queryString.stringifyUrl({
    url: IS_SERVER
      ? `${process.env.API_URL}${endpoint}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/api${endpoint}`,
    query,
  });
};
