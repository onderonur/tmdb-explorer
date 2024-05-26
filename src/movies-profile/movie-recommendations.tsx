import { BaseGridList } from '@/common/base-grid-list';
import type { Id } from '@/common/common-types';
import { createMockArray } from '@/common/common-utils';
import { Padder } from '@/common/padder';
import { SectionTitle } from '@/common/section-title';
import { MovieCardSkeleton } from '@/movies/movie-card';
import { getMovieRecommendations } from '@/movies/movie-fetchers';
import { MovieInfiniteGridList } from '@/movies/movie-infinite-grid-list';

type MovieRecommendationsShellProps = React.PropsWithChildren;

function MovieRecommendationsShell({
  children,
}: MovieRecommendationsShellProps) {
  return (
    <aside>
      <Padder>
        <SectionTitle title="Recommendations" />
        {children}
      </Padder>
    </aside>
  );
}

type MovieRecommendationsProps = {
  movieId: Id;
};

export async function MovieRecommendations({
  movieId,
}: MovieRecommendationsProps) {
  const movieRecommendations = await getMovieRecommendations(movieId, {
    page: 1,
  });

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('movieId', movieId.toString());
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <MovieRecommendationsShell>
      <MovieInfiniteGridList
        pageKeyTemplate={`/movies/${movieId}/api?${infiniteListSearchParams.toString()}`}
        firstPage={movieRecommendations}
      />
    </MovieRecommendationsShell>
  );
}

export function MovieRecommendationsSkeleton() {
  return (
    <MovieRecommendationsShell>
      <BaseGridList>
        {createMockArray(12).map((key) => {
          return (
            <li key={key}>
              <MovieCardSkeleton />
            </li>
          );
        })}
      </BaseGridList>
    </MovieRecommendationsShell>
  );
}
