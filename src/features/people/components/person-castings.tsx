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

type PersonCastingsShellProps = {
  children: React.ReactNode;
};

function PersonCastingsShell({ children }: PersonCastingsShellProps) {
  return (
    <section>
      <Padder>
        <SectionTitle title="Castings" />
        {children}
      </Padder>
    </section>
  );
}

type PersonCastingsProps = {
  personId: Id;
};

export async function PersonCastings({ personId }: PersonCastingsProps) {
  const { cast } = await getPersonCredits(personId);

  return (
    <PersonCastingsShell>
      <BaseGridList listEmptyMessage="No casting has been found.">
        {cast.map((casting) => {
          return (
            <li key={casting.id}>
              <MovieCard movie={casting} subheader={casting.character} />
            </li>
          );
        })}
      </BaseGridList>
    </PersonCastingsShell>
  );
}

export function PersonCastingsSkeleton() {
  return (
    <PersonCastingsShell>
      <BaseGridList>
        {createMockArray(12).map((key) => {
          return (
            <li key={key}>
              <MovieCardSkeleton />
            </li>
          );
        })}
      </BaseGridList>
    </PersonCastingsShell>
  );
}
