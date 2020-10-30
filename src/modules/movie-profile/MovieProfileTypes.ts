import { BasePerson } from '../shared/SharedTypes';

export type MovieCast = BasePerson & {
  character: string;
};
