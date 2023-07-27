// TODO: Bunlara rename iyi olabilir.
export type ViewableMovie = {
  title: string;
  overview: string;
  release_date: string;
  adult: boolean;
  vote_count: number;
  popularity: number;
};

export type ViewablePerson = {
  name: string;
  gender: number;
  adult: boolean;
  popularity: number;
};
