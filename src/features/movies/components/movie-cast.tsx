import type { Id } from '@/core/shared/shared.types';
import { createMockArray } from '@/core/shared/shared.utils';
import { Padder } from '@/core/ui/components/padder';
import { SectionTitle } from '@/core/ui/components/section-title';
import {
  SeeAllLink,
  SeeAllLinkSkeleton,
} from '@/core/ui/components/see-all-link';
import { SingleRowGridList } from '@/core/ui/components/single-row-grid-list';
import {
  MoviePersonCard,
  MoviePersonCardSkeleton,
} from '@/features/movies/components/movie-person-card';
import { getMovieCredits } from '@/features/movies/movies.data';

type MovieCastShellProps = {
  seeAllLink: React.ReactNode;
  children: React.ReactNode;
};

function MovieCastShell({ seeAllLink, children }: MovieCastShellProps) {
  return (
    <section>
      <Padder>
        <SectionTitle title="Cast" />
        <SingleRowGridList itemCount={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 4 }}>
          {children}
        </SingleRowGridList>
      </Padder>
      {seeAllLink}
    </section>
  );
}

type MovieCastProps = {
  movieId: Id;
};

export async function MovieCast({ movieId }: MovieCastProps) {
  const credits = await getMovieCredits(movieId);

  if (!credits.cast.length) return null;

  return (
    <MovieCastShell
      seeAllLink={
        <SeeAllLink
          href={`/movies/${movieId}/people`}
          isLinkVisible={!!credits.cast.length}
        />
      }
    >
      {credits.cast.slice(0, 7).map((movieCast) => {
        return (
          <li key={movieCast.id}>
            <MoviePersonCard
              personId={movieCast.id}
              imageSrc={movieCast.profile_path}
              title={movieCast.name}
              subheader={movieCast.character}
            />
          </li>
        );
      })}
    </MovieCastShell>
  );
}

export function MovieCastSkeleton() {
  return (
    <MovieCastShell seeAllLink={<SeeAllLinkSkeleton />}>
      {createMockArray(4).map((key) => {
        return (
          <li key={key}>
            <MoviePersonCardSkeleton />
          </li>
        );
      })}
    </MovieCastShell>
  );
}
