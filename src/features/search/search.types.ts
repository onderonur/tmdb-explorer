import type { MediaType } from '@/features/media/media.utils';
import type { MovieListItem } from '@/features/movies/movies.types';
import type { PersonListItem } from '@/features/people/people.types';

export type MovieSearchResult = MovieListItem & {
  media_type: MediaType.MOVIE;
};

export type PersonSearchResult = PersonListItem & {
  media_type: MediaType.PERSON;
};

export type MultiSearchResult = MovieSearchResult | PersonSearchResult;
