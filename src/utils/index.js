import queryString from 'query-string';

export const createUrl = (endpoint, params) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api${endpoint}${
    params ? `?${queryString.stringify(params)}` : ''
  }`;

class CustomError extends Error {
  constructor(statusCode, message) {
    super(message); // 'Error' breaks prototype chain here
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

async function handleResponse(response) {
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
  get: (url) => fetch(url).then(handleResponse),
};

export function getMovieReleaseYear(movie) {
  const date = movie?.release_date;

  if (!date) {
    return null;
  }

  const year = new Date(movie.release_date).getFullYear();
  return year;
}

export function getImdbProfileUrl(imdbId) {
  return `https://www.imdb.com/title/${imdbId}`;
}

export const getLastOfArray = (arr) => {
  const { length, [length - 1]: last } = arr;
  return last;
};

export const idExtractor = (item) => item.id;
