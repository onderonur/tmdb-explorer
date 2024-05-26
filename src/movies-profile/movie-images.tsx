import type { Id } from '@/common/common-types';
import { createMockArray } from '@/common/common-utils';
import { Padder } from '@/common/padder';
import { SectionTitle } from '@/common/section-title';
import { SeeAllLink, SeeAllLinkSkeleton } from '@/common/see-all-link';
import { SingleRowGridList } from '@/common/single-row-grid-list';
import { getMovieImages } from '../movies/movie-fetchers';
import { MovieImageCard, MovieImageCardSkeleton } from './movie-image-card';

type MovieImagesShellProps = React.PropsWithChildren<{
  seeAllLink: React.ReactNode;
}>;

function MovieImagesShell({ seeAllLink, children }: MovieImagesShellProps) {
  return (
    <section>
      <Padder>
        <SectionTitle title="Images" />
        <SingleRowGridList itemCount={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 4 }}>
          {children}
        </SingleRowGridList>
      </Padder>
      {seeAllLink}
    </section>
  );
}

type MovieImagesProps = {
  movieId: Id;
};

export async function MovieImages({ movieId }: MovieImagesProps) {
  const images = await getMovieImages(movieId);
  const [firstImage] = images.backdrops;

  return (
    <MovieImagesShell
      seeAllLink={
        <SeeAllLink
          href={`/movies/${movieId}/images/${firstImage.file_path}`}
          isLinkVisible={!!firstImage}
        />
      }
    >
      {images.backdrops.slice(0, 4).map((image, i) => {
        return (
          <li key={image.file_path}>
            <MovieImageCard
              movieId={movieId}
              image={{
                ...image,
                alt: `Image - ${i + 1}`,
              }}
            />
          </li>
        );
      })}
    </MovieImagesShell>
  );
}

export function MovieImagesSkeleton() {
  return (
    <MovieImagesShell seeAllLink={<SeeAllLinkSkeleton />}>
      {createMockArray(4).map((key) => {
        return (
          <li key={key}>
            <MovieImageCardSkeleton />
          </li>
        );
      })}
    </MovieImagesShell>
  );
}
