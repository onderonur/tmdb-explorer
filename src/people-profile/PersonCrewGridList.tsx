import BaseGridList from '@/common/BaseGridList';
import MovieCard from '@/movies/movie-card';
import _ from 'lodash';
import { PersonDetails } from '@/people/people-types';

type PersonCrewGridListProps = {
  person: PersonDetails;
};

function PersonCrewGridList({ person }: PersonCrewGridListProps) {
  // TODO: Buna gerek var mı bak genel olarak kullanıldığı yerler vs.
  const crewList = _.uniqBy(person.credits.crew, (crew) => crew.id);

  return (
    <BaseGridList listEmptyMessage="No crew info has been found.">
      {crewList.map((personCrew) => {
        const allJobs = person.credits.crew
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
