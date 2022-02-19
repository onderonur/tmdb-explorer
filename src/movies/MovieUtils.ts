import { MediaType } from '@/common/CommonEnums';
import { Movie } from './MovieTypes';

export function getMovieReleaseYear(movie: Movie) {
  const date = movie?.release_date;

  if (!date) {
    return null;
  }

  const year = new Date(movie.release_date).getFullYear();
  return year;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMovie(value: any): value is Movie {
  return value.media_type === MediaType.MOVIE;
}
