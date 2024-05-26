import { BaseGridList } from '@/common/base-grid-list';
import { MovieCard } from '@/movies/movie-card';
import type { PersonDetails } from '@/people/people-types';
import _ from 'lodash';

type PersonCrewGridListProps = {
  person: PersonDetails;
};

export function PersonCrewGridList({ person }: PersonCrewGridListProps) {
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
