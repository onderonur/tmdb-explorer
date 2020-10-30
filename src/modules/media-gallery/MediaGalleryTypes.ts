import { ItemWithId } from '../shared/SharedTypes';

export interface MovieVideo extends ItemWithId {
  key: string;
  name: string;
  type: string;
}
