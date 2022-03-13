import { CustomError } from '@/error-handling/CustomError';
import queryString from 'query-string';

async function handleResponse(response: Response) {
  if (response.ok) {
    return await response.json();
  } else {
    let message = response.statusText;

    try {
      const errorJson = await response.json();
      message = errorJson.status_message;
      // eslint-disable-next-line no-empty
    } catch {}

    throw new CustomError(response.status, message);
  }
}

export const httpClient = {
  get: <Data>(
    url: string,
    params?: queryString.StringifiableRecord,
  ): Promise<Data> =>
    fetch(queryString.stringifyUrl({ url, query: params })).then(
      handleResponse,
    ),
};
