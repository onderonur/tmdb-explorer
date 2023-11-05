import type { SearchResultType } from '@/medias/media-enums';
import type { MovieListItem } from '@/movies/movie-types';
import type { PersonListItem } from '@/people/people-types';

export type MovieSearchResult = MovieListItem & {
  media_type: SearchResultType.MOVIE;
};

export type PersonSearchResult = PersonListItem & {
  media_type: SearchResultType.PERSON;
};

export type MultiSearchResult = MovieSearchResult | PersonSearchResult;
