export type Maybe<T> = T | null | undefined;

export type ID = number;

// TODO: Buna gerek olmayabilir
export type ItemWithId = {
  id: ID;
};

export type DateString = string;

export interface PaginationResponse<Data> {
  results: Data[];
  page: number;
  total_pages: number;
  total_results: number;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
