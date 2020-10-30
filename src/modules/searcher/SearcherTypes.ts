import { Movie, Person } from '@/modules/shared/SharedTypes';
import { SearchType } from './SearcherEnums';

export type Suggestion = (Movie | Person) & {
  searchType: SearchType;
};
