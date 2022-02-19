import { MediaType } from '@/common/CommonEnums';
import { DateString, ItemWithId, Maybe } from '@/common/CommonTypes';
import { MovieImage } from '@/movies/MovieTypes';

export interface BasePerson extends ItemWithId {
  name: string;
  profile_path: string;
}

export interface Person extends BasePerson {
  biography: Maybe<string>;
  gender: number;
  known_for_department: string;
  birthday: DateString;
  place_of_birth: string;
  official_site: Maybe<string>;
  also_known_as: Maybe<string[]>;
  imdb_id: Maybe<string>;
  media_type: MediaType;
}

export type PersonImage = MovieImage;
