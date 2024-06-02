import type { PaginationResponse } from '@/core/shared/shared.types';
import { createMockArray } from '@/core/shared/shared.utils';
import { Padder } from '@/core/ui/components/padder';
import { SectionTitle } from '@/core/ui/components/section-title';
import { SeeAllLink } from '@/core/ui/components/see-all-link';
import { SingleRowGridList } from '@/core/ui/components/single-row-grid-list';
import { MediaType } from '@/features/media/media.utils';
import {
  MovieCard,
  MovieCardSkeleton,
} from '@/features/movies/components/movie-card';
import type { MovieListItem } from '@/features/movies/movies.types';
import {
  PersonCard,
  PersonCardSkeleton,
} from '@/features/people/components/person-card';
import type { PersonListItem } from '@/features/people/people.types';
import { Suspense } from 'react';

type FeaturedListProps = {
  mediaType: MediaType;
  skipFirstItem?: boolean;
  promise: Promise<PaginationResponse<MovieListItem | PersonListItem>>;
};

async function FeaturedList({
  mediaType,
  skipFirstItem,
  promise,
}: FeaturedListProps) {
  const items = await promise;

  let startIndex = 0;
  let endIndex = 7;

  if (skipFirstItem) {
    startIndex += 1;
    endIndex += 1;
  }

  return items.results.slice(startIndex, endIndex).map((item) => {
    return (
      <li key={item.id}>
        {mediaType === MediaType.MOVIE ? (
          <MovieCard movie={item as MovieListItem} />
        ) : (
          <PersonCard person={item as PersonListItem} />
        )}
      </li>
    );
  });
}

type FeaturedListSectionProps = FeaturedListProps & {
  title: string;
  seeAllHref: string;
};

export function FeaturedListSection({
  title,
  seeAllHref,
  mediaType,
  skipFirstItem,
  promise,
}: FeaturedListSectionProps) {
  return (
    <section>
      <Padder>
        <SectionTitle title={title} />
      </Padder>
      <Padder>
        <SingleRowGridList itemCount={{ xs: 2, sm: 4, md: 5, lg: 6, xl: 7 }}>
          <Suspense
            fallback={createMockArray(7).map((key) => {
              return (
                <li key={key}>
                  {mediaType === MediaType.MOVIE ? (
                    <MovieCardSkeleton />
                  ) : (
                    <PersonCardSkeleton />
                  )}
                </li>
              );
            })}
          >
            <FeaturedList
              mediaType={mediaType}
              skipFirstItem={skipFirstItem}
              promise={promise}
            />
          </Suspense>
        </SingleRowGridList>
      </Padder>
      <SeeAllLink isLinkVisible href={seeAllHref} />
    </section>
  );
}
