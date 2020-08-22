import queryString from 'query-string';
import { Movie, Person } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UrlParams = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUrl = (endpoint: string, params?: UrlParams) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api${endpoint}${
    params ? `?${queryString.stringify(params)}` : ''
  }`;

class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message); // 'Error' breaks prototype chain here
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

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

export const api = {
  get: <Data>(url: string): Promise<Data> => fetch(url).then(handleResponse),
};

export function getMovieReleaseYear(movie: Movie) {
  const date = movie?.release_date;

  if (!date) {
    return null;
  }

  const year = new Date(movie.release_date).getFullYear();
  return year;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getLastOfArray = (arr: Array<any>) => {
  const { length, [length - 1]: last } = arr;
  return last;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const idExtractor = (item: any) => item.id;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isOfType<T>(value: any, keys: (keyof T)[]): value is T {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const valueKeys = Object.keys(value);
  return keys.every((key) => valueKeys.includes(key as string));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMovie(value: any): value is Movie {
  return isOfType<Movie>(value, ['title']);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPerson(value: any): value is Person {
  return isOfType<Person>(value, ['name']);
}
