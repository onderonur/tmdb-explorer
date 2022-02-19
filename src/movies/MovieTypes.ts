import { MediaType } from '@/common/CommonEnums';
import { DateString, ItemWithId, Maybe } from '@/common/CommonTypes';

export interface Genre extends ItemWithId {
  name: string;
}

export interface Movie extends ItemWithId {
  title: string;
  overview: string;
  tagline: Maybe<string>;
  poster_path: string;
  backdrop_path: string;
  imdb_id: Maybe<string>;
  release_date: DateString;
  vote_average: number;
  genres: Genre[];
  media_type: MediaType;
}

export interface MovieImage {
  file_path: string;
}
