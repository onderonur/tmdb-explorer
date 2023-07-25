import BaseGridList from '@/common/BaseGridList';
import MovieCard from '@/movies/movie-card';
import { PersonDetails } from '@/people/PeopleTypes';

type PersonCastingGridListProps = {
  person: PersonDetails;
};

function PersonCastingGridList({ person }: PersonCastingGridListProps) {
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

export default PersonCastingGridList;
