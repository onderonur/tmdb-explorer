import type { Id, Maybe, PaginationResponse } from '@/common/common-types';
import type { TImage } from '@/medias/media-types';
import type { PersonBase } from '@/people/people-types';

export type Genre = {
  id: Id;
  name: string;
};

export type MovieBase = {
  adult: boolean;
  backdrop_path: string;
  id: Id;
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

export type MovieListItem = MovieBase & {
  genre_ids: number[];
};

export type MovieDetails = MovieBase & {
  genre_ids: number[];
  credits?: { cast: MovieCast[]; crew: MovieCrew[] };
  genres: Genre[];
  homepage: string;
  images?: {
    backdrops: TImage[];
    logos: TImage[];
    posters: TImage[];
  };
  imdb_id: Maybe<string>;
  revenue: number;
  runtime: number;
  status: string;
  tagline: Maybe<string>;
  videos?: PaginationResponse<MovieVideo>;
  recommendations: PaginationResponse<MovieListItem>;
};

export type MovieVideo = {
  id: string;
  key: string;
  name: string;
  type: string;
};

type MovieCast = PersonBase & {
  character: string;
};

export type MovieCrew = PersonBase & {
  job: string;
};
