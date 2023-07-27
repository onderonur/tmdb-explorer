import { MediaType } from '@/medias/media-enums';
import { DateString, Id, Maybe } from '@/common/common-types';
import { MovieImage, MovieListItem } from '@/movies/movie-types';

export type PersonBase = {
  id: Id;
  name: string;
  profile_path: string;
  gender: number;
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

type PersonImage = MovieImage;

type PersonCasting = MovieListItem & { character: string };
type PersonCrew = MovieListItem & { job: string };
type PersonCredits = { cast: PersonCasting[]; crew: PersonCrew[] };

export type PersonDetails = PersonListItem & {
  images: { profiles: PersonImage[] };
  credits: PersonCredits;
};
