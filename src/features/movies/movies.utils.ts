import type { MovieBase } from './movies.types';

export function getMovieReleaseYear(movie: MovieBase) {
  const date = movie.release_date;

  if (!date) return null;

  const year = new Date(movie.release_date).getFullYear();

  return year;
}
