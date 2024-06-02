import type { DateString, Id, Maybe } from '@/core/shared/shared.types';
import type { MediaType } from '@/features/media/media.utils';
import type { MovieListItem } from '@/features/movies/movies.types';
import type { Gender } from './people.utils';

export type PersonBase = {
  id: Id;
  name: string;
  profile_path: string;
  gender: Gender;
  adult: boolean;
  popularity: number;
};

export type PersonListItem = PersonBase & {
  biography: Maybe<string>;
  known_for_department: string;
  birthday: DateString;
  place_of_birth: string;
  official_site: Maybe<string>;
  also_known_as: Maybe<string[]>;
  imdb_id: Maybe<string>;
  media_type: MediaType;
};

export type PersonCasting = MovieListItem & { character: string };
export type PersonCrew = MovieListItem & { job: string };

export type PersonDetails = PersonBase & {
  biography: Maybe<string>;
  known_for_department: string;
  birthday: DateString;
  place_of_birth: string;
  official_site: Maybe<string>;
  also_known_as: Maybe<string[]>;
  imdb_id: Maybe<string>;
  media_type: MediaType;
};
