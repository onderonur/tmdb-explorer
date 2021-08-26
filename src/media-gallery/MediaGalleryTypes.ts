import { ItemWithId } from '../common/CommonTypes';

export interface MovieVideo extends ItemWithId {
  key: string;
  name: string;
  type: string;
}
