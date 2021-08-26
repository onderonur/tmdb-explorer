import { BasePerson } from '../common/CommonTypes';

export type MovieCast = BasePerson & {
  character: string;
};
