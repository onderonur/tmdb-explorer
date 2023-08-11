import BaseGridList from '@/common/base-grid-list';
import MovieCard from '@/movies/movie-card';
import { PersonDetails } from '@/people/people-types';

type PersonCastingGridListProps = {
  person: PersonDetails;
};

export default function PersonCastingGridList({
  person,
}: PersonCastingGridListProps) {
  const castings = person.credits.cast;

  return (
    <BaseGridList listEmptyMessage="No casting has been found.">
      {castings.map((casting) => {
        return (
          <li key={casting.id}>
            <MovieCard movie={casting} subheader={casting.character} />
          </li>
        );
      })}
    </BaseGridList>
  );
}
