import { CustomError } from '@/error-handling/CustomError';

type ApiErrorData = {
  status_message: string;
};

async function handleResponse<Data>(response: Response): Promise<Data> {
  if (response.ok) {
    const data = (await response.json()) as Data;
    return data;
  } else {
    let message = response.statusText;

    try {
      const errorJson = (await response.json()) as ApiErrorData;
      message = errorJson.status_message;
      // eslint-disable-next-line no-empty
    } catch {}

    throw new CustomError(response.status, message);
  }
}

export const httpClient = {
  get: async <Data>(
    url: string,
    searchParams?: URLSearchParams,
  ): Promise<Data> => {
    let fullUrl = url;

    const queryString = searchParams?.toString();

    if (queryString) {
      fullUrl = `${url}?${queryString}`;
    }

    const response = await fetch(fullUrl);
    const data = await handleResponse<Data>(response);
    return data;
  },
};
