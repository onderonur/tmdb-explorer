import {
  ID,
  ItemWithId,
  Maybe,
  PaginationResponse,
} from '@/common/CommonTypes';
import { BasePerson } from '@/people/PeopleTypes';

export interface Genre extends ItemWithId {
  name: string;
}

export type MovieListItem = ItemWithId & {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: ID;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export interface Movie extends ItemWithId {
  adult: boolean;
  backdrop_path: string;
  credits?: { cast: MovieCast[]; crew: MovieCrew[] };
  genres: Genre[];
  homepage: string;
  id: ID;
  images?: {
    backdrops: MovieImage[];
    logos: MovieImage[];
    posters: MovieImage[];
  };
  imdb_id: Maybe<string>;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: Maybe<string>;
  title: string;
  videos?: PaginationResponse<MovieVideo>;
  recommendations: PaginationResponse<MovieListItem>;
  vote_average: number;
  vote_count: number;
  // TODO: Bu lazım mı? API'dan gelmiyor.
  // media_type: MediaType;
}

export type MovieImage = {
  file_path: string;
};

export type MovieVideo = {
  id: string;
  key: string;
  name: string;
  type: string;
};

export type MovieCast = BasePerson & {
  character: string;
};

export type MovieCrew = BasePerson & {
  job: string;
};
