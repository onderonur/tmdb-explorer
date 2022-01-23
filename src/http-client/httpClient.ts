import { CustomError } from '@/error-handling/ErrorHandlingUtils';

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
  get: <Data>(url: string): Promise<Data> => fetch(url).then(handleResponse),
};
