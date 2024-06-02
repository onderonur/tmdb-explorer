import type { Id } from '@/core/shared/shared.types';
import { createMockArray } from '@/core/shared/shared.utils';
import { BaseGridList } from '@/core/ui/components/base-grid-list';
import { Padder } from '@/core/ui/components/padder';
import { SectionTitle } from '@/core/ui/components/section-title';
import {
  MovieCard,
  MovieCardSkeleton,
} from '@/features/movies/components/movie-card';
import { getPersonCredits } from '@/features/people/people.data';

type PersonCrewingsShellProps = {
  children: React.ReactNode;
};

function PersonCrewingsShell({ children }: PersonCrewingsShellProps) {
  return (
    <section>
      <Padder>
        <SectionTitle title="Crew" />
        {children}
      </Padder>
    </section>
  );
}

type PersonCrewingsProps = {
  personId: Id;
};

export async function PersonCrewings({ personId }: PersonCrewingsProps) {
  const { crew } = await getPersonCredits(personId);

  return (
    <PersonCrewingsShell>
      <BaseGridList listEmptyMessage="No crew info has been found.">
        {crew.map((crewing) => {
          return (
            <li key={crewing.id}>
              <MovieCard movie={crewing} subheader={crewing.job} />
            </li>
          );
        })}
      </BaseGridList>
    </PersonCrewingsShell>
  );
}

export function PersonCrewingsSkeleton() {
  return (
    <PersonCrewingsShell>
      <BaseGridList>
        {createMockArray(12).map((key) => {
          return (
            <li key={key}>
              <MovieCardSkeleton />
            </li>
          );
        })}
      </BaseGridList>
    </PersonCrewingsShell>
  );
}
