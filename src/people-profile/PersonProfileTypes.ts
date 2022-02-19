import { Movie } from '@/movies/MovieTypes';

export type PersonCasting = Movie & { character: string };

type PersonCrew = Movie & { job: string };

export type PersonCredits = { cast: PersonCasting[]; crew: PersonCrew[] };
