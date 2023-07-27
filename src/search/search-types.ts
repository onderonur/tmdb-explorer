import { MediaType } from '@/medias/media-enums';
import { MovieListItem } from '@/movies/movie-types';
import { PersonListItem } from '@/people/people-types';

export type MovieSearchResult = MovieListItem & {
  media_type: MediaType.MOVIE;
};

export type PersonSearchResult = PersonListItem & {
  media_type: MediaType.PERSON;
};

export type MultiSearchResult = MovieSearchResult | PersonSearchResult;
