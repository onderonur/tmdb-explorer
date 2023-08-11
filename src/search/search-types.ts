import { SearchResultType } from '@/medias/media-enums';
import { MovieListItem } from '@/movies/movie-types';
import { PersonListItem } from '@/people/people-types';

export type MovieSearchResult = MovieListItem & {
  media_type: SearchResultType.MOVIE;
};

export type PersonSearchResult = PersonListItem & {
  media_type: SearchResultType.PERSON;
};

export type MultiSearchResult = MovieSearchResult | PersonSearchResult;
