import { Movie } from '../common/CommonTypes';

export type PersonCasting = Movie & { character: string };

type PersonCrew = Movie & { job: string };

export type PersonCredits = { cast: PersonCasting[]; crew: PersonCrew[] };
