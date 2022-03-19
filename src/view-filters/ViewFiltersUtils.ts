import { PaginationResponse } from '@/common/CommonTypes';
import { Movie } from '@/movies/MoviesTypes';
import { isMovie } from '@/movies/MoviesUtils';
import { BasePerson } from '@/people/PeopleTypes';
import { isPerson } from '@/people/PeopleUtils';

export const VIEW_FILTER_LIMIT = {
  minVoteCount: 200,
  minPopularity: 5,
};

export function shouldViewMovie<T extends Movie>(movie: T) {
  return (
    !movie.adult &&
    movie.vote_count >= VIEW_FILTER_LIMIT.minVoteCount &&
    movie.popularity >= VIEW_FILTER_LIMIT.minPopularity
  );
}

export function filterViewableMovies<T extends Movie>(movies: T[]) {
  return movies.filter(shouldViewMovie);
}

export function shouldViewPerson<T extends BasePerson>(person: T) {
  return !person.adult && person.popularity >= VIEW_FILTER_LIMIT.minPopularity;
}

export function filterViewablePeople<T extends BasePerson>(people: T[]) {
  return people.filter(shouldViewPerson);
}

export function filterViewablePageResults<T>(
  page: PaginationResponse<T>,
): PaginationResponse<T> {
  const remainingItems = page.results.filter(
    (item) =>
      (isMovie(item) && shouldViewMovie(item)) ||
      (isPerson(item) && shouldViewPerson(item)),
  );
  const removedItemCount = page.results.length - remainingItems.length;
  return {
    ...page,
    results: remainingItems,
    // `total_results` and `total_pages` calculation is not the perfect way to do it.
    // But it's just for demo purposes.
    total_results: page.total_results - removedItemCount,
    // If all of the items are removed, we set this page as the last one
    // to stop infinite loaders.
    total_pages: !remainingItems.length ? page.page : page.total_pages,
  };
}
