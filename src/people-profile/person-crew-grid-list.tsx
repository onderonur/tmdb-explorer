import BaseGridList from '@/common/base-grid-list';
import MovieCard from '@/movies/movie-card';
import _ from 'lodash';
import { PersonDetails } from '@/people/people-types';

type PersonCrewGridListProps = {
  person: PersonDetails;
};

export default function PersonCrewGridList({
  person,
}: PersonCrewGridListProps) {
  const crewList = _.uniqBy(person.credits.crew, (crew) => crew.id);

  return (
    <BaseGridList listEmptyMessage="No crew info has been found.">
      {crewList.map((personCrew) => {
        const allJobs = person.credits.crew
          .filter((crew) => crew.id === personCrew.id)
          .map((crew) => crew.job);

        return (
          <li key={personCrew.id}>
            <MovieCard movie={personCrew} subheader={allJobs.join(', ')} />
          </li>
        );
      })}
    </BaseGridList>
  );
}
