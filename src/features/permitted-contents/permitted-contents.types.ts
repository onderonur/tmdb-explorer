export type PermittedMovie = {
  title: string;
  overview: string;
  release_date: string;
  adult: boolean;
  vote_count: number;
  popularity: number;
};

export type PermittedPerson = {
  name: string;
  gender: number;
  adult: boolean;
  popularity: number;
};
