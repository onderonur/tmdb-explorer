import type { Id } from '@/common/common-types';
import { createMockArray } from '@/common/common-utils';
import { Padder } from '@/common/padder';
import { SectionTitle } from '@/common/section-title';
import { SeeAllLink, SeeAllLinkSkeleton } from '@/common/see-all-link';
import { SingleRowGridList } from '@/common/single-row-grid-list';
import {
  MoviePersonCard,
  MoviePersonCardSkeleton,
} from '@/movies-profile/movie-person-card';
import { getMovieCredits } from '../movies/movie-fetchers';

type MovieCastShellProps = React.PropsWithChildren<{
  seeAllLink: React.ReactNode;
}>;

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

// TODO: Buna skeleton oluştur ve kullanıldığı yere Suspense ekle.
// https://mui.com/material-ui/react-skeleton/

type MovieCastProps = {
  movieId: Id;
};

export async function MovieCast({ movieId }: MovieCastProps) {
  const credits = await getMovieCredits(movieId);

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
