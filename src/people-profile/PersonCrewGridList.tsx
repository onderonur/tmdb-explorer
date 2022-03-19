import BaseGridList from '@/common/BaseGridList';
import { ID } from '@/common/CommonTypes';
import { useQuery } from 'react-query';
import MovieCard from '@/movies/MovieCard';
import { peopleQueries } from '@/people/peopleQueries';
import _ from 'lodash';

interface PersonCrewGridListProps {
  personId: ID;
}

function PersonCrewGridList({ personId }: PersonCrewGridListProps) {
  const { data, isLoading } = useQuery(peopleQueries.personDetails(personId));
  const crewList = _.uniqBy(data?.credits.crew ?? [], (crew) => crew.id);

  return (
    <BaseGridList
      loading={isLoading}
      hasRowGutter
      listEmptyMessage="No crew info has been found."
    >
      {crewList.map((personCrew) => {
        const allJobs = data?.credits.crew
          .filter((crew) => crew.id === personCrew.id)
          .map((crew) => crew.job);
        return (
          <li key={personCrew.id}>
            <MovieCard movie={personCrew} subheader={allJobs?.join(', ')} />
          </li>
        );
      })}
    </BaseGridList>
  );
}

export default PersonCrewGridList;
