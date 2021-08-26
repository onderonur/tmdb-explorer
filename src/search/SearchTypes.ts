import { Movie, Person } from '@/common/CommonTypes';
import { SearchType } from './SearchEnums';

export type Suggestion = (Movie | Person) & {
  searchType: SearchType;
};
