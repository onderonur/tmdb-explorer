import BaseGridList from '@/common/BaseGridList';
import { ID } from '@/common/CommonTypes';
import { useQuery } from '@tanstack/react-query';
import MovieCard from '@/movies/MovieCard';
import { peopleAPI } from '@/people/peopleAPI';

interface PersonCastingGridListProps {
  personId: ID;
}

function PersonCastingGridList({ personId }: PersonCastingGridListProps) {
  const { data, isLoading } = useQuery(peopleAPI.personDetails(personId));
  const castings = data?.credits.cast ?? [];

  return (
    <BaseGridList
      loading={isLoading}
      listEmptyMessage="No casting has been found."
    >
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
