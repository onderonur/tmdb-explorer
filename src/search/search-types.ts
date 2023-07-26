import { MediaType } from '@/medias/media-enums';
import { MovieListItem } from '@/movies/movie-types';
import { Person } from '@/people/people-types';

export type MultiSearchResult = (MovieListItem | Person) & {
  media_type: MediaType;
};
