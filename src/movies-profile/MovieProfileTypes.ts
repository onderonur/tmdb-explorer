import { BasePerson } from '@/people/PeopleTypes';

export type MovieCast = BasePerson & {
  character: string;
};
