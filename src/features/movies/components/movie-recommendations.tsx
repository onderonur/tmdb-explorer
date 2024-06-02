import type { Id } from '@/core/shared/shared.types';
import { createMockArray } from '@/core/shared/shared.utils';
import { BaseGridList } from '@/core/ui/components/base-grid-list';
import { Padder } from '@/core/ui/components/padder';
import { SectionTitle } from '@/core/ui/components/section-title';
import { MovieCardSkeleton } from '@/features/movies/components/movie-card';
import { MovieInfiniteGridList } from '@/features/movies/components/movie-infinite-grid-list';
import { getMovieRecommendations } from '@/features/movies/movies.data';

type MovieRecommendationsShellProps = {
  children: React.ReactNode;
};

function MovieRecommendationsShell({
  children,
}: MovieRecommendationsShellProps) {
  return (
    <Padder>
      <SectionTitle title="Recommendations" />
      {children}
    </Padder>
  );
}

type MovieRecommendationsProps = {
  movieId: Id;
};

export async function MovieRecommendations({
  movieId,
}: MovieRecommendationsProps) {
  const movieRecommendations = await getMovieRecommendations(movieId, 1);

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('movieId', movieId.toString());
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <MovieRecommendationsShell>
      <MovieInfiniteGridList
        pageKeyTemplate={`/api/movies/recommendations?${infiniteListSearchParams.toString()}`}
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
